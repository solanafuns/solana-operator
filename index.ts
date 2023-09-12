import { initializeKeypair } from "./init";
import * as web3 from "@solana/web3.js";

const connection = new web3.Connection("http://127.0.0.1:8899");
// const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const main = async () => {
  await initializeKeypair(connection);
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
