const axios = require("axios");

async function fetchContents(
  owner,
  repo,
  path = ""
) {

  const url =
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response =
    await axios.get(url);

  let results = [];

  for (const item of response.data) {

    results.push(item);

    if (item.type === "dir") {

      const nested =
        await fetchContents(
          owner,
          repo,
          item.path
        );

      results.push(...nested);

    }

  }

  return results;
}

async function fetchFileContent(
  owner,
  repo,
  path
) {

  const url =
  `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;

  const response =
    await axios.get(url);

  return response.data;
}

module.exports = {
  fetchContents,
  fetchFileContent
};