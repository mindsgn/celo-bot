//@ts-ignore
import { clientPromise } from "../../../src/utils/database";

const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);

    const address =
      "addr1q8rgv9mramjm89380x2qhmawstl7wrl08pu72upqjqh8avve9tvp9deukssmkz6dt5c2fnj524sv2w20y2fmvf937c3sh5sd7e";

    const aggregationResult = await db
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

    if (aggregationResult.length > 0) {
      const totalAdaSent = aggregationResult[0].totalAdaSent;
      console.log(`Total ADA sent from ${address}: ${totalAdaSent}`);
      return totalAdaSent;
    } else {
      console.log(`No transactions found for address ${address}`);
      return res.status(303).json({});
      0;
    }
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
