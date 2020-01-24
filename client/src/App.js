import React, { Component } from "react";
import "./App.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
//COMPONENTS
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

//Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="mainBlock">
          <h1 className="app-name">React Reading List </h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
