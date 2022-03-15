/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const packageJson = require("../package.json");

const clientSecret = process.env.BUGSHOT_CLIENT_SECRET;
if (!clientSecret) {
  throw new Error("Could not find oauth client secret environment variable BUGSHOT_CLIENT_SECRET");
}

module.exports = {
  itemId: "dpehgggbpmclbfgaapnllihhhbcllknb",
  clientId: "17969823583-tfkv67gmrggp3k9bmm3t8bltsf32hhd0.apps.googleusercontent.com",
  clientSecret,
  package: path.join(__dirname, "..", "dist", `bugshot-${packageJson.version}.zip`),
};
