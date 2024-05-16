import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../../tailwind.config';
import Link from 'next/link';

function WelcomePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Connect Wallet functionality -------------------------------------------
const Connect = async () => {
  try {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // Request the current chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
   

      // Check if the current chain is the Polygon Amoy Testnet; if not, switch or add the Polygon Amoy Testnet network
      if (chainId !== '0x13882') {  // Hexadecimal for 80002
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13882', // Hexadecimal for 80002
            chainName: 'Polygon Amoy Testnet',
            nativeCurrency: {
              name: 'Matic',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://polygon-amoy.g.alchemy.com/v2/lZmuvpOZke7eKG8vz1Zx9a94_sTtRxWC'],
            blockExplorerUrls: ['https://amoy.polygonscan.com/']
          }],
        });
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setLoggedIn(true);
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    alert('Failed to connect MetaMask. Please try again!');
  }
};

  // Effect to handle account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string | any[]) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else {
        setLoggedIn(true);
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const styles = {
    screen: `w-screen h-screen flex justify-center items-center`,
    second: `bg-[url('/images/cart.png')] h-screen w-screen flex flex-col justify-center items-center bg-no-repeat`,
    wallet: `bg-slate-300/[.2] shadow-2xl border-white-900/75 w-60 h-40 rounded-3xl flex flex-col justify-center items-center mb-10`,
    pages: `bg-slate-300/[.2] shadow-2xl border-white-900/75 w-6/12 h-60 rounded-3xl flex gap-20 justify-center items-center`,
  };

  return (
    <div className={styles.screen}>
      <div className={styles.second}>
        <div className={styles.wallet}>
          <span className='font-bold text-slate-50 text-lg'>Connect to MetaMask</span>
          <Button variant="contained" onClick={Connect} className='bg-gradient-to-r from-sky-500 to-indigo-500'>
            <img src="/images/Metamask.png" alt="MetaMask Icon" className='w-10' />
            {loggedIn ? <span>Connected</span> : <span>Connect</span>}
          </Button>
        </div>
        <div className={styles.pages}>
          <Link href="/components/Business/Home">
            <Button variant="contained" className='bg-gradient-to-r from-sky-500 to-indigo-500' disabled={!loggedIn}>
              <span>Go For Business</span>
              <img src="/images/car_loading.PNG" alt="Business" className='w-20' />
            </Button>
          </Link>
          <Link href="/components/Marketplace/HomePage">
            <Button variant="contained" className='bg-gradient-to-r from-sky-500 to-indigo-500' disabled={!loggedIn}>
              <span>Let Shopping</span>
              <img src="/images/shopping.PNG" alt="Shopping" className='w-20' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
