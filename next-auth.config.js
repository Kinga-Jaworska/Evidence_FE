import { Provider } from "next-auth/client";

export default {
  providers: [
    Provider.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};
