import { useStore } from "../../hooks";
import Profile from "../profile";

function Navigation() {
  const { accessToken } = useStore();
  return accessToken ? <Profile /> : <p>No logged yet</p>;
}

export default Navigation;
