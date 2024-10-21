declare module '#auth-utils' {
  interface User {
    email: string
    id: number
  }

  interface UserSession {
    user?: User
    loggedAt?: Date
  }

  interface UserSessionRequired {
    user: User
    loggedAt: Date
  }
}
export {}
