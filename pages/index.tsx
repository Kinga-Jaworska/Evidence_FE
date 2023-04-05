import type { NextPage } from "next";
import { AddForm } from "../src/components/forms";

const Home: NextPage = () => {
  return (
    <div>
      <p>Hello</p>
      <AddForm />
    </div>
  );
};

export default Home;
