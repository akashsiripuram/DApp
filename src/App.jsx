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
import ShowBalance from "./ShowBalance";
import SendTokens from "./SendTokens";
import { Toaster } from "sonner";
import SignMessage from "./SignMessage";

//shadcn styles
import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
function App() {
  return (
    <div className="bg-gray-200 min-w-screen min-h-screen">
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Toaster />
            <div className="flex justify-center p-4 gap-2">
              <WalletMultiButton className="!bg-purple-600 !text-white !rounded-xl !px-4 !py-2 hover:!bg-purple-700" />
              <WalletDisconnectButton className="!bg-red-500 !text-white !rounded-xl !px-4 !py-2 hover:!bg-red-600" />
            </div>
            <div className="flex flex-col gap-6 items-center ">
              <Tabs defaultValue="airdrop">
                <div className="flex flex-row justify-between">
                  <TabsList>
                    <TabsTrigger value="airdrop">Airdrop</TabsTrigger>
                    <TabsTrigger value="sendtokens">Send Tokens</TabsTrigger>
                    <TabsTrigger value="signMessage">Sign Message</TabsTrigger>
                  </TabsList>
                  <ShowBalance />
                </div>
                <TabsContent value="airdrop">
                  <Card>
                    <CardHeader>
                      <CardTitle>Request Airdrop</CardTitle>
                      <CardDescription>
                        Enter the amount of SOL you'd like to receive via
                        airdrop. Click "Airdrop" to proceed.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <Airdrop />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="sendtokens">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Tokens</CardTitle>
                      <CardDescription>
                        Enter the recipient's public key and the amount of SOL
                        you'd like to send. Click "Send Tokens" to proceed.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <SendTokens />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="signMessage">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sign Message</CardTitle>
                      <CardDescription>
                        Enter a message below and sign it using your connected
                        wallet. Useful for authentication or proving wallet
                        ownership.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <SignMessage />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
