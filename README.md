# VS_Code用拡張機能： Guns_tool 

VS_Code拡張機能を利用したガンズ＆ユニバース（旧群雛）@BCCKS の原稿作成のアシストツール

生原稿テキストファイルを提出用に成形します。

BCCKS用の原稿ファイルの表記規則は：
https://www.aiajp.org/2014/01/gunsu_21.html
に準拠します。

※個人使用のために作成（ただいまテスト中）※

---

# 使いかた

 * コマンドパレット（Ctrl+Shift+P）から、以下のコマンドを入力し実行

 ---

# コマンドと各機能
---

## コマンド：「行頭にスペース挿入」
 * guns-tool.insertSpace

### 機能
 * 各行の行頭にスペースを挿入する。「や『などの記号の場合はキャンセルされる。

---
## コマンド：「全角！！、！？等を半角横指定に変換」
 * guns-tool.tateCombiCharacters


### 機能：
* 全角！！、！？等の多重感嘆符を半角に変換し、縦中横指定タグで囲む

### 動作例：
* ！！ → [tcy]!![/tcy]
* ！？ → [tcy]!?[/tcy]
* ？！ → [tcy]?![/tcy]
* ？？ → [tcy]??[/tcy]

---
## コマンド：「ルビ変換：青空→BCCKS」
 * guns-tool.rubyConvertAozoraToBccks



### 機能：

* 青空文庫形式:|本文《ルビ》 → BCCKS形式: {本文}(ルビ) に変換

#### 動作例

入力：  |爆裂《ばくれつ》

出力：  {爆裂}(ばくれつ)

---
## コマンド：「ルビ変換2：BCCKS→青空」
 * guns-tool.rubyConvertBccksToAozora

### 機能：

* BCCKS形式: {本文}(ルビ) → 青空文庫形式: |本文《ルビ》 に変換

#### 動作例

入力：  {爆裂}(ばくれつ)

出力：  |爆裂《ばくれつ》


---

以下、雛型作成時に自動的に作られたREADME

---

# guns-tool README

This is the README for your extension "guns-tool". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
