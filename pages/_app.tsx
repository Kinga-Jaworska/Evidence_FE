import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "react-datetime/css/react-datetime.css";
import { Provider } from "react-redux";
import "../styles/globals.scss";

import { ReactNode } from "react";
import { AuthContext } from "../src/context/auth-context";
import useAuth from "../src/hooks/use-auth";
import { wrapper } from "./../store/store";

const queryClient = new QueryClient();

type props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: props) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
