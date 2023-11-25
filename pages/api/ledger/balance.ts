//@ts-ignore
import { clientPromise } from "../../../src/utils/database";

const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);
    let deposits = 0;
    let balance = 0;
    let withdrawals = 0;

    const { query } = req;
    const { address } = query;

    if (!address) {
      console.log(req);
      return res.status(303).json({});
    }

    const totalDeposits = await db
      .collection("ledger")
      .aggregate([
        {
          $match: {
            $or: [{ fromAddress: address }],
          },
        },
        {
          $group: {
            _id: null,
            totalAdaSent: { $sum: "$amount.quantity" },
          },
        },
      ])
      .toArray();

    if (totalDeposits.length) {
      deposits = totalDeposits[0].totalAdaSent;
    }

    const totalWithdraw = await db
      .collection("ledger")
      .aggregate([
        {
          $match: {
            $or: [{ toAddress: address }],
          },
        },
        {
          $group: {
            _id: null,
            totalAdaSent: { $sum: "$amount.quantity" },
          },
        },
      ])
      .toArray();

    if (totalWithdraw.length) {
      withdrawals = totalWithdraw[0].totalAdaSent;
    }

    balance = deposits - withdrawals;

    return res.status(200).json({ balance });
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
