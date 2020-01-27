import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";
import Spinner from "./Spinner";

class BookDetails extends Component {
  displayBookDetails = () => {
    const { book, loading } = this.props.data;
    if (loading) {
      return <Spinner />;
    } else if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>
            <em>{book.author.name}</em>
          </p>
          <p className="authorsBook">All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  render() {
    return <div className="bookDetails">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
