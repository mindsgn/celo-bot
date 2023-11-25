//@ts-ignore
import { clientPromise } from "../../../src/utils/database";
import { getAddress, getKeys } from "../../../src/utils/wallet";
export const dynamic = "force-dynamic";

const classifyTransaction = async (transaction: any, txs: string) => {
  const client = await clientPromise;
  const db = await client.db(`${process.env.MONGO_DB}`);

  const { inputs, outputs } = transaction;
  const fromAddress = inputs[0].address;
  const toAddress = outputs[0].address;
  const amount = outputs[0].amount[0];
  const data = {
    fromAddress,
    toAddress,
    amount,
    txs,
  };

  const response = await db
    .collection("ledger")
    .find({
      txs,
    })
    .sort({ timestamp: -1 })
    .toArray();

  if (response.length === 0) {
    await db.collection("ledger").insertOne({
      ...data,
      amount: {
        ...amount,
        quantity: parseFloat(amount.quantity),
      },
    });
  }
};

const getTransactions = async (txs: string) => {
  const apiUrl = `https://cardano-mainnet.blockfrost.io/api/v0/txs/${txs}/utxos`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      project_id: `${process.env.BLOCKFROST_PROJECT_ID}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(async (data) => {
      console.log(data);
      await classifyTransaction(data, txs);
    })
    .catch((error) => {
      return null;
    });
};

const handler = async (req: any, res: any) => {
  try {
    const response = await getAddress(1);

    //@ts-ignore
    const { address } = response;
    const apiUrl = `https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}/transactions?order=desc&count=100`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        project_id: `${process.env.BLOCKFROST_PROJECT_ID}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(async (data) => {
        data.map(async (item: any) => {
          const { tx_hash } = item;
          await getTransactions(tx_hash);
        });

        return res.status(200).json({});
      })
      .catch((error) => {
        return res.status(303).json({});
      });
  } catch (error: any) {
    return res.status(303).json({});
  }
};

export default handler;
