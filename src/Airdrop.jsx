import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

function Airdrop() {
    const wallet=useWallet();
    const [amount,setAmount]=useState(0);
    const {connection}=useConnection();
    async function handleAirdrop(){
        await connection.requestAirdrop(wallet.publicKey,amount*1e9);
        alert(`Airdropped ${amount} SOL to ${wallet.publicKey.toString()}`);
    }
    return ( 
        <div>
            <input type="text" placeholder="Amount" name="amount" onChange={(e)=>setAmount(parseFloat(e.target.value))} />
            <button onClick={handleAirdrop}>Airdrop</button>
        </div>
     );
}

export default Airdrop;