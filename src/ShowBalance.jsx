import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { CiWallet } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
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
    <div className="flex flex-row items-center gap-2 bg-[#f6f4f7] border-0 rounded-md px-4 py-2 font-semibold text-[14px]">
      <span className="text-xl font-bold"><LuWallet /></span>
      <span>{balance}</span>
    </div>
  );
}
