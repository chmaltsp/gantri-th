import { Router } from "express";
import asyncHandler from "express-async-handler";
import { Art } from "../models/art.entity";
import { Comment } from "../models/comments.entity";
import initDb, { DI } from "../db";
import { validateUser } from "../utils/validateUser";
import { User } from "../models/user.entity";

const router = Router({ mergeParams: true });

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		if (!req.params.id) {
			res.status(400).json({ message: "Invalid request" });
			return;
		}

		const db = await initDb();

		const art = await db.em.findOne(
			Art,
			{ id: parseInt(req.params.id) },
			{
				// Explicitly select fields to avoid returning the entire object, also exclude doesn't seem to work properly in this case
				fields: [
					"comments.content",
					"comments.name",
					"comments.user",
					"comments.id",
					"comments.createdAt",
					"title",
					"year",
					"id",
					"artist",
				],
				populate: ["comments"],
			},
		);

		if (!art) {
			res.status(404).json({ message: "Art Not Found" });
			return;
		}
		res.status(200).json(art);
	}),
);

router.get(
	"/",
	asyncHandler(async (req, res) => {
		const db = await initDb();

		const allArt = await db.em.find(
			Art,
			{},
			{
				fields: [
					"id",
					"title",
					"year",
					"artist",
					"createdAt",
					"updatedAt",
					"comments.content",
					"comments.name",
					"comments.user",
				],
				limit: 100,
			},
		);

		res.status(200).json(allArt);
	}),
);

async function createComment(
	content: string,
	name: string,
	art: Art,
	db: DI,
	user?: User,
) {
	const comment = new Comment();

	comment.content = content;
	comment.name = name;
	comment.art = art;
	if (user) {
		comment.user = user;
	}

	await db.em.persistAndFlush(comment);
	return comment;
}

router.post(
	"/:id/comments",
	asyncHandler(async (req, res) => {
		const { userId, name, content } = req.body;

		const { id } = req.params;

		if (!id) {
			res.status(400).json({ message: "Invalid request" });
			return;
		}

		const db = await initDb();

		let art: Art;
		try {
			art = await db.em.findOneOrFail(Art, { id: parseInt(id) });
		} catch (e) {
			res.status(404).json({ message: "Art Not Found" });
			return;
		}

		if (userId && content) {
			try {
				const validUser = await db.em.findOneOrFail(User, { id: userId });

				const comment = await createComment(
					content,
					validUser.name,
					art,
					db,
					validUser,
				);

				res.status(200).json(comment);
				return;
			} catch (e) {
				res.status(401).json({ message: "No user found" });
				return;
			}
		}

		if (name && content) {
			const commentExists = await db.em.findOne(Comment, { name, art });

			if (commentExists) {
				res.status(400).json({ message: "User already commented" });
				return;
			}

			const comment = await createComment(content, name, art, db);

			res.status(200).json(comment);
			return;
		}

		res.status(400).json({ message: "Invalid request" });
		return;
	}),
);

export default router;
