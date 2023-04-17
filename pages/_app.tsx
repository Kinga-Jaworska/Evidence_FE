<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
=======
import "../styles/globals.scss";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { wrapper } from "./../store/store";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
>>>>>>> origin/add-form
