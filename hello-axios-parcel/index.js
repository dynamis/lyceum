import axios from "axios";

(async () => {
  const options = {
    method: "GET",
    url: "/hello.json",
    headers: {
      "Content-Type": "application/json"
    }
    /* data: {
      key: "value"
    } */
  };
  const response = await axios(options);
  console.log(response.data);

  const headOptions = {
    method: "HEAD",
    url: "/hello.json",
    headers: {
      "Content-Type": "application/json"
    }
    /* data: {
      key: "value"
    } */
  };
  const headResponse = await axios(headOptions);
  console.log(headResponse.headers);
  console.log(headResponse.headers.date);
  console.log(headResponse.headers["content-type"]);
})();
