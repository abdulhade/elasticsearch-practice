"use strict";

var _require = require('../models'),
    Book = _require.Book;

var axios = require("axios");

var ELASTIC_URL = "http://localhost:9200";
var INDEX = "books";

var elasticCreateDocument = function elasticCreateDocument(book) {
  return regeneratorRuntime.async(function elasticCreateDocument$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.put("".concat(ELASTIC_URL, "/").concat(INDEX, "/_doc/").concat(book.id), book));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Init import Books from sqlite file


(function _callee() {
  var books, index, book, bJson;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Book.findAll());

        case 3:
          books = _context2.sent;
          index = 0;

        case 5:
          if (!(index < books.length)) {
            _context2.next = 14;
            break;
          }

          book = books[index];
          bJson = book.toJSON();
          _context2.next = 10;
          return regeneratorRuntime.awrap(elasticCreateDocument(bJson));

        case 10:
          console.log("Book added, name: ".concat(bJson.title));

        case 11:
          index++;
          _context2.next = 5;
          break;

        case 14:
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
})();