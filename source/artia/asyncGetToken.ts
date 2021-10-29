const https = require("follow-redirects").https;
const fs = require("fs");

interface ParamsGetToken {
  email: string;
  password: string;
}

export function asyncGetToken(params: ParamsGetToken) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      hostname: "app.artia.com",
      path: "/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      maxRedirects: 20,
    };

    var req = https.request(options, function (res: any) {
      var chunks: any = [];

      res.on("data", function (chunk: any) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk: any) {
        var body = Buffer.concat(chunks);
        const bodyString = body.toString();
        const objJson = JSON.parse(bodyString);
        const token = objJson.data.authenticationByEmail.token;
        resolve(token.toString());
      });

      res.on("error", function (error: any) {
        console.error(error);
        reject(error);
      });
    });

    var postData = JSON.stringify({
      query: `mutation{
          authenticationByEmail(email:"${params.email}", password: "${params.password}") {
              token
        }
      }`,
      variables: {},
    });

    req.write(postData);

    req.end();
  });
}
