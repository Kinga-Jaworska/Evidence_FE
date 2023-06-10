import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "../../hooks";

function LoginScreen() {
  const { setAccessToken, setAuthData } = useStore();
  const router = useRouter();

  return (
    <div>
      <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
        <div>
          <GoogleLogin
            useOneTap
            onSuccess={async (credentialResponse) => {
              const response = await axios.post("http://localhost:3000/login", {
                token: credentialResponse.credential,
              });

              const data = response.data;
              localStorage.setItem("authData", JSON.stringify(data));
              localStorage.setItem(
                "accessToken",
                String(credentialResponse.credential)
              );

              setAuthData(data);
              setAccessToken(String(credentialResponse.credential));

              router.push("/start");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginScreen;
