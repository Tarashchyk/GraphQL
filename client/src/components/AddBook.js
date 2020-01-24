import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

import { flowRight as compose } from "lodash";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    return data.loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };

  submitForm = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  render() {
    return (
      <form onSubmit={this.submitForm} className="addForm">
        <div className="field">
          <label htmlFor="">Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="">Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="">Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>
          <i className="fas fa-plus fa-sm"></i>
        </button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
