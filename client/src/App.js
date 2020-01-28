import React, { Component, Suspense } from "react";
import "./App.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//COMPONENTS
// import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import Spinner from "./components/Spinner";

const BookList = React.lazy(() => import("./components/BookList"));
//Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});
// ОТКЛЮЧАЕМ КЕШИРОВАНИЕ
client.defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all"
  }
};

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="mainBlock">
          <h1 className="app-name">React Reading List </h1>
          <Suspense fallback={<Spinner />}>
            <BookList />
          </Suspense>

          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
