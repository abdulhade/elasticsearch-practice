// @ts-nocheck
const inquirer = require("inquirer");
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books"

const elasticCreateDocument = async (title, author, rating) => {
  const response = await axios.post(`${ELASTIC_URL}/${INDEX}/_doc`, { title, author, rating });

  console.log(response.data);
};

const elasticUpdateDocument = async (id, title, author, rating) => {

  const response = await axios.put(`${ELASTIC_URL}/${INDEX}/_doc/${id}`, { title, author, rating });

  console.log(response.data);
};

const elasticDeleteDocument = async (id) => {

  const response = await axios.delete(`${ELASTIC_URL}/${INDEX}/_doc/${id}`);

  console.log(response.data);
};

const elasticAllDocuments = async (toSearch) => {
  const paramsAllDocs = '_search?filter_path=hits.hits';
  const response = await axios.get(`${ELASTIC_URL}/${INDEX}/${paramsAllDocs}`);

  return response.data.hits.hits;
};

const listDocuments = async (toSearch, action) => {

  let hits = await elasticAllDocuments(toSearch);

  inquirer.prompt([
    {
      type: "rawlist",
      name: "action",
      message: "Action?",
      choices: hits.map(({ _source }) => _source.title )
    }
  ]).then((answers) => {

    let docSelected = hits.filter((d) => {
      return d._source.title === answers['action'];
    })[0];

    switch(action){
      case "Update Documents":
        updateDocument(docSelected._id);
        break;
      case "Delete Document":
        elasticDeleteDocument(docSelected._id);
        break;
      default:
        //Do nothing
        break;
    }

  }).catch((e) => {
    console.log(e);
  });
};

const createDocument = async () => {

  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Title:"
    },
    {
      type: "input",
      name: "author",
      message: "Author:"
    },
    {
      type: "input",
      name: "rating",
      message: "Rating:"
    }
  ]).then((answers) => {

    elasticCreateDocument(answers['title'], answers['author'], answers['rating']);

  })
  .catch((e) => {
    console.log(e);
  });
};

const updateDocument = async (docId) => {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Title:"
    },
    {
      type: "input",
      name: "author",
      message: "Author:"
    },
    {
      type: "input",
      name: "rating",
      message: "Rating:"
    }
  ]).then((answers) => {
    const { title, author, rating } = answers;

    elasticUpdateDocument(docId, title, author, rating);

  })
  .catch((e) => {
    console.log(e);
  });
};


(() => {
  inquirer.prompt([
    {
      type: "rawlist",
      name: "action",
      message: "Action?",
      choices: ["Update Documents", "Create Document", "Delete Document"]
    }
  ]).then((answers) => {
    console.log(answers);
    switch(answers['action']){
      case "Update Documents":
        listDocuments('', answers['action']);
        break;
      case "Create Document":
        createDocument();
        break;
      case "Delete Document":
        listDocuments('', answers['action']);
        break;
      default:
        //Do nothing
        break;
    }
  }).catch((e) => {
    console.log(e);
  });
})();