// // // import axios from "axios";

// // // const LoginPage = () => {
// // //   const headers = {
// // //     // Authorization: 'Bearer <your_token>',
// // //     "Content-Type": "application/json",
// // //   };
// // //   const handleLogin = async () => {
// // //     const response = await axios.get("http://localhost:3001/google", {
// // //       headers,
// // //     });
// // //     console.log(response);
// // //   };

// // //   return (
// // //     <div>
// // //       <h1>Login Page</h1>
// // //       <button onClick={handleLogin}>Login with Google</button>
// // //     </div>
// // //   );
// // // };

// // // export default LoginPage;

// // // // import axios from "axios";
// // // // // import {} from "react-router-dom";

// // // // const Login = () => {
// // // //   // const history = useHistory();

// // // //   const handleLogin = async () => {
// // // //     try {
// // // //       // Redirect the user to the backend endpoint for initiating the OAuth flow
// // // //       const response = await axios.get("http://localhost:3001/google/login");

// // // //       // Redirect the user to the Google login page
// // // //       window.location.href = response.data.redirectUrl;
// // // //     } catch (error) {
// // // //       console.log("Error:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h1>Login Page</h1>
// // // //       <button onClick={handleLogin}>Login with Google</button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;
// // import { useState } from "react";

// // function LoginPage() {
// //   const [accessToken, setAccessToken] = useState("");

// //   const handleLogin = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3000/auth", {
// //         method: "GET",
// //         // withCredentials: true,
// //         // cross: true,
// //         // mode: "no-cors",
// //       });
// //       // Redirect the user to the authentication route
// //       console.log(response);
// //       // window.location.href = response.data.redirectUrl;
// //     } catch (error) {
// //       console.error("Authentication failed:", error);
// //     }
// //   };

// //   const handleLogout = () => {
// //     // Clear the access token from state or local storage
// //     setAccessToken("");
// //   };

// //   const handleProtectedRequest = async () => {
// //     try {
// //       // Make an authenticated request to a protected endpoint
// //       console.log("protected");
// //       // const response = await axios.get("http://localhost:3000/auth/new", {
// //       //   headers: {
// //       //     Authorization: `Bearer ${accessToken}`,
// //       //   },
// //       // });
// //       // console.log("Protected data:", response.data);
// //     } catch (error) {
// //       console.error("Authenticated request failed:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       {!accessToken ? (
// //         <button onClick={handleLogin}>Login with Google</button>
// //       ) : (
// //         <div>
// //           <button onClick={handleLogout}>Logout</button>
// //           <button onClick={handleProtectedRequest}>
// //             Request Protected Data
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default LoginPage;
// import { useEffect, useState } from "react";

// const LoginPage = () => {
//   const [error, setError] = useState("");
//   useEffect(() => {
//     const handleLogin = async () => {
//       try {
//         // Make a GET request to the backend endpoint to initiate the Google OAuth flow
//         console.log("HELLO");
//         // const response = await fetch("http://localhost:3000/auth/google", {});
//         const response = await fetch("http://localhost:3000/auth/google", {
//           method: "GET",
//           // withCredentials: true,
//           // cross: true,
//           // mode: "no-cors",
//         }).then((odp) => {
//           console.log(odp);
//         });

//         // const respon = await response.json();
//         // console.log(respon);

//         // Redirect the user to the Google OAuth consent screen
//         // window.location.href = redirectUrl;
//       } catch (error) {
//         console.error("Login error:", error);
//       }
//     };

//     handleLogin();
//   }, []);

//   return <div>Logging in...{error}</div>;
// };

// export default LoginPage;
import { signIn, signOut, useSession } from "./../api/auth/[...nextauth]";

export default function MyComponent() {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
