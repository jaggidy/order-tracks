
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
  params: {
    access_type: "offline", // <== важно
    prompt: "consent",
    scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly"
  }
}    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);

