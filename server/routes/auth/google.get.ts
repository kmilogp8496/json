import { createUserIfNotExists } from '~~/server/services/user/createUserIfNotExists.service'

const googleSuccessHtml /** lang=html */
= `<!DOCTYPE html>
<html>
  <head>
    <title>Google OAuth Success</title>
  </head>
  <body>
    <h1>Google OAuth Success</h1>

    If this window is not closed automatically, please close it manually or head to <a href="/">home</a>.
    <script>
      window.close()
    </script>
  </body>
</html>`

interface GoogleAuthTokens {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  id_token: string
}

interface GoogleUserSession {
  sub: string
  picture: string
  email: string
  email_verified: boolean
}

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['email'],
  },
  // @ts-expect-error does not accept void as return type
  async onSuccess(event, { user }: { user: GoogleUserSession, tokens: GoogleAuthTokens }) {
    if (!user.email_verified)
      throw createError({
        status: 400,
        statusText: 'Google email must be verified',
      })

    const userCreated = await createUserIfNotExists({ email: user.email })

    await setUserSession(event, {
      user: {
        email: user.email,
        id: userCreated.id,
      },
    })

    return googleSuccessHtml
  },
  onError(event, error) {
    throw createError({
      statusCode: 401,
      statusMessage: error.message,
      message: 'Failed to authenticate with Google',
    })
  },
})
