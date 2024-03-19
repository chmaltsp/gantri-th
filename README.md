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

To run in dev mode run `npm run dev`

## Notes

Notice that relative module imports have a `.js` extension, this may look a little weird, but when using Native ESM Modules + Typescript 4+ it seems to be required. If I had more time I would probably set up the `paths` in tsconfig to combat this. 

## Postman Collection

Feel free to load the postman collection to test the endpoints in `postmanCollection.json`.

