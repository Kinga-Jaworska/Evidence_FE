import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useStore } from "../hooks";

export function Profile() {
  const { setAuthData } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("authData");
    localStorage.removeItem("accessToken");
    setAuthData(null);
    router.push("/");
  };

  return (
    <button
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </button>
  );
}

export default Profile;
