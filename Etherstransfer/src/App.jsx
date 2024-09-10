import { useState } from 'react';
import './App.css'
import {Web3} from 'web3'
function App() {
  // const web3= new Web3('https://eth-sepolia.g.alchemy.com/v2/K7xI1F3jpKjJHk5-Rmxmi30MhqL1Ep_d')
  // const web3 = new Web3(window.ethereum)
  const [connectedAccount,setConnectedAccount] = useState('null');
  const [connection,setconnectoin]= useState("connectMetamask");
  const [balance,setbalance]= useState(null);
  const [recipient, setRecipient] = useState('');
  const [sendAmount,setSendAmount]=useState();

  async function connectMetamask(){
    if(window.ethereum){
      const web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setConnectedAccount(accounts);
      setconnectoin("connected");
    }
    else{
      alert('please download Metamask');
    }
  }
  async function getBalance(){
    if(!connectedAccount) return;
    const web3 = new Web3(window.ethereum)
    const accbalance= await web3.eth.getBalance(connectedAccount[0]);
     const accBalanceEther = web3.utils.fromWei(accbalance, 'ether');
    console.log(accBalanceEther);
    setbalance(accBalanceEther.toString());
  }
  // async function updateBalance(connectedAccount){
  //   const web3 = new Web3(window.ethereum)
  //   const accBalanceWei = await web3.eth.getBalance(connectedAccount);
  //   const accBalanceEth = web3.utils.fromWei(accBalanceWei,'ether');
  //   setbalance(accBalanceEth);

  // }
  async function TransferEther(){
    if(!connectedAccount) return;
    const web3 = new Web3(window.ethereum)
    const weiAmount= web3.utils.toWei(sendAmount,'ether');
    try{
      await web3.eth.sendTransaction({
        from: connectedAccount[0],
        to: recipient,
        value: weiAmount,
        gas: 50000,
      });
      console.log('transfer Successful');
      // updateBalance(connectedAccount);
      getBalance();
    }
    catch(error){
      console.error('error occured during transfer: ',error);
    }

  }

  return (
    <>
     <nav>
      <div className='connectMetamask'>
        <button className='button1' onClick={()=>connectMetamask()}>{connection}</button>
        <h2 className='heading1'>Your address: {connectedAccount[0]}</h2>
      </div>
      <div className='connectMetamask'>
        <button onClick={getBalance}>GetBalance</button>
        <h2 className='heading1'>Your balance: {balance} Ether</h2>
      </div>
      </nav>
      <br />
      <div>
     
             <h1>Transfer Funds</h1>
          <div className='input'>
              <label className='label'> Recipient Address:</label>
              <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              <br />
              <label className='label'>Amount to be send (Ether): </label>
              <input type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} />
              <br />
              <div className='button2'>
              <button className='transferEther'onClick={TransferEther}>TransferEther</button>
              </div>
          </div>
        
      </div>

      
    </>
  )
}

export default App
