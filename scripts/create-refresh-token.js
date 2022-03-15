/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const fetch = require("isomorphic-fetch");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const config = require("./config");

const createCredentials = async () => {
  const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=${config.clientId}&redirect_uri=urn:ietf:wg:oauth:2.0:oob`;

  console.log("Open the following link in your browser and insert the auth code below:");
  console.log();
  console.log(url);
  console.log();

  readline.question("Please insert the auth code:\n", async (authCode) => {
    readline.close();

    const response = await fetch("https://accounts.google.com/o/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${config.clientId}&client_secret=${config.clientSecret}&code=${authCode}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob`,
    });

    if (!response.ok) {
      throw new Error("Failed to retrieve oauth token");
    }

    const oauth = await response.json();
    console.log();
    console.log("Refresh Token:")
    console.log(oauth.refresh_token);
  });
};

createCredentials();
