"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('sequelize'),
    Sequelize = _require.Sequelize,
    Model = _require.Model,
    DataTypes = _require.DataTypes;

var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false
});

var Book =
/*#__PURE__*/
function (_Model) {
  _inherits(Book, _Model);

  function Book() {
    _classCallCheck(this, Book);

    return _possibleConstructorReturn(this, _getPrototypeOf(Book).apply(this, arguments));
  }

  return Book;
}(Model);

Book.init({
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  rating: DataTypes.DECIMAL,
  voters: DataTypes.INTEGER,
  price: DataTypes.DECIMAL,
  currency: DataTypes.STRING,
  description: DataTypes.STRING,
  publisher: DataTypes.STRING,
  page_count: DataTypes.INTEGER,
  generes: DataTypes.STRING,
  ISBN: DataTypes.STRING,
  language: DataTypes.STRING,
  published_date: DataTypes.DATE
}, {
  sequelize: sequelize,
  modelName: 'Book'
});

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(sequelize.sync());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
})();

module.exports = {
  Book: Book
};