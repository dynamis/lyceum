const backendPort = 8080;
const backendServerUrl = `http://localhost:${backendPort}/`;

async function getUsers() {
  const endpointUrl = `${backendServerUrl}users`;
  const response = await fetch(endpointUrl);
  const userData = await response.json();
  console.log(userData);
  document.querySelector("#app").append(JSON.stringify(userData));
  return userData;
}

async function getUsersWithContentType() {
  const endpointUrl = `${backendServerUrl}users`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(endpointUrl, options);
  const userData = await response.json();
  console.log(userData);
  document.querySelector("#app").append(JSON.stringify(userData));
  return userData;
}

// getUsers();
// getUsersWithContentType();

async function getGithubUserByUserId(user) {
  const endpointUrl = `${backendServerUrl}users`;
  const url = `${endpointUrl}/${user}/github`;
  const response = await fetch(url);
  const githubUser = await response.json();
  console.log(githubUser);
  document.querySelector("#log").append(githubUser);
  return githubUser;
}

// https://github.com/settings/tokens で Personal Access Token を発行する
// https://docs.github.com/ja/github/authenticating-to-github/creating-a-personal-access-token
// こちらのトークンがあると 60回/時間、IP の制限を回避して API 利用が可能
const githubToken = "522faa8be4414d8c7af33a269389cee644bc14e6";
// あくまでも試験目的でクライアントコードに埋めています
// 実際にはこういったアクセストークンはクライアント側に出さないように
// (バックエンドサーバ側で利用、フロントからのアクセスは中継するなど)

async function getGithubUserData(user, token) {
  const url = `https://api.github.com/users/${user}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `token ${token}`,
    },
  };
  if (token) {
    options.headers["Authorization"] = `token ${token}`;
  }
  const response = await fetch(url, options);
  const userData = await response.json();
  return userData;
}

async function loadImage(url) {
  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
    img.src = url;
  });
  return promise;
}

async function showAvatorImg(username) {
  let userData = await getGithubUserData(username, githubToken);
  console.log(userData);

  const img = await loadImage(userData.avatar_url);
  document.querySelector("#app").append(img);
}

(async () => {
  // showAvatorImg 実行テスト
  // showAvatorImg("github");
  // showAvatorImg("webdino");
  // showAvatorImg("dynamis");
  // showAvatorImg("shibe97");
  showAvatorImg(await getGithubUserByUserId("Brendan"));
  showAvatorImg(await getGithubUserByUserId("dynamis"));
  showAvatorImg(await getGithubUserByUserId("Shibata"));
})();
