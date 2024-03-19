import express from "express";

import dotenv from "dotenv";
import router from "./src/routes";
import { reqLogger } from "./src/utils/logger";
import { RequestContext } from "@mikro-orm/core";
import initDb from "./src/db";

const init = async (migrate = true) => {
	dotenv.config();

	const app = express();
	const port = 3000;

	const db = await initDb();

	if (migrate) {
		await db.orm.migrator.up();
	}

	// Add default middlewares
	app.use(reqLogger);
	app.use(express.json());

	// Add a request context middleware
	app.use((req, res, next) => {
		RequestContext.create(db.orm.em, next);
	});

	// Add the router
	app.use("/api", router);

	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
};

init()
	.then(() => {
		console.log("Bootstrapped");
	})
	.catch((err) => {
		console.error(err);
	});
