//@ts-ignore
import { clientPromise } from "../../../src/utils/database";

const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);

    const { body } = req;
    const { page, title, contents } = body;

    const response = await db.collection("pages");

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
