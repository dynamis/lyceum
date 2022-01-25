// 最初にコードを簡潔にするための関数・定数を定義します
const dataListUrl = "/data/list.json";
let dataList;
const delayTime = 2000;

// 指定 ms 後に解決する Profime を返す関数
// 所謂 sleep 関数と思ってもよい
// await delay(2000) で 2 秒待つといった使い方
function delay(timeoutMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeoutMs);
  });
}

async function fetchJsonData(url) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  // fetch はリソースを取得すると解決するプロミスを返す関数
  // https://developer.mozilla.org/ja/docs/Web/API/fetch
  const response = await fetch(url, options);
  // レスポンスは文字列では無く ReadbleStream であることに注意
  // text() や json() メソッドでレスポンスボディを読み込む
  const jsonData = await response.json();
  return jsonData;
}

// ページ読み込み時の下処理
window.addEventListener("DOMContentLoaded", async () => {
  // 最初にデータリストだけ取得しておく
  dataList = await fetchJsonData(dataListUrl);
  console.log(`${dataListUrl}:`, dataList);
});

/* ボタンクリックイベントのリスナとしてサンプルコードを書きます:
  document
    .getElementById("buttonId")
    .addEventListener("click", async () => {
      // ボタンを押したときに実行する非同期処理コード
      // async 関数としているため await が使える
    });
   */

// Promise の基本的な使い方
document.getElementById("promiseBasis").addEventListener("click", async () => {
  console.log("Promise の基本的な使い方");

  fetchJsonData(dataList[0]).then(
    function onFulfilled(data) {
      // fetch リクエスト成功時の処理
      console.log(`${dataList[0]}:`, data);
    },
    function onRejected(error) {
      // fetch リクエスト失敗時の処理
      console.log(error);
    }
  );
});

// Promise の基本的な使い方 (矢印関数で簡潔に)
document.getElementById("promiseSimple").addEventListener("click", async () => {
  console.log("Promise の基本的な使い方 (矢印関数で簡潔に)");
  fetchJsonData(dataList[1]).then(
    (data) => {
      console.log(`${dataList[1]}:`, data);
    },
    (error) => {
      console.log(error);
    }
  );
});

// Promise チェイン
document.getElementById("promiseChain").addEventListener("click", async () => {
  console.log("Promise チェイン");

  fetchJsonData(dataList[2])
    .then((data) => {
      // 最初の非同期処理完了後に次を実行
      console.log(`${dataList[2]}:`, data);
      // 次の非同期処理を実行するプロミスを渡す
      return fetchJsonData(dataList[3]);
    })
    .then((data) => {
      // 前の非同期処理完了後に次を実行
      console.log(`${dataList[3]}:`, data);
      console.log(`${delayTime} ms 待ちます`);
      // 次の非同期処理を実行するプロミスを渡す
      return delay(delayTime);
    })
    .then((data) => {
      // 前の非同期処理完了後に次を実行
      console.log(`${delayTime} ms 経過しました`);
      // 次の非同期処理を実行するプロミスを渡す
      return fetchJsonData(dataList[4]);
    })
    .then((data) => {
      // 前の非同期処理完了後に次を実行
      console.log(`${dataList[4]}:`, data);
      // 次の非同期処理を実行するプロミスを渡す
      // CORS 許可していない外部オリジンへの fetch は...
      return fetchJsonData("https://webdino.org/");
    })
    .then((data) => {
      // 前の非同期処理完了後に次を実行
      // しかしエラーが起きると解決せずリジェクトされ、これは実行されない
      console.log(`data from external origin`, data);
    })
    .catch((error) => {
      // エラー発生時の処理 (CORS エラーで fetch 失敗)
      console.log(error);
    });
});

// Async/Await の利用
document.getElementById("promiseAsync").addEventListener("click", async () => {
  console.log("Async/Await の利用");

  // Promise を then で受ける処理を await で簡略化
  let data5 = await fetchJsonData(dataList[5]);
  console.log(`${dataList[5]}:`, data5);
  let data6 = await fetchJsonData(dataList[6]);
  console.log(`${dataList[6]}:`, data6);
  console.log(`${delayTime} ms 待ちます`);
  await delay(delayTime);
  console.log(`${delayTime} ms 経過しました`);
  let data7 = await fetchJsonData(dataList[7]);
  console.log(`${dataList[7]}:`, data7);
});

// 既存の JavaScript 構文とプロミス
document.getElementById("promiseAndJS").addEventListener("click", async () => {
  console.log("既存の JavaScript 構文とプロミス");

  // for await では 1 つずつ逐次処理
  for (let i = 0; i < dataList.length; i++) {
    let data = await fetchJsonData(dataList[i]);
    console.log(`${dataList[i]}:`, data);
  }

  // Array の forEach は順不同の並列処理
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  dataList.forEach(async (dataItemUrl) => {
    let data = await fetchJsonData(dataItemUrl);
    console.log(`${dataItemUrl}:`, data);
  });
});

document.getElementById("promiseAll").addEventListener("click", async () => {
  console.log("Promise の並列実行 (Promise.all)");
  const startTime = Date.now();
  const promiseArray = [
    delay(100),
    delay(2000),
    delay(10),
    delay(1000),
    delay(500)
  ];

  // Promise.all にプロミスの配列を渡すと並列実行する
  // Promise.all は全てのプロミスが解決すると解決するプロミスを作る
  await Promise.all(promiseArray);
  const endTime = Date.now();
  console.log(`全ての時間経過待ちを完了 (${endTime - startTime} ms経過)`);
});

document.getElementById("promiseRace").addEventListener("click", async () => {
  console.log("Promise の並列実行 (Promise.race)");
  const startTime = Date.now();
  const promiseArray = [
    delay(100),
    delay(2000),
    delay(10),
    delay(1000),
    delay(500)
  ];

  // Promise.race にプロミスの配列を渡すと並列実行する
  // Promise.race はいずれかのプロミスが解決すると解決するプロミスを作る
  await Promise.race(promiseArray);
  const endTime = Date.now();
  console.log(`最短の時間経過待ちを完了 (${endTime - startTime} ms経過)`);
  // この時点で残りのプロミスは解決していないことに注意
});

document.getElementById("fetchAll").addEventListener("click", async () => {
  console.log("Fetch の並列実行 (Promise.all の利用)");

  // 並列処理するプロミスの配列を作る (この時点で非同期処理は順次開始)
  const promiseArray = [];
  const dataArray = [];
  dataList.forEach(async (dataItemUrl) => {
    // API アクセスだけでレスポンスデータを捨てて良いなら:
    // promiseArray.push(fetchJsonData(dataItemUrl));

    // 「データをフェッチし結果を配列に収めるプロミス」を配列に追加する
    // then でチェインを繋いた結果がプロミスであることに注意
    promiseArray.push(
      fetchJsonData(dataItemUrl).then((data) => {
        console.log(data);
        dataArray.push(data);
      })
      // これはダメ: dataArray.push(await fetchJsonData(dataItemUrl))
      // ここで await 使うとその時点で解決してしまいプロミスの配列にならない
    );
  });
  promiseArray.push(delay(delayTime));

  // Promise.all でなく Promise.race を使う場合と比較してみると良い
  await Promise.all(promiseArray);
  console.log(`全てのデータ取得完了かつ ${delayTime} ms 以上経過`);
  console.log(dataArray);
});
