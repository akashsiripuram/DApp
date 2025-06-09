import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Airdrop from "./Airdrop";


// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import ShowBalance  from "./ShowBalance";
import SendTokens from "./SendTokens";
import { Toaster } from "sonner";

function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Toaster/>
          <div className="flex justify-end p-4 gap-2">
          <WalletMultiButton />
          <WalletDisconnectButton />
          </div>
            
            <Airdrop /> 
            <ShowBalance/>
            <SendTokens/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
