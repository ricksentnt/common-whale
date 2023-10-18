import React from 'react'
import { ethers } from 'ethers'
import { backendUrl } from '../configs'
import axios from 'axios'

export default function ComethCengliDemo() {
  // TEST TOKEN ADDRESS, is whitelisted on Cometh, will be gasless
  const TEST_TOKEN_ADDRESS = '0x7ee6eb942378f7082fc58ab09dafd5f7c33a98bd'
  const ERC_20_ABI = [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function transfer(address recipient, uint256 amount) external returns (bool)',
    'function balanceOf(address account) external view returns (uint256)',
    'function decimals() external view returns (uint8)',
    'function symbol() external view returns (string)',
    'function allowance(address owner, address spender) external view returns (uint256)'
  ]

  const EIP712_SAFE_TX_TYPES = {
    SafeTx: [
      { type: 'address', name: 'to' },
      { type: 'uint256', name: 'value' },
      { type: 'bytes', name: 'data' },
      { type: 'uint8', name: 'operation' },
      { type: 'uint256', name: 'safeTxGas' },
      { type: 'uint256', name: 'baseGas' },
      { type: 'uint256', name: 'gasPrice' },
      { type: 'address', name: 'gasToken' },
      { type: 'address', name: 'refundReceiver' },
      { type: 'uint256', name: 'nonce' }
    ]
  };

  // Case (Fuji Testnet):
  // Cometh Wallet Address: 0x1E1960b1528541fa85a331C8933521073D6d3682
  // Signer Address: 0x8f8A15956565670AC6F298596CBf70EF074D5A25
  // Signer Private Key: 0x09913785ce30baabcead5164541216f1e07150fb0f23620ac9d58de284521699

  /**
   * This function is designed to handle the approval of tokens from one wallet to another target address 
   * because every ERC20 token needs to be approved before it can be transferred to another address
   * If user approved 10.000 USDC to contract A, contract A can only transfer/control up to 10.000 USDC from user's wallet
   */
  // Define an asynchronous function to approve tokens
  const approveToken = async (amount = 10000) => {
    // Convert the amount to the token's smallest unit (6 decimal places for USDC)
    const formattedAmount = amount * 10 ** 6;
    console.log(formattedAmount);

    // Addresses and private key for transaction
    const comethWalletAddress = '0x1E1960b1528541fa85a331C8933521073D6d3682';
    const walletPrivateKey = '0x09913785ce30baabcead5164541216f1e07150fb0f23620ac9d58de284521699';

    // Setup provider and wallet instance
    const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_COMETH_RPC_URL);
    const walletInstance = new ethers.Wallet(walletPrivateKey, provider);

    // Create an instance of the token contract
    const TestTokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC_20_ABI, walletInstance);

    // Prepare the approve transaction
    const approveTransaction = await TestTokenContract.approve.populateTransaction(comethWalletAddress, formattedAmount, {
      from: comethWalletAddress,
      value: 0,
      chainId: 43113,
    });
    console.log('populated approve transaction', approveTransaction);

    // Request to a backend service to prepare the transaction
    const preparedTxRes = await axios({
      method: 'POST',
      url: `${backendUrl}/cometh/prepare-tx`,
      data: {
        walletAddress: comethWalletAddress,
        safeTransactionData: {
          from: comethWalletAddress,
          to: TEST_TOKEN_ADDRESS,
          value: "0",
          data: approveTransaction.data,
        }
      }
    });
    const preparedTx = preparedTxRes.data;

    // Sign the prepared transaction
    const signedTx = await walletInstance.signTypedData(preparedTx.domain, EIP712_SAFE_TX_TYPES, preparedTx.types);
    preparedTx.types.signatures = signedTx;

    console.log('preparedTx', preparedTx);

    // Send the transaction through a relay service
    const sendRelayTxRes = await axios({
      method: 'POST',
      url: `https://api.connect.cometh.io/wallets/${comethWalletAddress}/relay`,
      headers: {
        'apiKey': import.meta.env.VITE_COMETH_API_KEY
      },
      data: preparedTx.types
    });

    console.log('sendRelayTxRes', sendRelayTxRes.data);
  }



  return (
    <div className='flex flex-row items-center gap-4'>
      <button
        onClick={() => approveToken(20000)}
        className='btn btn-primary-light'
      >
        Approve Token
      </button>
    </div>
  )
}
