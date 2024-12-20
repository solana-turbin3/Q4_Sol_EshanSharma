import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  let tx = createNft(umi, {
    mint,
    uri: "https://devnet.irys.xyz/2jbB23ZzYv5ufBry3hqe8NZ5ZeY2zm18mftkvgsmjXYs",
    name: "Ruggerd",
    sellerFeeBasisPoints: percentAmount(1),
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  console.log("Mint Address: ", mint.publicKey);
})();
// Succesfully Minted! Check out your TX here: https://explorer.solana.com/tx/4pHbqzEfCCDVaqAZsVhKfvoRLLr3Lc9cKFD1xtULq6Shtzd4hUPdTQS6WkE5y9gL7CP58LapMoC6tWu163HYkFZe?cluster=devnet
// Mint Address:  4RQYahyFv3PXgUppQYTJ2WBuVFFeUrFkqETZ44MFkNjN
// Rug - https://explorer.solana.com/address/4RQYahyFv3PXgUppQYTJ2WBuVFFeUrFkqETZ44MFkNjN?cluster=devnet
