import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
import Spinner from "./Spinner";

import BookDetails from "./BookDetails";

class BookList extends Component {
  state = {
    selected: null
  };

  bookSelected = id => {
    this.setState({
      selected: id
    });
  };

  displayBooks = () => {
    const data = this.props.data;
    return data.loading ? (
      <Spinner />
    ) : (
      data.books.map(book => (
        <li key={book.id} onClick={e => this.bookSelected(book.id)}>
          {book.name}
        </li>
      ))
    );
  };
  render() {
    return (
      <>
        <ul className="booklist">{this.displayBooks()}</ul>

        <BookDetails bookId={this.state.selected} />
      </>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
