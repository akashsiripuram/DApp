import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
function SignMessage() {
  const [message, setMessage] = useState("");
  const { publicKey, signMessage } = useWallet();
  const [signMessagee, setSignMessage] = useState();

  const handleSignMessage = async (e) => {
    e.preventDefault();
    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
        throw new Error("Message signature invalid!");
      toast.success("Signed Message");
      setSignMessage(bs58.encode(signature));
    } catch (err) {
      toast.error("Error signing message", err);
    }
  };
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter a message to sign"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button onClick={handleSignMessage}>Sign Message</Button>

      {signMessagee && (
        <p className="break-all text-sm text-muted-foreground">
          Signature: {signMessagee}
        </p>
      )}
    </div>
  );
}

export default SignMessage;
