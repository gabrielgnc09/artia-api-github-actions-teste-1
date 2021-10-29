var https = require("follow-redirects").https;
import { asyncGetToken } from "./asyncGetToken";

interface ParamsArtiaAPI {
  postData: string;
  email: string;
  password: string;
  organizationId: string;
}

export function artiaAPI(params: ParamsArtiaAPI) {
  return new Promise((resolve, reject) => {
    asyncGetToken({ email: params.email, password: params.password })
      .then((token) => {
        console.log(" Token novo =>", token);
        const options = {
          method: "POST",
          hostname: "app.artia.com",
          path: "/graphql",
          headers: {
            OrganizationId: `${params.organizationId}`,
            "Content-Type": "application/json",
            Authorization: "Bearer " + `${token}`,
          },
          maxRedirects: 20,
        };

        const req = https.request(options, function (res: any) {
          const chunks: any = [];

          res.on("data", function (chunk: any) {
            chunks.push(chunk);
          });

          res.on("end", function (chunk: any) {
            var body = Buffer.concat(chunks);

            resolve(body.toString());
          });

          res.on("error", function (error: any) {
            console.error(error);
            reject(error);
          });
        });

        req.write(params.postData);

        req.end();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
