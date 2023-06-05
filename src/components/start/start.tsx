import useAuth from "../../hooks/use-auth";
import { Button } from "../button/button";
import { HomePageContent } from "../home-page-content/home-page-content";

export function Start() {
  const { logout } = useAuth();

  // const addMutation = useMutation({
  //   mutationFn: async () => {
  //     return await fetch("http://localhost:3000/api/v1/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: "test28@gmail.com", password: "test" }),
  //     });
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //     //   toast("Error", { position: "top-right" });
  //   },
  //   onSuccess: async (response) => {
  //     console.log("RESPONSE", response);
  //     const tokens = await response.json();
  //     console.log(tokens);
  //     const accessToken = tokens.access_token;
  //     // document.cookie = `accessToken=${accessToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  //     login(accessToken);
  //     // localStorage.setItem("accessToken", accessToken);
  //   },
  // });

  // const onSubmit = async () => {
  //   addMutation.mutate();
  // };

  // const onTest = async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   const headers = {
  //     Authorization: `Bearer ${accessToken}`,
  //     "Content-Type": "application/json",
  //   };
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/v1/auth/protected`,
  //       {
  //         method: "GET",
  //         headers: {
  //           ...headers,
  //         },
  //       }
  //     );
  //     const res = await response.json();

  //     console.log("RESPONSE", res);

  //     const cookies = document.cookie.split("; ");
  //     const cookie = cookies.find((cookie) =>
  //       cookie.startsWith("accessToken=")
  //     );
  //     const value = cookie?.split("=")[1];
  //     console.log(value);

  //     //   const blob = await response.blob();
  //     //   FileSaver.saveAs(blob, `${currentUser}-evidence.csv`);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // // return headers;

  const onTest = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/auth/protected`,
        {
          method: "GET",
          headers: {
            ...headers,
          },
        }
      );
      const res = await response.json();

      console.log("RESPONSE", res);

      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((cookie) =>
        cookie.startsWith("accessToken=")
      );
      const value = cookie?.split("=")[1];
      console.log(value);

      //   const blob = await response.blob();
      //   FileSaver.saveAs(blob, `${currentUser}-evidence.csv`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Button onClick={logout}>Log out</Button>
      <Button onClick={onTest}>Test Token</Button>

      <HomePageContent />
    </>
  );
}
