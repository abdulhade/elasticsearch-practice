const inquirer = require("inquirer");
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";


const callDslSearchRatingGte = async (title, value) => {
  const body = {
    "query": {
      "bool": {
        "must": [
          {
            "match": {
              "title": title
            }
          }
        ],
        "filter": [
          {
            "range": {
              "rating": {
                "gte": value
              }
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
  };

  const { data } = await axios.post(`${ELASTIC_URL}/${INDEX}/_search`, body);

  parseResult(data.hits.hits);
};

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
    rating: hit._source.rating,
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
    },
    {
      type: "number",
      name: "rating",
      message: "Rating greater then value: "
    },
  ]).then((answers) => {
    callDslSearchRatingGte(answers['title'], answers['rating']);
    //callDslSearchByName(answers['title']);
  }).catch((err) => console.log(err));
})();