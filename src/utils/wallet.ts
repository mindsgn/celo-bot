import crypto from "crypto";
import nodemailer from "nodemailer";
import { AppWallet, KoiosProvider, Transaction } from "@meshsdk/core";
import { clientPromise } from "./database";

const blockchainProvider = new KoiosProvider(`${process.env.NETWORK}`);

export const splitArray = <T>(arr: T[]): [T[], T[]] => {
  const mid = Math.floor(arr.length / 2);
  const firstHalf = arr.slice(0, mid);
  const secondHalf = arr.slice(mid);
  return [firstHalf, secondHalf];
};

export const encryptKeys = (keys: string | string[]) => {
  const algorithm = "aes-256-cbc";
  const key = crypto
    .createHash("sha256")
    .update(`${process.env.SECRET_KEY}`)
    .digest("base64")
    .substr(0, 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedKeys = cipher.update(JSON.stringify(keys), "utf8", "hex");
  encryptedKeys += cipher.final("hex");

  const encryptedData = iv.toString("hex") + encryptedKeys;
  return encryptedData;
};

export const decryptKeys = (encryptedData: string) => {
  const algorithm = "aes-256-cbc";
  const key = crypto
    .createHash("sha256")
    .update(`${process.env.SECRET_KEY}`)
    .digest("base64")
    .substr(0, 32);

  const iv = Buffer.from(encryptedData.substr(0, 32), "hex");
  const encryptedKeys = encryptedData.substr(32);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedKeys = decipher.update(encryptedKeys, "hex", "utf8");
  decryptedKeys += decipher.final("utf8");

  return JSON.parse(decryptedKeys);
};

export const sendEmail = async (
  title?: string,
  message?: string,
  to?: string
) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: `${"seni.tembe@gmail.com"}`,
        pass: `${"C8mbE6UBHJYK9IvQ"}`,
      },
    });

    await transporter.sendMail({
      from: '"Multiplada Server" <server@mutiplada.com>',
      to: `${to}`,
      subject: `${title}`,
      text: `${message}`,
      html: `<body>${message}<body>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewKeys = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);

    const nmemonic: string[] = await AppWallet.brew();

    const wallet = new AppWallet({
      networkId: parseInt(`${process.env.NETWORK_ID}`),
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: "mnemonic",
        words: nmemonic,
      },
    });

    const rewardAddress = await wallet.getRewardAddress();
    const paymentAddress = await wallet.getPaymentAddress();

    await db.collection("wallet").insertOne({
      nmemonic: encryptKeys(nmemonic),
    });

    if (process.env.NETWORK === "api") {
    }

    return nmemonic;
  } catch (error) {
    return null;
  }
};

export const getKeys = async () => {
  const client = await clientPromise;
  const db = await client.db(`${process.env.MONGO_DB}`);
  try {
    const response = await db.collection("wallet").find().toArray();
    let nmemonic: string[] | any = [];

    if (response.length > 0) {
      nmemonic = decryptKeys(`${response[0].nmemonic}`);
    } else {
      nmemonic = await createNewKeys();
    }

    return nmemonic;
  } catch (error) {
    return null;
  }
};

export const sendPayment = async (
  address: string,
  amount: string,
  ip: string,
  message: string
) => {
  try {
    const keys = await getKeys();

    const wallet = new AppWallet({
      networkId: parseInt(`${process.env.NETWORK_ID}`),
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: "mnemonic",
        words: keys,
      },
    });

    const client = await clientPromise;
    const db = await client.db(`${process.env.MONGO_DB}`);

    const from = await wallet.getPaymentAddress(0);

    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      address,
      amount
    );

    tx.setMetadata(0, message);
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);

    const result = await db.collection("faucet").insertOne({
      toAddress: address,
      type: "faucet",
      ip,
      fromAddress: from,
      txHash: txHash,
      amount: `${process.env.LOVELACE}`,
      unsignedTx: unsignedTx,
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    return null;
  }
};

export const getAddress = async (index: number) => {
  try {
    const keys = await getKeys();

    const wallet = new AppWallet({
      networkId: parseInt(`${process.env.NETWORK_ID}`),
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: "mnemonic",
        words: keys,
      },
    });

    const address = await wallet.getPaymentAddress(index);

    return { address };
  } catch (error) {
    return null;
  }
};
