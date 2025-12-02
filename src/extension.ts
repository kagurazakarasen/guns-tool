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
			// 行頭の最初の文字（前後の空白を除かない）を確認
			const firstChar = lineText.length > 0 ? lineText[0] : '';
			return skipChars.includes(firstChar);
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
			vscode.window.showInformationMessage('除去すべき句読点が、見つかりりませんでした。');
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
			vscode.window.showInformationMessage('！！、？？等の置換対象がありません。');
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
			vscode.window.showInformationMessage('青空文庫形式ルビ置換対象がありません。');
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
			vscode.window.showInformationMessage('BCCKS形式ルビ置換対象がありません。');
		}
	});

	const fullwidthDisposable = vscode.commands.registerCommand('guns-tool.fullwidthSingleAlphabet', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 日本語文字の間に単独で現れる英数字（半角アルファベット・半角数字）を全角化する
		// 前後に任意の空白が挟まれていてもマッチする。例: '漢字 A 漢字' -> '漢字 Ａ 漢字', '漢字 1 漢字' -> '漢字 １ 漢字'
		const replacedText = fullText.replace(/([\u3000-\u30FF\u4E00-\u9FFF])(\s*)([A-Za-z0-9])(\s*)([\u3000-\u30FF\u4E00-\u9FFF])/gu,
			(m, g1, s1, ch, s2, g5) => {
				// ASCIIの英数字を全角にマッピング（A -> Ａ, 0 -> ０）
				const code = (ch as string).charCodeAt(0);
				const full = String.fromCharCode(code + 0xFEE0);
				return `${g1}${s1}${full}${s2}${g5}`;
			});

		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('単独のアルファベットを全角化しました。');
		} else {
			vscode.window.showInformationMessage('単独アルファベットの変換対象が見つかりませんでした。');
		}
	});

	const acronymDisposable = vscode.commands.registerCommand('guns-tool.fullwidthAcronym', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 日本語文字の間に単独で現れる大文字アルファベット1～3文字の略称を全角化する
		// 例：'漢字 ABC 漢字' -> '漢字 ＡＢＣ 漢字'、'漢字 AI 漢字' -> '漢字 ＡＩ 漢字'
		const replacedText = fullText.replace(/([\u3000-\u30FF\u4E00-\u9FFF])(\s*)([A-Z]{1,3})(\s*)([\u3000-\u30FF\u4E00-\u9FFF])/gu,
			(m, g1, s1, acronym, s2, g5) => {
				const fullAcronym = (acronym as string).split('').map(ch => String.fromCharCode(ch.charCodeAt(0) + 0xFEE0)).join('');
				return `${g1}${s1}${fullAcronym}${s2}${g5}`;
			});

		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('大文字アルファベット略称を全角化しました。');
		} else {
			vscode.window.showInformationMessage('大文字アルファベット略称変換対象が見つかりませんでした。');
		}
	});

	const tatechuyokoDigitDisposable = vscode.commands.registerCommand('guns-tool.tateChuyokoTwoDigit', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 日本語文字の間に単独で現れる2ケタの半角数値を[tcy]で囲む
		// 例：'漢字 12 漢字' -> '漢字 [tcy]12[/tcy] 漢字'
		const replacedText = fullText.replace(/([\u3000-\u30FF\u4E00-\u9FFF])(\s*)(\d{2})(\s*)([\u3000-\u30FF\u4E00-\u9FFF])/gu,
			(m, g1, s1, digits, s2, g5) => {
				return `${g1}${s1}[tcy]${digits}[/tcy]${s2}${g5}`;
			});

		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('2ケタ数値を縦中横タグで囲みました。');
		} else {
			vscode.window.showInformationMessage('2ケタ数値の変換対象が見つかりませんでした。');
		}
	});

	const ellipsisFixDisposable = vscode.commands.registerCommand('guns-tool.fixEllipsis', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 「・・・」「‥」「…」の連続を「……」に統一する
		// 単独の「・」はスキップする。「‥」「…」の単独や複数、「・」が2文字以上は対象
		// パターン1: 「‥」「…」の1文字以上の連続
		// パターン2: 「・」が2文字以上の連続
		let replacedText = fullText.replace(/[‥…]+/g, '……');
		replacedText = replacedText.replace(/・{2,}/g, '……');

		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('三点リーダを統一しました。');
		} else {
			vscode.window.showInformationMessage('三点リーダ変換対象が見つかりませんでした。');
		}
	});

	context.subscriptions.push( insertDisposable, removeDisposable, tateCombiDisposable, rubyConvertDisposable, rubyConvertReverseDisposable, fullwidthDisposable, acronymDisposable, tatechuyokoDigitDisposable, ellipsisFixDisposable);

	const spaceAfterPunctDisposable = vscode.commands.registerCommand('guns-tool.spaceAfterPunct', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const fullText = document.getText();

		// 「！」または「？」の直後に空白がない場合、全角スペースを挿入する
		// ただし直後の文字が閉じ括弧/引用符（例：」『）】〉》など）、[（縦中横タグ開始）、または他の punctuation（!！?？）である場合は挿入しない
		// 既に空白や改行がある場合はスキップされる（正規表現で次の文字が空白でない場合のみマッチ）
		// 対象は全角と半角の ! と ? を含む
		const replacedText = fullText.replace(/([!！?？])(?![」『）〕】〉》\[!！?？])([^\s\u3000\n\r])/gu, '$1　$2');

		if (fullText !== replacedText) {
			const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(fullRange, replacedText);
			});
			vscode.window.showInformationMessage('感嘆符/疑問符の後にスペースを挿入しました。');
		} else {
			vscode.window.showInformationMessage('感嘆符/疑問符の変換対象が見つかりませんでした。');
		}
	});

	context.subscriptions.push(spaceAfterPunctDisposable);

	const applyAllFixesDisposable = vscode.commands.registerCommand('guns-tool.applyAllFixes', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		// 実行順序：insertSpace → removePunctuation → tateCombiCharacters → rubyConvertAozoraToBccks → 
		// fullwidthSingleAlphabet → fullwidthAcronym → tateChuyokoTwoDigit → fixEllipsis → spaceAfterPunct
		const commands = [
			'guns-tool.insertSpace',
			'guns-tool.removePunctuation',
			'guns-tool.tateCombiCharacters',
			'guns-tool.rubyConvertAozoraToBccks',
			'guns-tool.fullwidthSingleAlphabet',
			'guns-tool.fullwidthAcronym',
			'guns-tool.tateChuyokoTwoDigit',
			'guns-tool.fixEllipsis',
			'guns-tool.spaceAfterPunct'
		];

		let successCount = 0;
		for (const command of commands) {
			try {
				await vscode.commands.executeCommand(command);
				successCount++;
			} catch (err) {
				vscode.window.showErrorMessage(`コマンド ${command} の実行に失敗しました。`);
				break;
			}
		}

		vscode.window.showInformationMessage(`全修正を実行完了: ${successCount}/${commands.length} コマンド実行`);
	});

	context.subscriptions.push(applyAllFixesDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
