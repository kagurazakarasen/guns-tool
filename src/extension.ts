// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "guns-tool" is now active!');

	// 実行コマンドを登録する
	const helloDisposable = vscode.commands.registerCommand('guns-tool.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from GUNS TOOL!');
	});

	const insertDisposable = vscode.commands.registerCommand('guns-tool.insertSpace', async () => {
		const options: { label: string; description: string; value: string }[] = [
			{ label: '全ての行 に全角スペース', description: 'ファイル全体の各行先頭に全角スペースを挿入', value: 'all:zen' },
			{ label: '全ての行 に半角スペース', description: 'ファイル全体の各行先頭に半角スペースを挿入', value: 'all:half' },
			{ label: '選択範囲 に全角スペース', description: '選択範囲の各行先頭に全角スペースを挿入', value: 'sel:zen' },
			{ label: '選択範囲 に半角スペース', description: '選択範囲の各行先頭に半角スペースを挿入', value: 'sel:half' },
		];

		const pick = await vscode.window.showQuickPick(options, { placeHolder: '挿入モードを選択してください' });
		if (!pick) {
			return;
		}

		const [scope, kind] = pick.value.split(':');
		const insertChar = kind === 'zen' ? '　' : ' ';

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let startLine = 0;
		let endLine = document.lineCount - 1;

		if (scope === 'sel') {
			const selection = editor.selection;
			if (selection.isEmpty) {
				vscode.window.showInformationMessage('選択範囲がありません。先に行を選択してください。');
				return;
			}
			startLine = selection.start.line;
			endLine = selection.end.line;
		}

		// 行頭がスキップ対象文字で始まる判定
		const skipChars = ['『', '「', '【', '［'];
		const shouldSkip = (lineText: string): boolean => {
			const trimmed = lineText.trimStart();
			return skipChars.some(char => trimmed.startsWith(char));
		};

		await editor.edit(editBuilder => {
			for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
				const line = document.lineAt(lineNumber);
				if (!shouldSkip(line.text)) {
					editBuilder.insert(line.range.start, insertChar);
				}
			}
		});
	});

	const removeDisposable = vscode.commands.registerCommand('guns-tool.removePunctuation', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 。」 → 」、。』 → 』 に置換
		const replacedText = fullText
			.replace(/。」/g, '」')
			.replace(/。』/g, '』');

		// 変更がある場合のみ置換を実行
		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(fullText.length)
			);
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('句読点を除去しました。');
		} else {
			vscode.window.showInformationMessage('置換対象がありません。');
		}
	});

	context.subscriptions.push(helloDisposable, insertDisposable, removeDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
