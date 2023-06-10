import type { NextPage } from "next";
import LoginScreen from "../src/components/auth/login-screen";
import Profile from "../src/components/profile";

const LoginPage: NextPage = () => {
  return (
    <>
      <Profile />
      <LoginScreen />
    </>
  );
};

export default LoginPage;
