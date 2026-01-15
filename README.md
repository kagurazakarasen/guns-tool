# GUNS TOOL : 小説執筆用・原稿テキスト整形アシストツール

![GUNS TOOL](icon.png)

VSCode拡張機能を利用した縦書き用テキスト原稿（主にBCCKS用、ガンズ＆ユニバース（旧群雛）向け）の原稿作成のアシストツールです。

生原稿テキストファイルをBCCKSフォーマットで提出用に整形します。

原稿執筆最終段階の整形用に便利です。

https://BCCKS.com での利用を中心に考えていますが、単にテキストを変換・整形しているだけですので、BCCKS以外でも利用可能です。


作成される原稿テキストの表記規則は：
https://www.aiajp.org/2014/01/gunsu_21.html
の「本文（縦書き）の表記」および
https://gunsu.jp/2014/12/20/conventions/
に準拠します。


※個人使用のために作成したものです（永遠にテスト中）。過度に信用なさいませんように＞＜


動作中のエディタの内容を修正しますが、保存はしませんので、原稿修正後はご自身の目でよく確認してから保存するようにしてください。

マーケットプレイスで公開してみました：https://marketplace.visualstudio.com/items?itemName=RASEN-WORKS.guns-tool


---
# インストール方法など

- https://note.com/rasen/n/nfef5974f4793
- ↑こちらに概要と簡単なインストール方法、使いかたの説明を書いておきました。

- https://note.com/rasen/n/ne9078ddede22
- ↑こちらには制作時のドキュメントをドキュメントタッチで（？）残してあります。

---
---
# 使いかた

 * コマンドパレット（Ctrl+Shift+P）から、コマンドを入力し実行

※ [GTool:全修正を一括で行う](#guns-tool.applyAllFixes) を入力すると設定された機能が一括で実行されます。

---
---

# コマンド・機能詳細
---

## コマンド一覧（目次）

以下は本拡張が提供するコマンドの目次です。クリックすると該当の説明にジャンプします。

### 一括実行コマンド
- [GTool:全修正を一括で行う](#guns-tool.applyAllFixes)

### ファイル内全体修正コマンド

※アクティブなファイル全体に作用するコマンドです。（選択範囲がある場合はその内部のみの動作となります）

- [GTool:行頭にスペース挿入](#guns-tool.insertSpace)
- [GTool:全角！！、！？等を半角横指定に変換](#guns-tool.tateCombiCharacters)
- [GTool:全角数字を漢数字に](#guns-tool.fullwidthDigitsToKanji)
- [GTool:ルビ変換：青空→BCCKS](#guns-tool.rubyConvertAozoraToBccks)
- [GTool:ルビ変換2：BCCKS→青空](#guns-tool.rubyConvertBccksToAozora)
- [GTool:青空文庫形式傍点をBCCKS形式圏点へ変換](#guns-tool.convertAozoraEmphasisToBccks)
- [GTool:BCCKS形式圏点を青空文庫形式傍点へ変換](#guns-tool.convertBccksEmphasisToAozora)
- [GTool:アルファベット単独文字を全角に](#guns-tool.fullwidthSingleAlphabet)
- [GTool:アルファベット略称（3文字以下）を全角に](#guns-tool.fullwidthAcronym)
- [GTool:半角数値（２ケタ）を縦中横に](#guns-tool.tateChuyokoTwoDigit)
- [GTool:三点リーダ修正](#guns-tool.fixEllipsis)
- [GTool:感嘆符/疑問符の後にスペース](#guns-tool.spaceAfterPunct)
- [GTool:ダッシュ整形](#guns-tool.dashNormalization)

### 選択範囲内修正コマンド

※選択範囲指定が必要なコマンドです。

- [GTool:選択範囲にBCCKSルビを設定](#guns-tool.setRubyForSelection)
- [GTool:選択範囲に圏点ルビ（1文字毎）を設定](#guns-tool.setCirclePointRuby)
- [GTool:なろう形式傍点追加](#guns-tool.addNarouEmphasis)
- [GTool:選択範囲内アルファベット小文字を大文字化](#guns-tool.toUpperCase)
- [GTool:選択範囲内の半角英数字を全角に](#guns-tool.halfwidthToFullwidth)

### 情報表示コマンド
- [GTool:文書ステイタス表示](#guns-tool.showDocumentStatus)

### 表示支援コマンド
- [GTool:行毎交互背景色セット／リセット](#guns-tool.toggleAlternatingLineBackground)

---
---

<a id="guns-tool.applyAllFixes"></a>

## コマンド：「GTool:全修正を一括で行う」
 * guns-tool.applyAllFixes

### 機能：

 * 以下の全てのコマンドを一括で実行します。
 * デフォルト状態で青空文庫形式で書かれたテキストをBCCKSのアップ用に変更するように設定されています。

### 実行順序：

1. 行頭にスペース挿入（insertSpace）
2. カッコ内末尾の句点削除（removePunctuation）
3. 全角！！、！？等を半角横指定に変換（tateCombiCharacters）
4. ルビ変換：青空→BCCKS（rubyConvertAozoraToBccks）
5. 青空文庫形式傍点をBCCKS形式圏点へ変換（convertAozoraEmphasisToBccks）
6. アルファベット単独文字を全角に（fullwidthSingleAlphabet）
7. アルファベット略称（3文字以下）を全角に（fullwidthAcronym）
8. 半角数値（２ケタ）を縦中横に（tateChuyokoTwoDigit）
9. 三点リーダ修正（fixEllipsis）
10. 感嘆符/疑問符の後にスペース挿入（spaceAfterPunct）
11. ダッシュ記号整形（dashNormalization）

### 使用例

コマンドパレット（Ctrl+Shift+P）から「GTool:全修正を一括で行う」を実行すると、上記の11コマンドが順番に実行されます。

BCCKSにアップする前のテキスト原稿ファイルに対してこのコマンドを一度実行するだけで一気に基本的整形が行われたりします。

※ v0.1.4 以降は下記のように`settings.json`を修正することでコマンド順序と実行可否の設定が可能です。

### 設定で実行するコマンドの順序・ON/OFFを切り替える

`GTool:全修正を一括で行う` は、設定で実行するコマンドの順序変更や個別コマンドの無効化ができます。VS Code の `settings.json` に以下のように記述します

（例）：

```json
{
	"gunsTool.applyAllFixes.commandOrder": [
		"guns-tool.insertSpace",
		"guns-tool.removePunctuation",
		"guns-tool.fullwidthSingleAlphabet",
		"guns-tool.fixEllipsis",
		"guns-tool.spaceAfterPunct"
	],
	"gunsTool.applyAllFixes.disabledCommands": [
		"guns-tool.spaceAfterPunct"
	]
}
```

上記の例では、実行順序を変更しつつ `guns-tool.spaceAfterPunct` を無効化しています。`commandOrder` に記載した順序でコマンドが実行され、`disabledCommands` に含まれるコマンドはスキップされます。


---

---
# 個別コマンド詳細

※一括コマンドから呼び出されています

---

<a id="guns-tool.insertSpace"></a>

## コマンド：「GTool:行頭にスペース挿入」
 * guns-tool.insertSpace

### 機能
 * 各行（段落）の行頭にスペースを挿入する。最初からスペースがある場合や、セリフ括弧（「や『）などの記号の場合は何もせずにスキップする。

---
<a id="guns-tool.tateCombiCharacters"></a>

## コマンド：「GTool:全角！！、！？等を半角横指定に変換」
 * guns-tool.tateCombiCharacters


### 機能：
* 全角！！、！？等の多重感嘆符を半角に変換し、縦中横指定タグで囲む

### 動作例：
* ！！ → [tcy]!![/tcy]
* ！？ → [tcy]!?[/tcy]
* ？！ → [tcy]?![/tcy]
* ？？ → [tcy]??[/tcy]

---

<a id="guns-tool.fullwidthDigitsToKanji"></a>

## コマンド：「GTool:全角数字を漢数字に」
 * guns-tool.fullwidthDigitsToKanji

### 機能：

 * ドキュメント内の全角数字（０〜９）を対応する漢数字に変換します。
 * 変換ルール: `０` → `〇`, `１` → `一`, `２` → `二`, `３` → `三`, `４` → `四`, `５` → `五`, `６` → `六`, `７` → `七`, `８` → `八`, `９` → `九`。

#### 動作例

入力: 価格は１２３円です → 出力: 価格は一二三円です

入力: コード番号００１ → 出力: コード番号〇〇一

---
<a id="guns-tool.rubyConvertAozoraToBccks"></a>

## コマンド：「GTool:ルビ変換：青空→BCCKS」
 * guns-tool.rubyConvertAozoraToBccks



### 機能：

* 青空文庫形式:｜本文《ルビ》 → BCCKS形式: {本文}(ルビ) に変換
* ルビ開始記号「｜」がない場合、《ルビ》の直前の連続した同一文字種（漢字、ひらがな、カタカナ、英数字等）を本文として自動判定します。

#### 動作例

入力：  ｜爆裂《ばくれつ》→変換出力：  {爆裂}(ばくれつ)

入力：  爆裂《ばくれつ》→変換出力：  {爆裂}(ばくれつ)（｜記号なしでも変換可能）

入力：  彼は疾走《しっそう》した→変換出力：  彼は{疾走}(しっそう)した（「疾走」のみがルビ本文と判定）

入力：  ABCシステム《エービーシー》→変換出力：  ABC{システム}(エービーシー)（カタカナ部分のみがルビ本文）

---
<a id="guns-tool.rubyConvertBccksToAozora"></a>

## コマンド：「GTool:ルビ変換2：BCCKS→青空」
 * guns-tool.rubyConvertBccksToAozora

### 機能：

* BCCKS形式: {本文}(ルビ) → 青空文庫形式: ｜本文《ルビ》 に変換

#### 動作例

入力：  {爆裂}(ばくれつ)　→　変換出力：  ｜爆裂《ばくれつ》


---

<a id="guns-tool.convertAozoraEmphasisToBccks"></a>

## コマンド：「GTool:青空文庫形式傍点をBCCKS形式圏点へ変換」
 * guns-tool.convertAozoraEmphasisToBccks

### 機能：

* 青空文庫形式の傍点: 文字列［＃「文字列」に傍点］ → BCCKS形式の圏点: {文}(﹅) {字}(﹅) {列}(﹅) に変換
* 傍点対象の文字列を1文字ずつ圏点ルビ形式に展開します。

#### 動作例

入力：  電子機器［＃「電子機器」に傍点］

出力：  {電}(﹅) {子}(﹅) {機}(﹅) {器}(﹅)

入力：  重要［＃「重要」に傍点］な情報

出力：  {重}(﹅) {要}(﹅)な情報

---

<a id="guns-tool.convertBccksEmphasisToAozora"></a>

## コマンド：「GTool:BCCKS形式圏点を青空文庫形式傍点へ変換」
 * guns-tool.convertBccksEmphasisToAozora

### 機能：

* BCCKS形式の圏点: {文}(﹅) {字}(﹅) {列}(﹅) → 青空文庫形式の傍点: 文字列［＃「文字列」に傍点］ に変換
* 連続した圏点ルビを1つの傍点記法にまとめます。

#### 動作例

入力：  {電}(﹅) {子}(﹅) {機}(﹅) {器}(﹅)

出力：  電子機器［＃「電子機器」に傍点］

入力：  {重}(﹅) {要}(﹅)な情報

出力：  重要［＃「重要」に傍点］な情報

---

<a id="guns-tool.fullwidthSingleAlphabet"></a>

## コマンド：「GTool:アルファベット単独文字を全角に」
 * guns-tool.fullwidthSingleAlphabet

### 機能：

 * 日本語文中に単独で現れる半角英数字（例：漢字 A 漢字、漢字 1 漢字、A 漢字）を全角に変換します。

※ 範囲選択されている場合は、その内部のみが対象になります。

#### 動作例

入力: 漢字 A 漢字 → 出力: 漢字 Ａ 漢字 

入力: 漢字 1 漢字 → 出力: 漢字 １ 漢字

入力: A 漢字 → 出力: Ａ 漢字

（片側のみ日本語でもマッチするケースは今の実装では「両側が日本語」のみにマッチします。）

---

<a id="guns-tool.fullwidthAcronym"></a>

## コマンド：「GTool:アルファベット略称（3文字以下）を全角に」
 * guns-tool.fullwidthAcronym

### 機能：

 * 日本語文中に単独で現れる大文字アルファベット1～3文字の略称（例：漢字 ABC 漢字、漢字 AI 漢字）を全角に変換します。

※ 範囲選択されている場合は、その内部のみが対象になります。


#### 動作例

入力: 漢字 ABC 漢字 → 出力: 漢字 ＡＢＣ 漢字

入力: 漢字 AI 漢字 → 出力: 漢字 ＡＩ 漢字

入力: 漢字 A 漢字 → 出力: 漢字 Ａ 漢字

---

<a id="guns-tool.tateChuyokoTwoDigit"></a>

## コマンド：「GTool:半角数値（２ケタ）を縦中横に」
 * guns-tool.tateChuyokoTwoDigit

### 機能：

 * 日本語文中に単独で現れる2ケタの半角数値を縦中横タグ[tcy]で囲みます。

#### 動作例

入力: 漢字 12 漢字 → 出力: 漢字 [tcy]12[/tcy] 漢字

入力: 漢字 99 漢字 → 出力: 漢字 [tcy]99[/tcy] 漢字

---

<a id="guns-tool.fixEllipsis"></a>

## コマンド：「GTool:三点リーダ修正」
 * guns-tool.fixEllipsis

### 機能：

 * 「・・・」「‥」「…」など複数の形式の三点リーダを統一します。これらの文字の1文字以上の連続を「……」（U+2026の2連続）に統一します。

#### 動作例

入力: 漢字・・・漢字 → 出力: 漢字……漢字

入力: 漢字‥漢字 → 出力: 漢字……漢字

入力: 漢字…‥・漢字 → 出力: 漢字……漢字

---

<a id="guns-tool.spaceAfterPunct"></a>

## コマンド：「GTool:感嘆符/疑問符の後にスペース挿入」
 * guns-tool.spaceAfterPunct

### 機能：

 * 感嘆符（！と!）または疑問符（？と?）の直後に空白がない場合、全角スペースを挿入します。
 * ただし、直後の文字が閉じ括弧や閉じ引用符（例：」『）【〉》など）、`[`（縦中横タグ開始）、または別の感嘆符/疑問符である場合は、スペースを挿入しません。

#### 動作例

入力: 彼は叫んだ！世界へ → 出力: 彼は叫んだ！　世界へ

入力: 本当に驚いた！？ → 出力: 本当に驚いた！？（スペース挿入なし）

入力: 「何だ？」と思った → 出力: 「何だ？」と思った（」の前なのでスペース挿入なし）

入力: 驚いた！[tcy]!![/tcy]ね → 出力: 驚いた！[tcy]!![/tcy]ね（[の前なのでスペース挿入なし）

---

<a id="guns-tool.dashNormalization"></a>

## コマンド：「GTool:ダッシュ整形」
 * guns-tool.dashNormalization

### 機能：

 * ドキュメント内の各種ダッシュ記号の2連続をU+2500「──」に統一します。
 * 対象: `ーー`（全角音長音符）、`--`（半角ハイフン）、`——`（U+2014 EM DASH）、`――`（U+2015 HORIZONTAL BAR）、水平線、マイナス記号、全角アンダースコア

#### 動作例

入力: これはーー区切り → 出力: これは──区切り

入力: 開始--終了 → 出力: 開始──終了

入力: 前――後ろ → 出力: 前──後ろ

---

---
### 選択範囲で実行されるコマンド
---
<a id="guns-tool.setRubyForSelection"></a>

## コマンド：「GTool:選択範囲にBCCKSルビを設定」
 * guns-tool.setRubyForSelection

### 機能：

 * ドキュメント内でテキストを選択し（複数選択も可）、このコマンドを実行すると、入力欄が表示されます。表示された入力欄にルビ（ふりがな）を入力して確定すると、選択テキストが BCCKS 形式のルビ `{本文}(ルビ)` に置換されます。

#### 動作例

選択： `爆裂` を選択した状態でコマンドを実行し、入力欄に `ばくれつ` と入力すると：

出力: `{爆裂}(ばくれつ)`

複数選択に対しては同じルビが全ての選択範囲に適用されます。

---
<a id="guns-tool.setCirclePointRuby"></a>

## コマンド：「GTool:選択範囲に圏点ルビ（1文字毎）を設定」
 * guns-tool.setCirclePointRuby

### 機能：

 * ドキュメント内でテキストを選択し（複数選択も可）、このコマンドを実行すると、選択テキストの1文字ごとに圏点（﹅）をルビとしてセットします。各文字は BCCKS 形式 `{文字}(﹅)` に置換され、複数の文字はスペース区切りで出力されます。

#### 動作例

選択： `爆裂` を選択した状態でコマンドを実行すると：

出力: `{爆}(﹅) {裂}(﹅)`

選択： `ABC` を選択した状態でコマンドを実行すると：

出力: `{A}(﹅) {B}(﹅) {C}(﹅)`

---

<a id="guns-tool.addNarouEmphasis"></a>

## コマンド：「GTool:なろう形式傍点挿入」
 * guns-tool.addNarouEmphasis

### 機能：

 * ドキュメント内でテキストを選択し（複数選択も可）、このコマンドを実行すると、選択テキストの1文字ごとに「|字《・》」形式の傍点をセットします。なろう系小説投稿サイト（小説家になろう等）で使用される傍点記法です。

#### 動作例

選択： `傍点` を選択した状態でコマンドを実行すると：

出力: `|傍《・》|点《・》`

選択： `重要` を選択した状態でコマンドを実行すると：

出力: `|重《・》|要《・》`

選択： `ABC` を選択した状態でコマンドを実行すると：

出力: `|A《・》|B《・》|C《・》`

複数選択に対しては各選択範囲それぞれに傍点が適用されます。

---

<a id="guns-tool.toUpperCase"></a>

## コマンド：「GTool:選択範囲内アルファベット小文字を大文字化」
 * guns-tool.toUpperCase

### 機能：

 * ドキュメント内で選択したテキスト内のアルファベット小文字を大文字に変換します。半角小文字（a-z）と全角小文字（ａ-ｚ）の両方に対応しています。

#### 動作例

選択： `apple` を選択した状態でコマンドを実行すると：

出力: `APPLE`

選択： `ａｐｐｌｅ` を選択した状態でコマンドを実行すると：

出力: `ＡＰＰＬＥ`

選択： `Hello World` を選択した状態でコマンドを実行すると：

出力: `HELLO WORLD`（大文字以外の文字は変わりません）

複数選択に対しては各選択範囲それぞれが大文字化されます。

---

<a id="guns-tool.halfwidthToFullwidth"></a>

## コマンド：「GTool:選択範囲内の半角英数字を全角に」
 * guns-tool.halfwidthToFullwidth

### 機能：

 * ドキュメント内で選択したテキスト内の半角英数字・記号・スペース（ASCII 0x20-0x7E）を全角に変換します。

#### 動作例

選択： `Hello123` を選択した状態でコマンドを実行すると：

出力: `Ｈｅｌｌｏ１２３`

選択： `ABC-xyz-789` を選択した状態でコマンドを実行すると：

出力: `ＡＢＣ－ｘｙｚ－７８９`（ハイフンも変換されます）

選択： `test 2024` を選択した状態でコマンドを実行すると：

出力: `ｔｅｓｔ　２０２４`（空白も全角スペースに変換されます）

選択： `A + B = C` を選択した状態でコマンドを実行すると：

出力: `Ａ　＋　Ｂ　＝　Ｃ`（記号とスペースも全角に変換されます）

複数選択に対しては各選択範囲それぞれが全角化されます。

---

<a id="guns-tool.showDocumentStatus"></a>

## コマンド：「GTool:文書ステイタス表示」
 * guns-tool.showDocumentStatus

### 機能：

 * 現在アクティブなドキュメントのステイタス情報をダイアログで表示します。
 * 表示される情報：
   - ファイルパス
   - ファイル名
   - ファイル内の文字数
   - ファイル内の行数
   - カーソル位置の文字コード（Unicode）

#### 動作例

コマンドを実行すると、以下のような情報がモーダルダイアログで表示されます：

```
ファイルパス: D:\work\myfile.txt
ファイル名: myfile.txt
文字数: 1234
行数: 56
カーソル位置の文字コード: U+3042 (あ)
```

カーソル位置に文字がない場合は「なし」と表示されます。

---

<a id="guns-tool.toggleAlternatingLineBackground"></a>

## コマンド：「GTool:行毎交互背景色セット／リセット」
 * guns-tool.toggleAlternatingLineBackground

### 機能：

 * ドキュメント内の行ごとに交互に背景色を適用し、行の切り替わりを見やすくし、段落中の意図しない改行を確認できます。
 * トグル操作：1回目の実行で背景色をセット、2回目の実行でリセットされます。
 * 空行または空白のみの行はカウントから除外されます。
 * 背景色はsettings.jsonでカスタマイズできます。

#### 設定例

`settings.json` に以下のように追加して、背景色をカスタマイズできます：

```json
{
  "gunsTool.alternatingLineBackground.evenLineColor": "rgba(255, 255, 200, 0.3)",
  "gunsTool.alternatingLineBackground.oddLineColor": "rgba(200, 255, 255, 0.3)"
}
```

- `evenLineColor`: 偶数行（最初の非空行を0行目としてカウント）の背景色
- `oddLineColor`: 奇数行の背景色

色は CSS 形式（`rgba()`, `#RRGGBB`, `#RRGGBBAA` 等）で指定できます。

#### 動作例

**初回実行（セット）**:

ドキュメント内の非空行に対して、1行おきに異なる背景色が適用されます。

```
これは1行目。  ← 背景色A
これは2行目。  ← 背景色B
これは3行目。  ← 背景色A
                   ← 空行はスキップ
これは4行目。  ← 背景色B
```

**2回目実行（リセット）**:

すべての背景色が解除され、通常の表示に戻ります。

#### 注意事項

- この背景色はエディタ上でのみの一時的な表示で、ファイルには保存されません。
- ファイルを閉じると背景色はリセットされます。
- テキスト編集中の自動更新は行われません。再適用するには、リセット後に再度コマンドを実行してください。

---
---

## 既出の問題

特になし（v0.1.71で解決済み）

---
---

## Release Notes


### v0.0.1
- Initial set-up (Hello world )
### v0.0.2
- 行頭にスペース挿入 機能を追加
### v0.0.3
- カッコ内末尾の句点削除 機能を追加
### v0.0.4
- 全角！！、！？等を半角横指定に変換 機能を追加
### v0.0.5
- ルビ変換：青空→BCCKS 機能を追加
- ルビ変換2：BCCKS→青空 機能を追加
### v0.0.6
- アルファベット単独文字を全角に 機能を追加
- アルファベット略称（3文字以下）を全角に 機能を追加
- 半角数値（２ケタ）を縦中横に 機能を追加
### v0.0.7
- 三点リーダ修正 機能を追加
### v0.0.8
- 感嘆符後にスペース 機能を追加
### v0.1.0
- 一括実行まで機能を追加
- アイコン、ライセンスファイルの作成、追加
- guns-tool-0.1.0.vsix パッケージを作成。
- マーケットプレイスで公開してみる。
### v0.1.1
- マーケットプレイス用修正
### v0.1.2
- コマンド実行時のインフォメーション表示修正
### v0.1.3
- 「全角数字を漢数字に」コマンド追加
### v0.1.32
- 「ダッシュ整形」コマンド追加
### v0.1.4
- applyAllFixesコマンドから呼び出される各コマンドのON/OFFと順序の設定ができるように修正
### v0.1.5
- 選択範囲にBCCKSルビを設定するコマンドを追加
### v0.1.55
- 選択範囲に圏点ルビを設定するコマンドを追加
### v0.1.56
- fullwidthSingleAlphabet と fullwidthAcronym を修正。選択範囲がある場合はその内部のみ実行するように。
### v0.1.57
-「選択範囲内アルファベット小文字を大文字化」コマンド追加
### v0.1.58
-「選択範囲内の半角英数字を全角に」コマンド追加
### v0.1.6
- 「文書ステイタス表示」コマンド追加
### v0.1.70
- 「行毎交互背景色セット／リセット」コマンドを追加
### v0.1.71
- rubyConvertAozoraToBccksコマンドを修正。｜記号なしでも文字種の切り替わりでルビ本文を自動判定できるように改善
### v0.1.72
- 「青空文庫形式傍点をBCCKS形式圏点へ変換」コマンド追加
### v0.1.73
- 「BCCKS形式圏点を青空文庫形式傍点へ変換」コマンド追加
### v0.1.90
- すべてのファイル内全体修正コマンドに、範囲選択時は選択範囲内のみを処理する機能を追加
### v0.1.91
- 「なろう形式傍点挿入」コマンドを追加

---
---

## ToDoっぽいメモ（いつかやるかも？）
- 全コマンド一気の名称から「全」を抜く。（選択できるようにしたので）
- ~~線選択範囲指定のないファイル全体対象コマンドも選択範囲指定を可能に~~　(v0.1.90で対応済み)

---
---

## License

This extension is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

**Enjoy!**
