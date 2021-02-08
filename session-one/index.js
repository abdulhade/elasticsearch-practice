
const inquirer = require("inquirer");
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200/"

function getIndex(params) {
  inquirer.prompt([
    {
      type: "input",
      name: "indexName",
      message: "Please provide an index name: "
    }
  ]).then((answers) => {
    elasticGetIndex(answers.indexName);
  }).catch((e) => {
    console.log(e);
  });
}

function createIndex() {
  inquirer.prompt([
    {
      type: "input",
      name: "indexName",
      message: "Please provide an index name: "
    }
  ]).then((answers) => {
    elasticCreateIndex(answers.indexName);
  }).catch((e) => {
    console.log(e);
  });
}

function deleteIndex() {
  inquirer.prompt([
    {
      type: "input",
      name: "indexName",
      message: "Please provide an index name: "
    }
  ]).then((answers) => {
    elasticDeleteIndex(answers.indexName);
  }).catch((e) => {
    console.log(e);
  });
}

async function elasticCreateIndex(indexName) {
  const response = await axios.put(ELASTIC_URL + indexName);

  console.log(response.data);
}

async function elasticGetIndex(indexName) {
  const response = await axios.get(ELASTIC_URL + indexName);

  console.log(JSON.stringify(response.data));
}


async function elasticDeleteIndex(indexName) {
  const response = await axios.delete(ELASTIC_URL + indexName);

  console.log(JSON.stringify(response.data));
}

(function run() {
  inquirer.prompt([
    {
      type: "rawlist",
      name: "action",
      message: "Action?",
      choices: ["Create Index", "Get Index", "Delete Index"]
    }
  ]).then((answers) => {
    console.log(answers);

    switch(answers['action']){
      case "Create Index":
        createIndex();
        break;
      case "Delete Index":
        deleteIndex();
        break;
      case "Get Index":
        getIndex();
        break;
      default:
        //Do nothing
        break;
    }
  }).catch((e) => {
    console.log(e);
  });
})();