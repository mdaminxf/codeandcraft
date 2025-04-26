// lib/auth.ts
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}

        // Replace this with a real DB/user lookup
        if (email === 'mdamin313@gmail.com' && password === 'Md@min313') {
          return { id: '1', name: 'Admin User', email }
        }

        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin' // custom login page route
  }
}
