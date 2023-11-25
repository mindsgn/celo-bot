//@ts-ignore
import { clientPromise } from "../../../src/utils/database";

const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);

    return res.status(200).json({});
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
