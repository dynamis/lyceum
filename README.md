# Lyceum

Web エンジニア育成を行う Project Lyceum で利用するサンプルコードの置き場

## Hello HTTP Request

JavaScript から XHR/Axios/Fetch を使って HTTP リクエストを発行する最小限のコードサンプル

- [Hello XHR](hello-xhr)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-xhr)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-xhr)
- [Hello Axios](hello-axios-parcel)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-axios-parcel)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-axios-parcel)
- [Hello Fetch](hello-fetch)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-fetch)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-fetch)

注: サンプルコード準備時点の StackBlitz では HEAD リクエストなど一部のメソッドによるリクエストにサーバが応答しないなどの制限があるため CodeSandbox での演習を推奨します。

## Hello Github API

JavaScript から (Personal Access Token を用いて) Github REST API にアクセスする最小限のコードサンプル

- [Hello Github API](hello-github-api)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-github-api)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-github-api)

## Promise

JavaScript での非同期処理と Promise についての基本を確認するためのコードサンプル

- [Promise による非同処理](promise)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/promise)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/promise)

## Node.js

Node.js (http モジュール) で Web サーバを起動する最小サンプル

- [Hello Node.js](hello-node)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-node)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-node)

## Express

Express でサーバを作る基本を確認するためのサンプル

- [Hello Express](hello-express)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-express)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-express)
- [Hello Express Routing](express-routing)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/express-routing)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/express-routing)
- [Express Generator (ESM)](express-generator-esm)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/express-generator-esm)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/express-generator-esm)

## AWS JS SDK

AWS JS SDK を使ってみる為のサンプル

- [Hello AWS JS SDK](hello-aws-js-sdk)
  - [CodeSandbox で実行](http://urls.jp/lyceum/csb/hello-aws-js-sdk)
  - [StackBlitz で実行](http://urls.jp/lyceum/sb/hello-aws-js-sdk)

注: フォークした上で AWS_ACCESS_KEY_ID と AWS_SECRET_ACCESS_KEY を環境変数に設定してご利用ください。StackBlitz で環境変数を設定するには .stackblitzrc ファイルに書き込むという方法がありますが、これは public な workspace の場合はシークレットアクセスキーの漏洩に繋がるため (課金して非公開で使う場合以外は) 避けてください。
