// https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest
// https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

// GET API/File アクセス
const xhr = new XMLHttpRequest();
xhr.open("GET", "/hello.json");
// 読み込み後にイベントリスナに渡した関数を実行する
// xhr.onload = (event) => { ... } でも良いが複数のリスナ関数を登録できない
xhr.addEventListener("load", (event) => {
  console.log(xhr.responseText);
});
// ヘッダを書き換えたらネットワークパネルで確認してみよう
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();

// HEAD リクエストの利用例
const headxhr = new XMLHttpRequest();
headxhr.open("HEAD", "/hello.json");
headxhr.addEventListener("load", (event) => {
  console.log(headxhr.getResponseHeader("content-type"));
  console.log(headxhr.getResponseHeader("date"));
  console.log(headxhr.getResponseHeader("server"));
});
headxhr.send();
