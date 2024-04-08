# API

```
URL - https://team-app-backend.onrender.com/

```

### NOTE! - server is running on a free tier server, it may take some time to send response

| Endpoint            | request  | Data                                                                      | Response Data | Description                      |
| :------------------ | :------- | :------------------------------------------------------------------------ | ------------- | -------------------------------- |
| `/api/users/signup` | `post`   | `body:` {first_name, last_name, email, password, gender, domain}          | `token`       | Create a user account            |
| `/api/users/signin` | `post`   | `body:` {email, password}                                                 | `token`       | Login to the account             |
| `/api/users`        | `get`    | `query:` {skipCount}                                                      | `users[]`     | Get 20 users data                |
| `/api/users/:id`    | `get`    | `params:` {id}                                                            | `user`        | Get user data by id              |
| `/api/users/:id`    | `put`    | `params:` {id} `body:` {first_name, last_name, gender, domain, available} |               | Update user data                 |
| `/api/users/:id`    | `delete` | `params:` {id}                                                            | `user`        | Delete user data                 |
| `/api/team`         | `post`   | `body:` {teamName, teamDescription, teamMembers[]}                        | `data`        | Create team                      |
| `/api/team`         | `get`    |                                                                           | `findTeams[]` | Get teams by admin or members id |
| `/api/team/:id`     | `get`    | `params:` {id}                                                            | `data`        | Get team details                 |

### Note

Response data `token` must be added to the `Authorization` header. Failure to do so results in a `"Token not provided"` message and prevents data retrieval.

#

## How to run locally?

- First create a `.env` file. then put this following data,

  ```bash
  PORT = 8080
  JWT_Secret = "YourSecretPassword"
  DATABASE_URL = "mongoDB connection string"
  ```

- now run this command in `terminal`

  ```bash
  npm install     #install npm package
  npm run dev     #start the server
  ```
