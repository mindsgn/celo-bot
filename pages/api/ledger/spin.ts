//@ts-ignore
import { clientPromise } from "../../../src/utils/database";
import { getAddress } from "../../../src/utils/wallet";

const getBalance = async (address: string) => {
  const client = await clientPromise;
  const db = await client.db(`${process.env.MONGO_DB}`);

  let deposits = 0;
  let balance = 0;
  let withdrawals = 0;

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

  return (balance = deposits - withdrawals);
};

const handler = async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);

    const response = await getAddress(1);
    //@ts-ignore
    const { address: ledgerAddress } = response;

    const { query } = req;
    const {
      address,
      color = "black",
      type = "odd",
      number = 1,
      betAmount = 1,
    } = query;

    if (!address) {
      console.log(req);
      return res.status(303).json({
        message: "Not enough funds",
      });
    }

    let balance = await getBalance(address);

    if (balance <= 0) {
      return res.status(303).json({});
    }

    let winAmount = 0;
    const numberInteger: number = parseInt(`${number}`);

    const winningNumber = Math.floor(Math.random() * 36) + 1;
    const isEven = winningNumber % 2 === 0;
    const isBlack =
      (winningNumber > 0 && winningNumber <= 10) ||
      (winningNumber > 18 && winningNumber <= 28);

    const isNumberMatch = numberInteger === winningNumber;
    const isColorMatch = color === (isBlack ? "black" : "white");
    const isTypeMatch = type === (isEven ? "even" : "odd");

    let result = "Lose";

    if (isNumberMatch && isColorMatch && isTypeMatch) {
      result = "Win";
    }

    if (result === "Win") {
      winAmount = parseInt(`${betAmount}`) * 2;

      await db.collection("ledger").insertOne({
        result,
        address,
        color: {
          color,
          isBlack,
          isColorMatch,
        },
        type: {
          type,
          isEven,
          isTypeMatch,
        },
        number: {
          number,
          winningNumber,
        },
        betAmount,
        game: "roulette",
        createdAt: new Date(),
        fromAddress: address,
        toAddress: ledgerAddress,
        amount: {
          unit: "lovelace",
          quantity: 1,
        },
        txs: null,
      });
    } else {
      winAmount = parseInt(`${number}`) - parseInt(`${number}`);

      await db.collection("ledger").insertOne({
        result,
        address,
        color: {
          color,
          isBlack,
          isColorMatch,
        },
        type: {
          type,
          isEven,
          isTypeMatch,
        },
        number: {
          number,
          winningNumber,
        },
        betAmount,
        game: "roulette",
        createdAt: new Date(),
        fromAddress: ledgerAddress,
        toAddress: address,
        amount: {
          unit: "lovelace",
          quantity: 1,
        },
        txs: null,
      });
    }

    balance = await getBalance(address);

    return res.status(200).json({ result, balance });
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
