import { initializeKeypair } from "./init";
import * as web3 from "@solana/web3.js";
import {
  createMint,
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  mintTo,
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
  await mintTo(
    connection,
    pair,
    address,
    myAccount.address,
    pair.publicKey,
    100
  );

  const oneAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    pair,
    new web3.PublicKey("Egc1viDzjDCJGD3TPm4jdZsLDRm3jKQSzbegRg4E6akA"),
    pair.publicKey
  );

  console.log(`one account : ${oneAccount.address}`);
  await mintTo(
    connection,
    pair,
    address,
    oneAccount.address,
    pair.publicKey,
    100
  );
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
