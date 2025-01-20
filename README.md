

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.



## 💡 Usage

This section covers how to start the development server and build your project for production.

### Before starting development
Before start the development server, make sure you copy `.env.example` to `.env` and update the corresponding value.
```bash
VITE_SUPABASE_URL=<Your supabase URL>
VITE_SUPABASE_ANON_KEY=<Your supabase Anon key>
```
after that, create table from your supabase dashboard with this schema

```bash
CREATE TABLE movies (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  genres VARCHAR(255) NOT NULL,
  artists VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  release_date DATE NULL,
  rating DECIMAL(3, 2) NULL,
  view_count INTEGER NULL
);
```
### Starting the Development Server
To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.


