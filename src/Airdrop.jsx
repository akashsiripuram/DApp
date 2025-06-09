import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function Airdrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  async function handleAirdrop() {
    await connection.requestAirdrop(wallet.publicKey, amount * 1e9);
    alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toString()}`);
  }
  return (
    <div className="space-y-4">
      <Input
        type="number"
        placeholder="Enter SOL amount (e.g., 0.5)"
        name="amount"
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <Button onClick={handleAirdrop} disabled={!wallet.publicKey}>
        Airdrop Now
      </Button>
    </div>
  );
}

export default Airdrop;
