import express, { NextFunction, Request, Response } from "express";

import router from "./src/routes";
import { reqLogger } from "./src/utils/logger";
import { RequestContext } from "@mikro-orm/core";
import initDb from "./src/db";
import bodyParser from "body-parser";

const init = async (migrate = true) => {
	const app = express();
	const port = 3000;

	const db = await initDb();

	if (migrate) {
		await db.orm.migrator.up();
	}

	// Add default middlewares
	app.use(bodyParser.json());
	app.use(reqLogger);
	app.use(express.json());

	// Add a request context middleware
	app.use((req, res, next) => {
		RequestContext.create(db.orm.em, next);
	});

	// Add the router
	app.use("/api", router);

	const errorHandler = (
		err: Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const statusCode = err.stack ? 500 : res.statusCode;

		res.status(statusCode).json({
			message: err.message,
			stack: err.stack,
		});
	};

	app.use(errorHandler);

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
