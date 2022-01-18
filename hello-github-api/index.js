async function getGitHubUserData(user, token) {
  const url = `https://api.github.com/users/${user}`;
  // 非同期処理は await することを忘れずに
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
  if (token) {
    options.headers["Authorization"] = `token ${token}`;
  }
  const response = await fetch(url, options); // JSONを取得
  const userData = await response.json(); // パース
  // userData を返しているが async 関数なのでこれは Promise
  return userData;
}

let sendButton = document.getElementById("sendRequest");
sendButton.addEventListener("click", async () => {
  let tokenInputElement = document.getElementById("githubToken");
  let githubToken = tokenInputElement.value;
  console.log("token:", githubToken);

  // ユーザ単体の画像取得、埋め込み例:
  let username = "WebDINO";
  let userData = await getGitHubUserData(username, githubToken);
  console.log(userData);
  console.log(userData.avatar_url);
  let imgElement = new Image();
  imgElement.src = userData.avatar_url;
  imgElement.style.height = "100px";
  imgElement.style.width = "100px";
  document.body.append(imgElement);

  // 複数ユーザ画像の並列取得例:
  // https://codesandbox.io/s/hello-github-api-parallel-9y5n2?file=/index.js
});
