"use strict";

// @ts-nocheck
var inquirer = require("inquirer");

var axios = require("axios");

var ELASTIC_URL = "http://localhost:9200";
var INDEX = "books";

var elasticCreateDocument = function elasticCreateDocument(title, author, rating) {
  var response;
  return regeneratorRuntime.async(function elasticCreateDocument$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.post("".concat(ELASTIC_URL, "/").concat(INDEX, "/_doc"), {
            title: title,
            author: author,
            rating: rating
          }));

        case 2:
          response = _context.sent;
          console.log(response.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var elasticUpdateDocument = function elasticUpdateDocument(id, title, author, rating) {
  var response;
  return regeneratorRuntime.async(function elasticUpdateDocument$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(axios.put("".concat(ELASTIC_URL, "/").concat(INDEX, "/_doc/").concat(id), {
            title: title,
            author: author,
            rating: rating
          }));

        case 2:
          response = _context2.sent;
          console.log(response.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var elasticDeleteDocument = function elasticDeleteDocument(id) {
  var response;
  return regeneratorRuntime.async(function elasticDeleteDocument$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(axios["delete"]("".concat(ELASTIC_URL, "/").concat(INDEX, "/_doc/").concat(id)));

        case 2:
          response = _context3.sent;
          console.log(response.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var elasticAllDocuments = function elasticAllDocuments(toSearch) {
  var paramsAllDocs, response;
  return regeneratorRuntime.async(function elasticAllDocuments$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          paramsAllDocs = '_search?filter_path=hits.hits';
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios.get("".concat(ELASTIC_URL, "/").concat(INDEX, "/").concat(paramsAllDocs)));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data.hits.hits);

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var listDocuments = function listDocuments(toSearch, action) {
  var hits;
  return regeneratorRuntime.async(function listDocuments$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(elasticAllDocuments(toSearch));

        case 2:
          hits = _context5.sent;
          inquirer.prompt([{
            type: "rawlist",
            name: "action",
            message: "Action?",
            choices: hits.map(function (_ref) {
              var _source = _ref._source;
              return _source.title;
            })
          }]).then(function (answers) {
            var docSelected = hits.filter(function (d) {
              return d._source.title === answers['action'];
            })[0];

            switch (action) {
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
          })["catch"](function (e) {
            console.log(e);
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var createDocument = function createDocument() {
  return regeneratorRuntime.async(function createDocument$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Title:"
          }, {
            type: "input",
            name: "author",
            message: "Author:"
          }, {
            type: "input",
            name: "rating",
            message: "Rating:"
          }]).then(function (answers) {
            elasticCreateDocument(answers['title'], answers['author'], answers['rating']);
          })["catch"](function (e) {
            console.log(e);
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var updateDocument = function updateDocument(docId) {
  return regeneratorRuntime.async(function updateDocument$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          inquirer.prompt([{
            type: "input",
            name: "title",
            message: "Title:"
          }, {
            type: "input",
            name: "author",
            message: "Author:"
          }, {
            type: "input",
            name: "rating",
            message: "Rating:"
          }]).then(function (answers) {
            var title = answers.title,
                author = answers.author,
                rating = answers.rating;
            elasticUpdateDocument(docId, title, author, rating);
          })["catch"](function (e) {
            console.log(e);
          });

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

(function () {
  inquirer.prompt([{
    type: "rawlist",
    name: "action",
    message: "Action?",
    choices: ["Update Documents", "Create Document", "Delete Document"]
  }]).then(function (answers) {
    console.log(answers);

    switch (answers['action']) {
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
  })["catch"](function (e) {
    console.log(e);
  });
})();