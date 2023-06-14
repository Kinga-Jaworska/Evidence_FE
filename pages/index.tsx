import type { NextPage } from "next";
import LoginPage from "../src/components/auth/login-screen";
import Profile from "../src/components/profile";
import { useStore } from "../src/hooks";

const Home: NextPage = () => {
  const { accessToken } = useStore();
  // TODO: accessToken stored in cookies + routing

  return accessToken ? <Profile /> : <LoginPage />;
};

export default Home;
