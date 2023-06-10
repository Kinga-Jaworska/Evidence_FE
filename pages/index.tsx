import type { NextPage } from "next";
import { useRouter } from "next/router";
import LoginPage from "../src/components/auth/login-screen";
import Profile from "../src/components/profile";
import { useStore } from "../src/hooks";

const Home: NextPage = () => {
  const { accessToken } = useStore();
  const router = useRouter();

  // useEffect(() => {
  //   // const storedAccessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     // Perform any additional actions with the retrieved accessToken
  //     // e.g., redirect to the desired page
  //     router.push("/start");
  //   } else router.push("/");
  // }, [accessToken]);

  // const { accessToken } = useStore();
  // const [isAuth, setIsAuth] = useState(!!accessToken);

  // useEffect(() => {
  //   console.log("TOKEN");
  //   if (accessToken) setIsAuth(true);
  // }, [accessToken]);

  return accessToken ? <Profile /> : <LoginPage />;
};

export default Home;
