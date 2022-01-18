// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch

// 非同期関数を宣言して即時実行
// async/await は非同期関数内でのみ利用できるため
(async () => {
  // GET File/API アクセスで JSON データを取得する
  const url = "/hello.json";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
    // POST リクエストを使う場合はここにリクエストボディを設定
    /* body: JSON.stringify({
      key: 'value'
    }) */
  };
  // レスポンスは文字列では無く ReadbleStream で返ってくる
  const response = await fetch(url, options);
  // text() や json() メソッドでレスポンスボディを読み込む
  const jsonData = await response.json();
  console.log(jsonData);

  // HEAD リクエストの利用例
  const headOptions = {
    method: "HEAD",
    headers: {
      "Content-Type": "application/json"
    }
  };
  // レスポンスは文字列では無く ReadbleStream で返ってくる
  const headResponse = await fetch(url, headOptions);
  // text() や json() メソッドでレスポンスボディを読み込む
  console.log(headResponse.headers);
  console.log(headResponse.headers.get("date"));
  console.log(headResponse.headers.get("content-type"));
})();
