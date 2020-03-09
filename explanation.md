We create a directory for our project and install Puppeteer

```
mkdir heroku-puppeteer && cd $_
npm i puppeteer
```

Note: you can also install [Puppeteer-core](https://github.com/puppeteer/puppeteer#puppeteer-core) instead, which won't install a new version of Chromium and can use an already installed, or a remote, one.

We create a .env file that stores the environment variables that we'll need such as username, password, heroku team name and the likes.

```sh
# .env

TEAM=team_name
USER_NAME=your_email
USER_PASSWORD=your_password

```

In case you're committing, remember not check in this file! You can check in an `.env.example` file with fake values as an example.

We need a centralised place to store all of our variables that are ok to be stored in the code.
I used a file named `src/vars.js` for this purpose:

```
module.exports = {
  loginUrl: "https://id.heroku.com/login"
};
```

We can finally add our `index.js` so we can start writing some real code.

```js
require("dotenv").config();
// etc.
```
