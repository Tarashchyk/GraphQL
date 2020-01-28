"use strict";

var _graphql = require("graphql");

var _book = _interopRequireDefault(require("../models/book"));

var _Author = _interopRequireDefault(require("../models/Author"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var books = [
//   { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
//   { name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
//   { name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
// ];
// var authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" }
// ];
const BookType = new _graphql.GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: _graphql.GraphQLID
    },
    name: {
      type: _graphql.GraphQLString
    },
    genre: {
      type: _graphql.GraphQLString
    },
    author: {
      type: AuthorType,

      //AUTHOR OF THE BOOK
      resolve(parent, args) {
        return _Author.default.findById(parent.authorId);
      }

    }
  })
});
const AuthorType = new _graphql.GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: _graphql.GraphQLID
    },
    name: {
      type: _graphql.GraphQLString
    },
    age: {
      type: _graphql.GraphQLInt
    },
    //List of book types
    books: {
      type: new _graphql.GraphQLList(BookType),

      //an arr of books that has a particular author id
      resolve(parent, args) {
        return _book.default.find({
          authorId: parent.id
        });
      }

    }
  })
});
const RootQuery = new _graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: _graphql.GraphQLID
        }
      },

      // code to get data from db/othersource
      resolve(parent, args) {
        return _book.default.findById(args.id);
      }

    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: _graphql.GraphQLID
        }
      },

      // code to get data from db/othersource
      resolve(parent, args) {
        return _Author.default.findById(args.id);
      }

    },
    books: {
      type: new _graphql.GraphQLList(BookType),

      // code to get data from db/othersource
      resolve(parent, args) {
        return _book.default.find({});
      }

    },
    authors: {
      type: new _graphql.GraphQLList(AuthorType),

      resolve(parent, args) {
        return _Author.default.find({});
      }

    }
  }
});
const Mutation = new _graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        },
        age: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
        }
      },

      resolve(parent, args) {
        let author = new _Author.default({
          name: args.name,
          age: args.age
        });
        return author.save();
      }

    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        },
        genre: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        },
        authorId: {
          type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        }
      },

      resolve(parent, args) {
        let book = new _book.default({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }

    }
  }
});
module.exports = new _graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});