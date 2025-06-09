import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

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
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">Send SOL</h1>

      <Input
        type="text"
        className="px-2 py-1 focus:outline-none border-black border-[1px]"
        onChange={(e) => setToRecipient(e.target.value)}
        placeholder="Enter recipient's public key"
        value={toRecipient}
        name="toRecipient"
        required
      />

      <Input
        type="text"
        className="px-2 py-1 focus:outline-none border-black border-[1px]"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in SOL (e.g., 0.5)"
        value={amount}
        name="amount"
        required
      />

      <Button onClick={sendTokens}>Send Tokens</Button>
    </div>
  );
}

export default SendTokens;
