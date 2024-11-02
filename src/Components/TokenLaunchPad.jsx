import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID, getMintLen, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, TYPE_SIZE, LENGTH_SIZE, ExtensionType } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useState } from 'react';

export function TokenLaunchpad() {
    const { connection } = useConnection();
    const wallet = useWallet();
    
    // Add state for form inputs
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [initialSupply, setInitialSupply] = useState('');

    async function createToken() {
        const mintKeypair = Keypair.generate();
        
        // Create metadata using form inputs
        const metadata = {
            mint: mintKeypair.publicKey,
            name: tokenName,
            symbol: tokenSymbol.padEnd(10), // SPL tokens require fixed-length symbols
            uri: imageUrl,
            additionalMetadata: [],
        };


        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(mintKeypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            }),
        );
            
        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);
    }

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1>Solana Token Launchpad</h1>
            <input 
                className='inputText' 
                type='text' 
                placeholder='Name'
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
            />
            <input 
                className='inputText' 
                type='text' 
                placeholder='Symbol'
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
            />
            <input 
                className='inputText' 
                type='text' 
                placeholder='Image URL'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <input 
                className='inputText' 
                type='text' 
                placeholder='Initial Supply'
                value={initialSupply}
                onChange={(e) => setInitialSupply(e.target.value)}
            />
            <button onClick={createToken} className='btn'>Create a token</button>
        </div>
    );
}