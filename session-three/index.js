const inquirer = require("inquirer");
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";

const callDslSearchByName = async (name) => {

  const body = {
    "query": {
      "match": {
        "title": name
      }
    }
  };

  const { data } = await axios.post(`${ELASTIC_URL}/${INDEX}/_search`, body);

  parseResult(data.hits.hits);
};

const mapperBook = (hit) => {
  return {
    title: hit._source.title,
    author: hit._source.author,
    price: hit._source.price,
    score: hit._score
  };
};

const parseResult = (hits) => {

  let books = [];

  hits.forEach((hit) => {

    books.push(mapperBook(hit));
  });

  console.table(books);
};

(async () => {

  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the book's name: "
    }
  ]).then((answers) => {
    callDslSearchByName(answers['title']);
  }).catch((err) => console.log(err));
})();