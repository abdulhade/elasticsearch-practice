"use strict";

var inquirer = require("inquirer");

var axios = require("axios");

var ELASTIC_URL = "http://localhost:9200";
var INDEX = "books";

var callDslSearchByName = function callDslSearchByName(name) {
  var body, _ref, data;

  return regeneratorRuntime.async(function callDslSearchByName$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = {
            "query": {
              "match": {
                "title": name
              }
            }
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.post("".concat(ELASTIC_URL, "/").concat(INDEX, "/_search"), body));

        case 3:
          _ref = _context.sent;
          data = _ref.data;
          parseResult(data.hits.hits);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var mapperBook = function mapperBook(hit) {
  return {
    title: hit._source.title,
    author: hit._source.author,
    price: hit._source.price,
    score: hit._score
  };
};

var parseResult = function parseResult(hits) {
  var books = [];
  hits.forEach(function (hit) {
    books.push(mapperBook(hit));
  });
  console.table(books);
};

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the book's name: "
          }]).then(function (answers) {
            callDslSearchByName(answers['title']);
          })["catch"](function (err) {
            return console.log(err);
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
})();