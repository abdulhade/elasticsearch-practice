const { Book } = require('../models');
const axios = require("axios");

const ELASTIC_URL = "http://localhost:9200";
const INDEX = "books";

const elasticCreateDocument = async (book) => {

 await axios.put(`${ELASTIC_URL}/${INDEX}/_doc/${book.id}`, book);

};

//Init import Books from sqlite file
(async () => {

  try {
    const books = await Book.findAll();

    for (let index = 0; index < books.length; index++) {
      const book = books[index];
      const bJson = book.toJSON();

    await elasticCreateDocument(bJson);

     console.log(`Book added, name: ${bJson.title}`);
    }

  } catch (e) {
    console.log(e);
  }
})();
