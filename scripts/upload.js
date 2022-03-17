/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const { access } = require("fs/promises");
const { createReadStream, constants } = require("fs");
const fetch = require("isomorphic-fetch");
const config = require("./config");
const fetchAccessToken = require("./fetchAccessToken");

// https://developer.chrome.com/docs/webstore/using_webstore_api/

const uploadPackage = async (accessToken, package) => {
  const response = await fetch(`https://www.googleapis.com/upload/chromewebstore/v1.1/items/${config.itemId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "x-goog-api-version": "2"
    },
    body: package
  });

  if (!response.ok) {
    console.log(`status: ${response.status} ${response.statusText}`);
    const body = await response.text();
    console.log(`body: ${body}`);
    throw new Error("Failed to upload package");
  }

  const result = await response.json();
  if (result.uploadState === "FAILURE") {
    console.log(JSON.stringify(result, null, 2));
    throw new Error("Failed to upload package");
  }
};

const upload = async () => {
  console.log("... check package");
  try {
    await access(config.package, constants.R_OK);
  } catch {
    throw new Error(`could not read package ${config.package}`);
  }

  console.log("... fetch access token");
  const accessToken = await fetchAccessToken();

  console.log("... upload package");
  await uploadPackage(accessToken, createReadStream(config.package));
};

upload();
