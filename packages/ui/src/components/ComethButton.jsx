import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { ethers } from 'ethers'

import { ComethWallet, ComethProvider, ConnectAdaptor, SupportedNetworks } from '@cometh/connect-sdk'

const walletAdaptor = new ConnectAdaptor({
  apiKey: import.meta.env.VITE_COMETH_API_KEY,
  chainId: SupportedNetworks.FUJI,
  rpcUrl: import.meta.env.VITE_COMETH_RPC_URL,
  userName: 'test',
})


const wallet = new ComethWallet({
  authAdapter: walletAdaptor,
  apiKey: import.meta.env.VITE_COMETH_API_KEY,
  rpcUrl: import.meta.env.VITE_COMETH_RPC_URL,
  uiConfig: {
    displayValidationModal: true,
  }
})

const provider = new ComethProvider(wallet)

export default function ComethButton() {
  const [localStorageAddress, setLocalStorageAddress] = useLocalStorage('walletAddress', null)

  const TEST_TOKEN_ADDRESS = '0x7ee6eb942378f7082fc58ab09dafd5f7c33a98bd'
  const ERC_20_ABI = [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function transfer(address recipient, uint256 amount) external returns (bool)',
    'function balanceOf(address account) external view returns (uint256)',
    'function decimals() external view returns (uint8)',
    'function symbol() external view returns (string)',
    'function allowance(address owner, address spender) external view returns (uint256)'
  ]

  
  const [testTokenBalance, setTestTokenBalance] = useState(null)
  const getTestTokenBalance = async () => {
    console.log('Getting balance of test token: ', TEST_TOKEN_ADDRESS)
    const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC_20_ABI, provider)
    const balance = await tokenContract.getFunction('balanceOf')(wallet.getAddress())

    const formattedBalance = ethers.formatEther(balance.toString())
    console.log('test token balance', formattedBalance)

    setTestTokenBalance(formattedBalance)
  }

  const approveTestToken = async () => {
    console.log('Approving test token: ', TEST_TOKEN_ADDRESS)
    const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC_20_ABI, wallet.getProvider())
    const approveTx = await tokenContract.getFunction('approve').populateTransaction('0x278A2d5B5C8696882d1D2002cE107efc74704ECf', ethers.parseEther('1000000'))

    const tx = {
      from: wallet.getAddress(),
      to: approveTx.to,
      data: approveTx.data,
      value: "0",
    }

    const transaction = await wallet.sendTransaction(tx)
    console.log('approved test token', transaction)
    alert('approved test token')
  }

  const transferTestToken = async () => {
    console.log('Transfering test token: ', TEST_TOKEN_ADDRESS)
    const tokenContract = new ethers.Contract(TEST_TOKEN_ADDRESS, ERC_20_ABI, provider)
    const transferTx = await tokenContract.getFunction('transfer').populateTransaction('0x278A2d5B5C8696882d1D2002cE107efc74704ECf', ethers.parseEther('123'))

    const tx = {
      from: wallet.getAddress(),
      to: transferTx.to,
      data: transferTx.data,
      value: "0",
    }

    console.log('transferTx', transferTx)

    const transaction = await wallet.sendTransaction(tx)
    console.log('transfered test token', transaction)
    alert('transfered test token')
  }

  const transferToken = async () => {
    provider.getSigner().signTransaction()
    console.log("transfer token")
    // craete ethers transaction to send 0.001 ETH to "0x278A2d5B5C8696882d1D2002cE107efc74704ECf" using ethers
    const tx = {
      from: wallet.getAddress(),
      to: '0x278A2d5B5C8696882d1D2002cE107efc74704ECf',
      value: ethers.parseEther('0.0001'),
      data: "0x"
    }
    const relayId = await wallet.sendTransaction(tx)
    console.log('relayId', relayId)
  }

  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [signerAddress, setSignerAddress] = useState(null)

  const connect = async () => {
    setIsConnecting(true)
    console.log('local storage address', localStorageAddress)
    if (localStorageAddress) {
      console.log('connecting with local storage address', localStorageAddress)
      await wallet.connect(localStorageAddress)
      console.log('connected with local storage address', localStorageAddress)
      setIsConnected(true)
    } else {
      await wallet.connect()
      const walletAddress = await wallet.getAddress()
      console.log('created wallet address', walletAddress)
      setLocalStorageAddress(walletAddress)
      setIsConnected(true)
    }

    getTestTokenBalance()

    const _walletAddress = await wallet.getAddress()
    const _signerAddress = await wallet.authAdapter.getAccount()
    console.log({
      walletAddress: _walletAddress,
      signerAddress: _signerAddress
    })
    setWalletAddress(_walletAddress)
    setSignerAddress(_signerAddress)

    setIsConnecting(false)
  }

  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    if (wallet.getConnected()) {
      console.log('wallet connected')
    } else {
      connect()
    }
  }, [])

  if (!isConnected || isConnecting) {
    return (
      <div className='w-full h-[20rem] animate-pulse bg-white/20 rounded-xl' />
    )
  }

  return (
    <div className='flex flex-col'>
      <div className='text-white'>
        <div>
          <span className='opacity-60'>Wallet Address:</span> {walletAddress}
        </div>
        <div>
          <span className='opacity-60'>Signer Address:</span> {signerAddress}
        </div>

        <div>
          <span className='opacity-60'>TestTokenBalance</span> {testTokenBalance} TEST
        </div>
      </div>
      <div className='flex flex-row items-center gap-4 mt-12'>
        <button
          // onClick={() => wallet.connect()}
          onClick={() => connect()}
          className='btn btn-warning'
        >
          Wallet Connect
        </button>

        <button
          onClick={() => approveTestToken()}
          className='btn btn-warning'
        >
          Approve Test Token
        </button>

        <button
          onClick={() => transferTestToken()}
          className='btn btn-warning'
        >
          Transfer Test Token
        </button>

        {/* <button
          onClick={() => transferToken()}
          className='btn btn-warning'
        >
          Transfer
        </button> */}
      </div>
    </div>
  )
}
