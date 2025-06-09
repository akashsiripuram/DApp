import { useWallet} from "@solana/wallet-adapter-react";
import { ed25519 } from '@noble/curves/ed25519';
import bs58 from "bs58";
import { toast } from "sonner";
import { useState } from "react";
function SignMessage() {
    const [message,setMessage] = useState('');
    const { publicKey, signMessage } = useWallet();
    const [signMessagee,setSignMessage]=useState();
    
    const handleSignMessage=async(e)=>{
        e.preventDefault();
        try{
            const encodedMessage=new TextEncoder().encode(message);
            const signature=await signMessage(encodedMessage);

            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
            toast.success("Signed Message");
            setSignMessage(bs58.encode(signature));
        }catch(err){
            toast.error("Error signing message",err);
        }
    }
    return ( 
        <div>
            <input className="focus:outline-none border-[1px] py-1 px-2" onChange={(e)=>setMessage(e.target.value)} value={message} />
            <button onClick={handleSignMessage}>Sign Message</button>
            {signMessagee&&<p>{signMessagee}</p>}
        </div>
     );
}

export default SignMessage;