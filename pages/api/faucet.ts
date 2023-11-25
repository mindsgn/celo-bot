//@ts-ignore
import { clientPromise } from "../../src/utils/database";
import { sendPayment } from "../../src/utils/wallet";

const handler = async (req: any, res: any) => {
  //@ts-ignore
  const client = await clientPromise;
  const db = await client.db(`${process.env.MONGO_DB}`);

  try {
    const { query, socket } = req;
    const { remoteAddress } = socket;
    const ip = remoteAddress;
    const { address } = query;
    const twentyFourHoursAgo = new Date(Date.now() - 60 * 60 * 24000);

    if (!address) throw Error;

    const latestEntry = await db
      .collection("faucet")
      .find({
        toAddress: address,
        type: "faucet",
        createdAt: { $gte: twentyFourHoursAgo },
      })
      .sort({ timestamp: -1 })
      .toArray();

    if (latestEntry.length === 0) {
      const response = await sendPayment(
        `${address}`,
        `${process.env.LOVELACE}`,
        `${ip}`,
        `faucet`
      );

      if (response) {
        return res.status(200).json({ response });
      }
    }

    throw Error;
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
