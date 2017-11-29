
## React + Node App Prototype

Base structure to build modern web apps.  

Packages Included:  
1. create-react-app (ejected)
2. semantic-ui-react
3. semantic-ui
4. react-observable-store
5. express
6. express-basic-auth
7. objection ORM
8. sqlite3 (change to your DBMS)  

### How To Run
```
$ cd server
$ npm install
$ cp config.example.json config.json (edit your configurations)
$ npm run migrate
$ npm run start

$ cd ../client
$ npm install
$ cd src/semantic
$ gulp (before you might want to customize theme)
$ cd ../..
$ npm run theme
$ cp public/config.example.json public/config.json (edit your configurations)
$ npm run start
```

### Production
```
$ cd client
$ (edit homepage param in package.json)
$ npm run build
$ cp -R build path/to/deploy
```

### Migrations
```
$ cd server
$ (stop server)
$ npm run migrate
$ npm run start
$ cd client
$ npm run build
$ cp -R build path/to/deploy
```
