import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: `${process.env.CLIENT_ID}`,
      // @ts-ignore
      clientSecret: `${process.env.CLIENT_SECRET}`,
      debug: true,
      // @ts-ignore
      checks: console.log(""),
    }),
  ],
  callbacks: {
    async signIn(params) {
      const { user } = params;

      if (user.email) {
        const allowedEmails = [
          "seni.tembe@gmail.com",
          "oliverbonallack@gmail.com",
        ];

        if (allowedEmails.includes(user.email)) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
  },
  secret: process.env.SECRET_KEYS,
  session: {
    strategy: "jwt",
  },
});
