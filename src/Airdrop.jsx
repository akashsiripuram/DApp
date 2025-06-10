import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

function Airdrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  const [loading,setLoading]=useState(false);
  async function handleAirdrop() {
    try{
    setLoading(true);
    await connection.requestAirdrop(wallet.publicKey, amount * 1e9);
    toast.success(`Airdropped ${amount} SOL to ${wallet.publicKey.toString()}`);
    // eslint-disable-next-line no-unused-vars
    }catch(err){
      toast.error('Failed to Airdrop');
    }finally{
      setLoading(false);
    }
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
        {loading?"Processing...":"Airdrop Now"}
      </Button>
    </div>
  );
}

export default Airdrop;
