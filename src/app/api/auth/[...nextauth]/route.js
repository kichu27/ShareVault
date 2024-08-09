import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Connect from "@/app/Database/dbconn";
import { User } from "@/Models/UserModel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        await Connect();

        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = await User.create({
            email: user.email,
            username: user.name,
            provider: account.provider,
            googleId: account.provider === 'google' ? profile.id : null,
            profile_link: account.provider === 'google' ? profile.picture : null,
          });
        }

        token.id = existingUser._id.toString();
        token.email = user.email;
        token.username = existingUser.username;
        token.provider = existingUser.provider;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("the session  before is " , session)
      session.user = {
        ...session.user,  // Retain the default fields (name, email, image)
        id: token.id,
        username: token.username,
        provider: token.provider
      };
      console.log("the session  after is " , session)
     
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
