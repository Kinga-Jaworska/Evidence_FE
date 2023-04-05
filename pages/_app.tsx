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
