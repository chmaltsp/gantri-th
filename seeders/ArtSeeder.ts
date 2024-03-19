import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { finished } from "stream/promises";
import { Art } from "../src/models/art.entity.js";

export class ArtSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const content = await createReadStream("the-tate-collection.csv");

		const processFile = async () => {
			const records = [];
			const parser = content.pipe(parse({ columns: true, delimiter: ";" }));

			parser.on("readable", function () {
				let record;

				while ((record = parser.read()) !== null) {
					records.push(record as never);
					em.create(Art, {
						artist: record["artist"],
						title: record["title"],
						id: parseInt(record["id"]),
						year: record["year"],
						createdAt: new Date(),
						updatedAt: new Date(),
					});
				}
			});

			await finished(parser);
			return records;
		};

		await processFile();
	}
}
