import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenLaunchpad } from './Components/TokenLaunchPad'


function App() {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 10
          }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <TokenLaunchpad />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App