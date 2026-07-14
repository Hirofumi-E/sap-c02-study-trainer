# SAP-C02 Study Trainer

AWS Certified Solutions Architect - Professional (SAP-C02) の個人学習用Webアプリです。

## 使い方

`index.html` をブラウザで開くだけで動きます。

```text
sap-c02-study-trainer/
├── index.html
├── style.css
├── app.js
├── questions.js
└── README.md
```

## 機能

- 分野別演習
- 10問 / 20問 / 30問 / 全問の出題
- 問題順のランダム化
- 選択肢のランダム化
- 解答後すぐに解説表示
- 不正解だけ復習
- チェック済みだけ復習
- 未回答だけ復習
- 75問模試モード
- ブラウザ内の学習履歴保存

## 問題追加

問題は `questions.js` の `QUESTION_BANK` に追加します。

```js
{
  id: 'd1-999',
  domain: 'domain1',
  tags: ['Organizations', 'SCP'],
  type: 'multiple',
  select: 2,
  question: '問題文',
  choices: [
    { id: 'A', text: '選択肢A' },
    { id: 'B', text: '選択肢B' }
  ],
  answer: ['A', 'B'],
  explanation: '解説'
}
```

## GitHub Pages

GitHub Pagesで公開する場合は、このフォルダをリポジトリにして、`main` ブランチのルートを公開元に設定します。

## 免責

このプロジェクトは非公式の個人学習ツールです。Amazon Web Services, Inc. またはその関連会社による提供・承認・提携を受けたものではありません。

AWS、Amazon Web Services、および各AWSサービス名は、Amazon.com, Inc. またはその関連会社の商標です。

本プロジェクトに含まれる問題は、学習目的で独自に作成した練習問題であり、実際のAWS認定試験問題を複製・再現したものではありません。
