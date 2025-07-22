import './App.scss'
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./components/Header/Header";
import { TxForm } from "./components/TxForm/TxForm";
import { Footer } from "./components/Footer/Footer";
import { TonProofDemo } from "./components/TonProofDemo/TonProofDemo";
import { CreateJettonDemo } from "./components/CreateJettonDemo/CreateJettonDemo";
import { WalletBatchLimitsTester } from "./components/WalletBatchLimitsTester/WalletBatchLimitsTester";
import { SignDataTester } from "./components/SignDataTester/SignDataTester";
import { MerkleExample } from "./components/MerkleExample/MerkleExample";
import { FindTransactionDemo } from './components/FindTransactionDemo/FindTransactionDemo';

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            "appName": "fintopio-tg-dev",
            "name": "Fintopio DEV",
            "imageUrl": "https://raw.githubusercontent.com/fintopio/ton-pub/refs/heads/main/logos/tonconnect-icon.png",
            "aboutUrl": "https://fintopio.com",
            "bridgeUrl": "https://wallet-bridge.dev.fintopio.com/bridge",
            "universalLink": "https://t.me/FintopioTestBot/wallet?attach=wallet",
            "platforms": ["ios", "android", "macos", "windows", "linux"],
            "features": [
              {
                "name": "SendTransaction",
                "maxMessages": 4,
                "extraCurrencySupported": false
              },
              {
                "name": "SignData",
                "types": ["text", "binary", "cell"],
              }
            ]
          },
          {
            "appName": "fintopio-tg-staging",
            "name": "Fintopio STAGING",
            "imageUrl": "https://raw.githubusercontent.com/fintopio/ton-pub/refs/heads/main/logos/tonconnect-icon.png",
            "aboutUrl": "https://fintopio.com",
            "bridgeUrl": "https://wallet-bridge.staging.fintopio.com/bridge",
            "universalLink": "https://t.me/ftotestbot/wallet?attach=wallet",
            "platforms": ["ios", "android", "macos", "windows", "linux"],
            "features": [
              {
                "name": "SendTransaction",
                "maxMessages": 4,
                "extraCurrencySupported": false
              },
              {
                "name": "SignData",
                "types": ["text", "binary", "cell"],
              }
            ]
          },
          // {
          //   "appName": "fintopio-tg-beta",
          //   "name": "Fintopio BETA",
          //   "imageUrl": "https://raw.githubusercontent.com/fintopio/ton-pub/refs/heads/main/logos/tonconnect-icon.png",
          //   "aboutUrl": "https://fintopio.com",
          //   "bridgeUrl": "https://wallet-bridge.beta.fintopio.com/bridge",
          //   "universalLink": "https://t.me/ghmhbdjolnponbnumefzBot/wallet?attach=wallet",
          //   "platforms": ["ios", "android", "macos", "windows", "linux"],
          //   "features": [
          //     {
          //       "name": "SendTransaction",
          //       "maxMessages": 4,
          //       "extraCurrencySupported": false
          //     },
          //     {
          //       "name": "SignData",
          //       "types": ["text", "binary", "cell"],
          //     }
          //   ]
          // },
          {
            "appName": "fintopio-tg-dev-local",
            "name": "Fintopio LOCAL-DEV",
            "imageUrl": "https://raw.githubusercontent.com/fintopio/ton-pub/refs/heads/main/logos/tonconnect-icon.png",
            "aboutUrl": "https://fintopio.com",
            "universalLink": "http://localhost:3000/tonconnect",
            "bridgeUrl": "https://wallet-bridge.dev.fintopio.com/bridge",
            "platforms": ["ios", "android", "macos", "windows", "linux"],
            "features": [
              {
                "name": "SendTransaction",
                "maxMessages": 4,
                "extraCurrencySupported": false
              },
              {
                "name": "SignData",
                "types": ["text", "binary", "cell"],
              }
            ]
          },
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
      }}
    >
      <div className="app">
        <Header />
        <TxForm />
        <WalletBatchLimitsTester />
        <SignDataTester />
        <CreateJettonDemo />
        <TonProofDemo />
        <FindTransactionDemo />
        <MerkleExample />
        <Footer />
      </div>
    </TonConnectUIProvider>
  )
}

export default App
