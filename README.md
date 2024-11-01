# Solana Token Launchpad

A simple and intuitive web application for creating custom tokens on the Solana blockchain. This application allows users to easily deploy their own SPL tokens on Solana's devnet.

## Features

- Create custom SPL tokens on Solana
- Set token parameters (name, symbol, supply)
- Upload token images
- Connect with Solana wallets
- User-friendly interface

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn
- A Solana wallet (e.g., Phantom, Solflare)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/LingwalAnkit/token-launchpad.git
cd token-launchpad
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
token-launchpad/
├── src/
│   ├── Components/
│   │   └── TokenLaunchPad.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── vite.config.js
└── package.json
```

## Dependencies

Major dependencies include:
- `@solana/web3.js`: ^1.95.4
- `@solana/spl-token`: ^0.4.9
- `@solana/wallet-adapter-react`: ^0.15.35
- `@solana/wallet-adapter-react-ui`: ^0.9.35
- React: ^18.3.1

## Usage

1. Connect your Solana wallet using the "Connect Wallet" button
2. Fill in the token details:
   - Name: Your token's name
   - Symbol: Your token's symbol (e.g., "BTC")
   - Image URL: Link to your token's logo
   - Initial Supply: The amount of tokens to mint
3. Click "Create a token" to deploy your token
4. The token's mint address will be logged to the console

## Development

The project uses Vite as the build tool and includes the following scripts:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Network Configuration

The application is currently configured to use Solana's devnet. To change the network:

1. Modify the endpoint in `App.jsx`:
```javascript
<ConnectionProvider endpoint="https://api.devnet.solana.com">
```

Available networks:
- Devnet: `https://api.devnet.solana.com`
- Testnet: `https://api.testnet.solana.com`
- Mainnet: `https://api.mainnet-beta.solana.com`

## Security Considerations

- Always test your tokens on devnet before deploying to mainnet
- Keep your wallet's private keys secure
- Verify all transaction details before signing
- The application currently doesn't implement rate limiting or spam protection

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Acknowledgments

- Solana Foundation for the web3.js library
- The SPL Token program developers
- React and Vite development teams

## Support

For support, please open an issue in the GitHub repository or contact the development team.
