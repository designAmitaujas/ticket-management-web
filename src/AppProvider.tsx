import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import cogoToast from "cogo-toast";
import { FC } from "react";
import { useAppStore } from "./store";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "AUTH_ERROR") {
        cogoToast.error("AUTH_ERROR");
      } else {
        cogoToast.error("SOMETHING WENT WRONG ON SERVER");
      }
    });
  }

  if (networkError) {
    cogoToast.error("INTERNET ERROR");
  }
});

const AppProvider: FC = ({ children }) => {
  const {
    user: { jwt },
  } = useAppStore();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: jwt || "",
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      errorLink,
      authLink.concat(
        createUploadLink({ uri: process.env.REACT_APP_API_URL! as string })
      ),
    ]),
    headers: {
      authorization: jwt || "",
    },
    defaultOptions: {
      query: { fetchPolicy: "no-cache" },
      mutate: { fetchPolicy: "no-cache" },
      watchQuery: { fetchPolicy: "no-cache" },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { AppProvider };
