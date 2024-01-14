import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Store";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloLink, Observable } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const requestLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("learnifyToken");

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

const responseLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: observer.next.bind(observer),
      error: (error) => {
        console.log(error);

        if (
          error.networkError &&
          (error.networkError.statusCode === 401 ||
            error.networkError.statusCode === 403)
        ) {
          localStorage.removeItem("learnifyToken");
          window.location.reload();
        } else {
          observer.error(error);
        }
      },
      complete: observer.complete.bind(observer),
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  });
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: ApolloLink.from([requestLink, responseLink, httpLink]),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
