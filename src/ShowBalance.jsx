import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function ShowBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState("Connecting...");

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance((bal / LAMPORTS_PER_SOL).toFixed(4) + " SOL");
        } catch (err) {
          console.error("Error fetching balance:", err);
          setBalance("Error fetching balance");
        }
      } else {
        setBalance("Please connect your wallet");
      }
    };

    fetchBalance();
  }, [connection, publicKey]);

  return (
    <div>
      {balance}
    </div>
  );
}
