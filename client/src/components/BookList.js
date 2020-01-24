import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";
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
      <div>loading books...</div>
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
