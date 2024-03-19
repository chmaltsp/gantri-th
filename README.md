# gantri-th

This project is a take home test for Gantri. It is a simple rest api that queries the tate modern art collection. It also allows user creation and commenting. 

## Tech Stack

- Typescript (TS Node)
- Express
- MikroORM (TS Friendly ORM)
- SQLite

## Running the project
 
1. Git clone the repo `git clone git@github.com:chmaltsp/gantri-th.git`
2. Install dependencies using `npm install` 
3. Seed and Migrate DB `npm run migrate:up && npm run seed`
4. Start Server `npm start`