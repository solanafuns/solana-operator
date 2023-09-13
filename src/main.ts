import { initializeKeypair } from "./init";
import * as web3 from "@solana/web3.js";
import {
  createMint,
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

const connection = new web3.Connection("http://127.0.0.1:8899");
// const connection = new web3.Connection(web3.clusterApiUrl("devnet"),"finalized");

const main = async () => {
  const pair = await initializeKeypair(connection);
  const newToken = web3.Keypair.generate();
  const address = await createMint(
    connection,
    pair,
    pair.publicKey,
    pair.publicKey,
    5,
    newToken,
    undefined,
    TOKEN_PROGRAM_ID
  );
  console.log(`token address : ${address}`);

  const myAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    pair,
    address,
    pair.publicKey
  );
  console.log(`my account : ${myAccount.address}`);

  const myAccountAgain = await getOrCreateAssociatedTokenAccount(
    connection,
    pair,
    address,
    pair.publicKey
  );

  console.log(`my account : ${myAccountAgain.address}`);
};

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
