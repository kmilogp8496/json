import { createUserIfNotExists } from '~~/server/services/user/createUserIfNotExists.service'

const githubSuccessHtml /** lang=html */
= `<!DOCTYPE html>
<html>
  <head>
    <title>GitHub OAuth Success</title>
  </head>
  <body>
    <h1>GitHub OAuth Success</h1>

    If this window is not closed automatically, please close it manually or head to <a href="/">home</a>.
    <script>
      window.close()
    </script>
  </body>
</html>`

interface GithubUserSession {
  login: string // username
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: ''
  url: string // profile url
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: false
  name: string
  company: null | string
  blog: string
  location: string | null
  email: string
  hireable: string | null
  bio: string | null
  twitter_username: null | string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

interface GithubTokensSession {
  access_token: string
  token_type: string
  scope: string
}

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  // @ts-expect-error does not accept void as return type
  async onSuccess(event, { user }: { user: GithubUserSession, tokens: GithubTokensSession }) {
    const userCreated = await createUserIfNotExists({ email: user.email })

    await setUserSession(event, {
      user: {
        email: user.email,
        id: userCreated.id,
      },
    })

    return githubSuccessHtml
  },
  onError(event, error) {
    throw createError({
      statusCode: 401,
      statusMessage: error.message,
      message: 'Failed to authenticate with GitHub',
    })
  },
})
