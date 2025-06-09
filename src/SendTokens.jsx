import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";

function SendTokens() {
  const [toRecipient, setToRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendTokens() {
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(toRecipient),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    await wallet.sendTransaction(transaction, connection);
    toast.success("Transaction sent successfully!");
  }
  return (
    <div className="flex flex-col gap-2 w-1/3 p-4">
      <h1 className="text-2xl font-bold">Send Tokens</h1>
      <input
        type="text"
        className="px-2 py-1 focus:outline-none border-black border-[1px]"
        onChange={(e) => setToRecipient(e.target.value)}
        placeholder="Recipient Public Key"
        value={toRecipient}
        name="toRecipient"
        required
      />
      <input
        type="text"
        className="px-2 py-1 focus:outline-none border-black border-[1px]"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in SOL"
        value={amount}
        name="amount"
        required
      />
      <button
        className="cursor-pointer border-2 border-black py-1 px-3 rounded-2xl"
        onClick={sendTokens}>
        Send Tokens
      </button>
    </div>
  );
}

export default SendTokens;
