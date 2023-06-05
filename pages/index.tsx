import type { NextPage } from "next";
import LoginPage from "./auth/login";

const Home: NextPage = () => {
  // console.log("TOKEN", isAuthenticated);
  // const router = useRouter();
  // const { token } = useAuth();

  // return token ? <Start /> : <LoginPage />;
  return <LoginPage />;
};

export default Home;
