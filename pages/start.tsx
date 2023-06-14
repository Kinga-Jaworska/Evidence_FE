import type { NextPage } from "next";
import { StartPageContent } from "../src/components/home-page-content/home-page-content";
import Profile from "../src/components/profile";

const Start: NextPage = () => {
  return (
    <>
      <Profile />
      <StartPageContent />
    </>
  );
};

export default Start;
