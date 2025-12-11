// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// 行背景色デコレーション用のグローバル変数
let alternatingLineDecorations: {
	evenDecoration: vscode.TextEditorDecorationType;
	oddDecoration: vscode.TextEditorDecorationType;
} | null = null;

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
		let processScope = 'ドキュメント全体';

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

		// 選択範囲があるかチェック
		const hasSelection = editor.selection && !editor.selection.isEmpty;
		let startLine = 0;
		let endLine = document.lineCount - 1;

		if (hasSelection) {
			startLine = editor.selection.start.line;
			endLine = editor.selection.end.line;
			processScope = '選択範囲内';
		}

		await editor.edit(editBuilder => {
			for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
				const line = document.lineAt(lineNumber);
				if (!shouldSkip(line.text)) {
					editBuilder.insert(line.range.start, insertChar);
				}
			}
		});
		vscode.window.showInformationMessage(`${processScope}の行頭にスペースを挿入しました。`);
	});

	const removeDisposable = vscode.commands.registerCommand('guns-tool.removePunctuation', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		// 選択範囲があるかチェック
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(targetText.length)
			);
		}

		// 。」 → 」、。』 → 』 に置換
		const replacedText = targetText
			.replace(/。」/g, '」')
			.replace(/。』/g, '』');

		// 変更がある場合のみ置換を実行
		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の句読点を除去しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に除去すべき句読点が見つかりませんでした。`);
		}
	});

	const tateCombiDisposable = vscode.commands.registerCommand('guns-tool.tateCombiCharacters', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		// 選択範囲があるかチェック
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(targetText.length)
			);
		}

		// 全角！！、！？等を半角化し、[tcy]タグで囲む
		const replacedText = targetText
			.replace(/！！/g, '[tcy]!![/tcy]')
			.replace(/！？/g, '[tcy]!?[/tcy]')
			.replace(/？！/g, '[tcy]?![/tcy]')
			.replace(/？？/g, '[tcy]??[/tcy]');

		// 変更がある場合のみ置換を実行
		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}に縦組み対応の半角指定を適用しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に！！、？？等の置換対象がありません。`);
		}
	});

	const rubyConvertDisposable = vscode.commands.registerCommand('guns-tool.rubyConvertAozoraToBccks', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		// 選択範囲があるかチェック
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(targetText.length)
			);
		}

		// 青空文庫形式 → BCCKS形式に変換
		// 1. ｜記号あり: ｜本文《ルビ》 → {本文}(ルビ)
		// 2. ｜記号なし: 《ルビ》の前の連続した文字種（漢字、ひらがな、カタカナ等）を本文とみなす
		let replacedText = targetText;
		
		// まず｜記号ありのパターンを変換
		replacedText = replacedText.replace(/｜([^《]*?)《([^》]*?)》/g, '{$1}($2)');
		
		// 次に｜記号なしのパターンを変換
		// 《の直前の文字種が連続する部分を本文として抽出
		replacedText = replacedText.replace(/([一-龯々〆ヵヶ]+|[ぁ-ん]+|[ァ-ヴー]+|[ａ-ｚＡ-Ｚa-zA-Z]+|[０-９0-9]+)《([^》]*?)》/g, '{$1}($2)');

		// 変更がある場合のみ置換を実行
		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}のルビを青空文庫形式からBCCKS形式に変換しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に青空文庫形式ルビ置換対象がありません。`);
		}
	});

	const rubyConvertReverseDisposable = vscode.commands.registerCommand('guns-tool.rubyConvertBccksToAozora', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		// 選択範囲があるかチェック
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(targetText.length)
			);
		}

		// BCCKS形式 {本文}(ルビ) → 青空文庫形式 |本文《ルビ》 に変換
		const replacedText = targetText.replace(/\{([^}]*?)\}\(([^)]*?)\)/g, '｜$1《$2》');

		// 変更がある場合のみ置換を実行
		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}のルビをBCCKS形式から青空文庫形式に変換しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}にBCCKS形式ルビ置換対象がありません。`);
		}
	});

	const convertAozoraEmphasisDisposable = vscode.commands.registerCommand('guns-tool.convertAozoraEmphasisToBccks', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		// 選択範囲があるかチェック
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(targetText.length)
			);
		}

		// 青空文庫形式の傍点 → BCCKS形式の圏点に変換
		// パターン: 文字列［＃「文字列」に傍点］
		const replacedText = targetText.replace(/(.+?)［＃「\1」に傍点］/g, (match, text) => {
			// 文字列を1文字ずつ {文字}(﹅) に変換し、スペースで区切る
			return Array.from(text as string)
				.map(ch => `{${ch}}(﹅)`)
				.join(' ');
		});

		// 変更がある場合のみ置換を実行
		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の青空文庫形式の傍点をBCCKS形式の圏点に変換しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に青空文庫形式傍点の変換対象が見つかりませんでした。`);
		}
	});

	const convertBccksEmphasisToAozoraDisposable = vscode.commands.registerCommand('guns-tool.convertBccksEmphasisToAozora', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		// 選択範囲があるかチェック
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(targetText.length)
			);
		}

		// BCCKS形式の圏点 → 青空文庫形式の傍点に変換
		// パターン: {文}(﹅) {字}(﹅) {列}(﹅) のような連続した圏点を検出
		// 圏点が連続している部分を1つの傍点記法にまとめる
		const replacedText = targetText.replace(/(?:\{(.)\}\(﹅\)\s*)+/g, (match) => {
			// マッチした部分から各文字を抽出
			const chars = Array.from(match.matchAll(/\{(.)\}\(﹅\)/g))
				.map(m => m[1])
				.join('');
			return `${chars}［＃「${chars}」に傍点］`;
		});

		// 変更がある場合のみ置換を実行
		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}のBCCKS形式の圏点を青空文庫形式の傍点に変換しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}にBCCKS形式圏点の変換対象が見つかりませんでした。`);
		}
	});

	const fullwidthDisposable = vscode.commands.registerCommand('guns-tool.fullwidthSingleAlphabet', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range | undefined;
		let processScope = 'ドキュメント全体';

		// 選択範囲がある場合はそれを対象に、ない場合は全体を対象にする
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
		}

		// 日本語文字の間に単独で現れる英数字（半角アルファベット・半角数字）を全角化する
		// 前後に任意の空白が挟まれていてもマッチする。例: '漢字 A 漢字' -> '漢字 Ａ 漢字', '漢字 1 漢字' -> '漢字 １ 漢字'
		const replacedText = targetText.replace(/([\u3000-\u30FF\u4E00-\u9FFF])(\s*)([A-Za-z0-9])(\s*)([\u3000-\u30FF\u4E00-\u9FFF])/gu,
			(m, g1, s1, ch, s2, g5) => {
				// ASCIIの英数字を全角にマッピング（A -> Ａ, 0 -> ０）
				const code = (ch as string).charCodeAt(0);
				const full = String.fromCharCode(code + 0xFEE0);
				return `${g1}${s1}${full}${s2}${g5}`;
			});

		if (targetText !== replacedText) {
			const range = targetRange || new vscode.Range(document.positionAt(0), document.positionAt(targetText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(range, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の単独アルファベットを全角化しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に単独アルファベットの変換対象が見つかりませんでした。`);
		}
	});

	const acronymDisposable = vscode.commands.registerCommand('guns-tool.fullwidthAcronym', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range | undefined;
		let processScope = 'ドキュメント全体';

		// 選択範囲がある場合はそれを対象に、ない場合は全体を対象にする
		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
		}

		// 日本語文字の間に単独で現れる大文字アルファベット1～3文字の略称を全角化する
		// 例：'漢字 ABC 漢字' -> '漢字 ＡＢＣ 漢字'、'漢字 AI 漢字' -> '漢字 ＡＩ 漢字'
		const replacedText = targetText.replace(/([\u3000-\u30FF\u4E00-\u9FFF])(\s*)([A-Z]{1,3})(\s*)([\u3000-\u30FF\u4E00-\u9FFF])/gu,
			(m, g1, s1, acronym, s2, g5) => {
				const fullAcronym = (acronym as string).split('').map(ch => String.fromCharCode(ch.charCodeAt(0) + 0xFEE0)).join('');
				return `${g1}${s1}${fullAcronym}${s2}${g5}`;
			});

		if (targetText !== replacedText) {
			const range = targetRange || new vscode.Range(document.positionAt(0), document.positionAt(targetText.length));
			await editor.edit(editBuilder => {
				editBuilder.replace(range, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の大文字アルファベット略称を全角化しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に大文字アルファベット略称変換対象が見つかりませんでした。`);
		}
	});

	const fullwidthDigitsToKanjiDisposable = vscode.commands.registerCommand('guns-tool.fullwidthDigitsToKanji', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(document.positionAt(0), document.positionAt(targetText.length));
		}

		// 全角数字（０〜９）を漢数字に置換する（０->〇, １->一, ... ９->九）
		const map: { [k: string]: string } = {
			'０': '〇',
			'１': '一',
			'２': '二',
			'３': '三',
			'４': '四',
			'５': '五',
			'６': '六',
			'７': '七',
			'８': '八',
			'９': '九'
		};

		const replacedText = targetText.replace(/[０-９]/g, ch => map[ch] || ch);

		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の全角数字を漢数字に変換しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に変換対象の全角数字が見つかりませんでした。`);
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
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(document.positionAt(0), document.positionAt(targetText.length));
		}

		// 「・・・」「‥」「…」の連続を「……」に統一する
		// 単独の「・」はスキップする。「‥」「…」の単独や複数、「・」が2文字以上は対象
		// パターン1: 「‥」「…」の1文字以上の連続
		// パターン2: 「・」が2文字以上の連続
		let replacedText = targetText.replace(/[‥…]+/g, '……');
		replacedText = replacedText.replace(/・{2,}/g, '……');

		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の三点リーダを統一しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に三点リーダ変換対象が見つかりませんでした。`);
		}
	});

	const dashNormalizationDisposable = vscode.commands.registerCommand('guns-tool.dashNormalization', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(document.positionAt(0), document.positionAt(targetText.length));
		}

		// 各種ダッシュパターンをU+2500「──」に統一する
		// ーー（全角音長音符）、--（半角ハイフン）、U+2014（——）、U+2015（――）などを置換
		let replacedText = targetText
			.replace(/ーー/g, '──')           // 全角音長音符
			.replace(/--/g, '──')            // 半角ハイフン
			.replace(/\u2014\u2014/g, '──')  // U+2014 EM DASH
			.replace(/\u2015\u2015/g, '──')  // U+2015 HORIZONTAL BAR
			.replace(/――/g, '──')           // 水平線
			.replace(/−−/g, '──')           // マイナス記号
			.replace(/＿＿/g, '──');         // 全角アンダースコア

		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}のダッシュを統一しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}にダッシュ変換対象が見つかりませんでした。`);
		}
	});

	context.subscriptions.push( insertDisposable, removeDisposable, tateCombiDisposable, rubyConvertDisposable, rubyConvertReverseDisposable, convertAozoraEmphasisDisposable, convertBccksEmphasisToAozoraDisposable, fullwidthDisposable, acronymDisposable, fullwidthDigitsToKanjiDisposable, tatechuyokoDigitDisposable, ellipsisFixDisposable, dashNormalizationDisposable);

	// 選択範囲にBCCKS形式のルビを設定するコマンド
	const setRubyDisposable = vscode.commands.registerCommand('guns-tool.setRubyForSelection', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const selections = editor.selections;
		if (selections.every(sel => sel.isEmpty)) {
			vscode.window.showInformationMessage('ルビを設定するには、テキストを選択状態にしてください。');
			return;
		}

		const ruby = await vscode.window.showInputBox({
			prompt: '選択範囲に設定するルビ（ふりがな）を入力してください。',
			placeHolder: 'ルビ',
			ignoreFocusOut: true
		});
		if (ruby === undefined) {
			// キャンセル
			return;
		}

		await editor.edit(editBuilder => {
			for (const sel of selections) {
				if (sel.isEmpty) { continue; }
				const text = editor.document.getText(sel);
				editBuilder.replace(sel, `{${text}}(${ruby})`);
			}
		});
		vscode.window.showInformationMessage('選択範囲にルビを設定しました。');
	});

	context.subscriptions.push(setRubyDisposable);

	// 選択範囲に圏点ルビ（1文字毎）を設定するコマンド
	const setCirclePointRubyDisposable = vscode.commands.registerCommand('guns-tool.setCirclePointRuby', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const selections = editor.selections;
		if (selections.every(sel => sel.isEmpty)) {
			vscode.window.showInformationMessage('圏点ルビを設定するには、テキストを選択してください。');
			return;
		}

		const circlePoint = '﹅'; // 圏点記号

		await editor.edit(editBuilder => {
			for (const sel of selections) {
				if (sel.isEmpty) { continue; }
				const text = editor.document.getText(sel);
				// 1文字ずつ {文字}(﹅) に置換し、スペースで区切る
				const rubyText = Array.from(text)
					.map(ch => `{${ch}}(${circlePoint})`)
					.join(' ');
				editBuilder.replace(sel, rubyText);
			}
		});
		vscode.window.showInformationMessage('選択範囲に圏点ルビを設定しました。');
	});

	context.subscriptions.push(setCirclePointRubyDisposable);

	// 選択範囲の小文字を大文字に変換するコマンド
	const toUpperCaseDisposable = vscode.commands.registerCommand('guns-tool.toUpperCase', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const selections = editor.selections;
		if (selections.every(sel => sel.isEmpty)) {
			vscode.window.showInformationMessage('大文字化するには、テキストを選択してください。');
			return;
		}

		await editor.edit(editBuilder => {
			for (const sel of selections) {
				if (sel.isEmpty) { continue; }
				const text = editor.document.getText(sel);
				// 半角小文字 (a-z) と全角小文字 (ａ-ｚ) を大文字に変換
				const upperText = text.replace(/[a-zａ-ｚ]/g, (ch) => {
					if (ch >= 'a' && ch <= 'z') {
						// 半角小文字を大文字に
						return ch.toUpperCase();
					} else {
						// 全角小文字 (U+FF41-FF5A) を全角大文字 (U+FF21-FF3A) に
						const code = ch.charCodeAt(0);
						return String.fromCharCode(code - 0x20);
					}
				});
				editBuilder.replace(sel, upperText);
			}
		});
		vscode.window.showInformationMessage('選択範囲の小文字を大文字に変換しました。');
	});

	context.subscriptions.push(toUpperCaseDisposable);

	// 選択範囲内の半角英数字を全角に変換するコマンド
	const halfwidthToFullwidthDisposable = vscode.commands.registerCommand('guns-tool.halfwidthToFullwidth', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const selections = editor.selections;
		if (selections.every(sel => sel.isEmpty)) {
			vscode.window.showInformationMessage('半角英数字を全角化するには、テキストを選択してください。');
			return;
		}

		await editor.edit(editBuilder => {
			for (const sel of selections) {
				if (sel.isEmpty) { continue; }
				const text = editor.document.getText(sel);
				// 半角英数字・記号・スペース (0x20-0x7E) を全角に変換
				const fullwidthText = text.replace(/[\x20-\x7E]/g, (ch) => {
					const code = ch.charCodeAt(0);
					// ASCII範囲(0x20-0x7E)を全角(0xFF00-0xFF5E)にマッピング
					return String.fromCharCode(code + 0xFEE0);
				});
				editBuilder.replace(sel, fullwidthText);
			}
		});
		vscode.window.showInformationMessage('選択範囲内の半角文字を全角に変換しました。');
	});

	context.subscriptions.push(halfwidthToFullwidthDisposable);

	const showDocumentStatusDisposable = vscode.commands.registerCommand('guns-tool.showDocumentStatus', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		const filePath = document.uri.fsPath;
		const fileName = document.fileName.split(/[\\/]/).pop() || 'Untitled';
		const text = document.getText();
		const charCount = text.length;
		const lineCount = document.lineCount;
		
		// カーソル位置の文字コードを取得
		const position = editor.selection.active;
		const offset = document.offsetAt(position);
		const charAtCursor = text[offset] || '';
		const charCode = charAtCursor ? `U+${charAtCursor.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')} (${charAtCursor})` : 'なし';

		const statusMessage = [
			`ファイルパス: ${filePath}`,
			`ファイル名: ${fileName}`,'',
			`総文字数: ${charCount}`,
			`行数（改行数）: ${lineCount}`,'',
			`カーソル位置の文字コード: ${charCode}`
		].join('\n');

		vscode.window.showInformationMessage(statusMessage, { modal: true });
	});

	context.subscriptions.push(showDocumentStatusDisposable);

	const spaceAfterPunctDisposable = vscode.commands.registerCommand('guns-tool.spaceAfterPunct', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		const document = editor.document;
		let targetText: string;
		let targetRange: vscode.Range;
		let processScope = 'ドキュメント全体';

		if (editor.selection && !editor.selection.isEmpty) {
			targetText = document.getText(editor.selection);
			targetRange = editor.selection;
			processScope = '選択範囲内';
		} else {
			targetText = document.getText();
			targetRange = new vscode.Range(document.positionAt(0), document.positionAt(targetText.length));
		}

		// 「！」または「？」の直後に空白がない場合、全角スペースを挿入する
		// ただし直後の文字が閉じ括弧/引用符（例：」『）】〉》など）、[（縦中横タグ開始）、または他の punctuation（!！?？）である場合は挿入しない
		// 既に空白や改行がある場合はスキップされる（正規表現で次の文字が空白でない場合のみマッチ）
		// 対象は全角と半角の ! と ? を含む
		const replacedText = targetText.replace(/([!！?？])(?![」『）〕】〉》\[!！?？])([^\s\u3000\n\r])/gu, '$1　$2');

		if (targetText !== replacedText) {
			await editor.edit(editBuilder => {
				editBuilder.replace(targetRange, replacedText);
			});
			vscode.window.showInformationMessage(`${processScope}の感嘆符/疑問符の後にスペースを挿入しました。`);
		} else {
			vscode.window.showInformationMessage(`${processScope}に感嘆符/疑問符の変換対象が見つかりませんでした。`);
		}
	});

	context.subscriptions.push(spaceAfterPunctDisposable);

	const applyAllFixesDisposable = vscode.commands.registerCommand('guns-tool.applyAllFixes', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		// 設定から実行順序と無効化リストを取得する
		const config = vscode.workspace.getConfiguration('gunsTool');
		const defaultCommands = [
			'guns-tool.insertSpace',
			'guns-tool.removePunctuation',
			'guns-tool.tateCombiCharacters',
			'guns-tool.rubyConvertAozoraToBccks',
			'guns-tool.convertAozoraEmphasisToBccks',
			'guns-tool.fullwidthSingleAlphabet',
			'guns-tool.fullwidthAcronym',
			'guns-tool.tateChuyokoTwoDigit',
			'guns-tool.fixEllipsis',
			'guns-tool.spaceAfterPunct'
		];
		const configuredOrder = config.get<string[]>('applyAllFixes.commandOrder') || defaultCommands;
		const disabledCommands = config.get<string[]>('applyAllFixes.disabledCommands') || [];

		// 最終実行リストを決定（設定順序に従い、disabled に含まれるものは除外）
		const commands = configuredOrder.filter(cmd => !disabledCommands.includes(cmd));

		if (commands.length === 0) {
			vscode.window.showInformationMessage('実行対象のコマンドがありません。設定を確認してください。');
			return;
		}

		// 実行前にユーザに確認ダイアログを表示する（日本語のコマンド名で順序付きリスト）
		const commandTitleMap: { [id: string]: string } = {
			'guns-tool.insertSpace': '行頭にスペース挿入',
			'guns-tool.removePunctuation': 'カッコ内末尾の句点削除',
			'guns-tool.tateCombiCharacters': '全角！！、！？を縦中横に',
			'guns-tool.rubyConvertAozoraToBccks': 'ルビ変換：青空→BCCKS',
			'guns-tool.rubyConvertBccksToAozora': 'ルビ変換：BCCKS→青空',
			'guns-tool.convertAozoraEmphasisToBccks':'青空文庫形式の傍点をBCCKS形式の圏点に変換',
			'guns-tool.fullwidthSingleAlphabet': 'アルファベット単独文字を全角に',
			'guns-tool.fullwidthAcronym': 'アルファベット略称（3文字以下）を全角に',
			'guns-tool.tateChuyokoTwoDigit': '半角数値（2ケタ）を縦中横に',
			'guns-tool.fixEllipsis': '三点リーダ修正',
			'guns-tool.spaceAfterPunct': '感嘆符/疑問符の後にスペース',
			'guns-tool.fullwidthDigitsToKanji': '全角数字を漢数字に',
			'guns-tool.dashNormalization': 'ダッシュ整形'
		};

		const lines = commands.map((cmd, idx) => `${idx + 1}. ${commandTitleMap[cmd] || cmd}`);
		const message = `以下の ${commands.length} 件のコマンドを実行します。\n\n${lines.join('\n')}\n\nよろしいですか？`;

		const confirm = await vscode.window.showInformationMessage(
			message,
			{ modal: true },
			'実行する',
			'キャンセル'
		);
		if (confirm !== '実行する') {
			vscode.window.showInformationMessage('全修正はキャンセルされました。');
			return;
		}

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

	const toggleAlternatingLineBackgroundDisposable = vscode.commands.registerCommand('guns-tool.toggleAlternatingLineBackground', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage('アクティブなエディタがありません。');
			return;
		}

		// トグル: 既に適用されていればリセット、されていなければセット
		if (alternatingLineDecorations) {
			// リセット処理
			editor.setDecorations(alternatingLineDecorations.evenDecoration, []);
			editor.setDecorations(alternatingLineDecorations.oddDecoration, []);
			alternatingLineDecorations.evenDecoration.dispose();
			alternatingLineDecorations.oddDecoration.dispose();
			alternatingLineDecorations = null;
			vscode.window.showInformationMessage('行背景色をリセットしました。');
		} else {
			// セット処理
			const config = vscode.workspace.getConfiguration('gunsTool.alternatingLineBackground');
			const evenBgColor = config.get<string>('evenLineColor', 'rgba(255, 255, 200, 0.1)');
			const oddBgColor = config.get<string>('oddLineColor', 'rgba(200, 255, 255, 0.1)');

			const evenDecoration = vscode.window.createTextEditorDecorationType({
				backgroundColor: evenBgColor,
				isWholeLine: true
			});

			const oddDecoration = vscode.window.createTextEditorDecorationType({
				backgroundColor: oddBgColor,
				isWholeLine: true
			});

			alternatingLineDecorations = { evenDecoration, oddDecoration };

			const document = editor.document;
			const evenRanges: vscode.Range[] = [];
			const oddRanges: vscode.Range[] = [];
			let lineIndex = 0; // 実際の行カウント（空行・空白のみ行を除外）

			for (let i = 0; i < document.lineCount; i++) {
				const line = document.lineAt(i);
				const trimmed = line.text.trim();
				
				// 空行または空白のみの行はスキップ
				if (trimmed === '') {
					continue;
				}

				const range = line.range;
				if (lineIndex % 2 === 0) {
					evenRanges.push(range);
				} else {
					oddRanges.push(range);
				}
				lineIndex++;
			}

			editor.setDecorations(evenDecoration, evenRanges);
			editor.setDecorations(oddDecoration, oddRanges);

			vscode.window.showInformationMessage('行背景色を適用しました。');
		}
	});

	context.subscriptions.push(toggleAlternatingLineBackgroundDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
