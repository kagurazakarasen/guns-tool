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

	const insertDisposable = vscode.commands.registerCommand('guns-tool.insertSpace', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const insertChar = '　'; // 全角スペース

		// 行頭スキップ対象文字判定
		const skipChars = ['『', '「', '【', '［', '　', ' ', '（', '〈', '《', '〔', '｛', '〖', '〘', '〚', '＃', '#', '＊', '*', '◆', '◇', '○', '●', '◎', '△', '▲', '▼', '▽', '～', '…', '‥', '・', '＝', '=', '≪', '―', '-', '0','1','2','3','4','5','6','7','8','9'];
		const shouldSkip = (lineText: string): boolean => {
			// 改行のみの行はスキップ
			if (lineText.trim() === '') {
				return true;
			}
			const trimmed = lineText.trimStart();
			return skipChars.some(char => trimmed.startsWith(char));
		};

		await editor.edit(editBuilder => {
			for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
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

	const tateCombiDisposable = vscode.commands.registerCommand('guns-tool.tateCombiCharacters', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 全角！！、！？等を半角化し、[tcy]タグで囲む
		const replacedText = fullText
			.replace(/！！/g, '[tcy]!![/tcy]')
			.replace(/！？/g, '[tcy]!?[/tcy]')
			.replace(/？！/g, '[tcy]?![/tcy]')
			.replace(/？？/g, '[tcy]??[/tcy]');

		// 変更がある場合のみ置換を実行
		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(fullText.length)
			);
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('縦組み対応の半角指定を適用しました。');
		} else {
			vscode.window.showInformationMessage('置換対象がありません。');
		}
	});

	const rubyConvertDisposable = vscode.commands.registerCommand('guns-tool.rubyConvertAozoraToBccks', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 青空文庫形式 |本文《ルビ》 → BCCKS形式 {本文}(ルビ) に変換
		const replacedText = fullText.replace(/\|([^《]*?)《([^》]*?)》/g, '{$1}($2)');

		// 変更がある場合のみ置換を実行
		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(fullText.length)
			);
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('ルビを青空文庫形式からBCCKS形式に変換しました。');
		} else {
			vscode.window.showInformationMessage('置換対象がありません。');
		}
	});

	const rubyConvertReverseDisposable = vscode.commands.registerCommand('guns-tool.rubyConvertBccksToAozora', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// BCCKS形式 {本文}(ルビ) → 青空文庫形式 |本文《ルビ》 に変換
		const replacedText = fullText.replace(/\{([^}]*?)\}\(([^)]*?)\)/g, '|$1《$2》');

		// 変更がある場合のみ置換を実行
		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(fullText.length)
			);
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('ルビをBCCKS形式から青空文庫形式に変換しました。');
		} else {
			vscode.window.showInformationMessage('置換対象がありません。');
		}
	});

	context.subscriptions.push( insertDisposable, removeDisposable, tateCombiDisposable, rubyConvertDisposable, rubyConvertReverseDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
