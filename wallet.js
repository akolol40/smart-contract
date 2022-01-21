const Web3 = require('web3')
const Apk = require('./build/contracts/APKTEST.json')

const defautAddr = '0xc5aC000970c3B42C991bc7087a76e27f14061e7D'
const privateKey = '4ca7fa25ff2f9bf8364a3d4fe346b314f82e66bb110f304966a427dfb5e43bbf'
const ContractAddr = '0xf83e20D0a23Fa7A269f26d3D6B86f73Fd505A4ac'

let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/3ad42ab9591c4e988f39bfea7d2e12a9'))

web3.eth.defaultAccount = defautAddr
web3.eth.accounts.wallet.add(privateKey);

var contractAbi = new web3.eth.Contract(Apk, ContractAddr);

async function Balanses(addr) {
    return await contractAbi.methods.balanceOf(addr).call(function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }  
    })
}

const outAddr = '0x592f0bdE3F371dFE979432fC2C22aF8eD7ef5edd';
const addrList = ['0x592f0bdE3F371dFE979432fC2C22aF8eD7ef5edd', '0xEA1c0e8d4D310893BE4679A86088CaD92d12118F', '0x6a6447CB492186a334ca2A51561D2D70659Ab0B1']

async function Transfer(outAddr, count) {
    const balance =  await Balanses(defautAddr)
    console.log('balance:' + balance)
    let AdrrSend = ''

    if (typeof(outAddr)==='object' && outAddr.length > 0) {
     AdrrSend = outAddr.shift() } else 
    if (outAddr.length > 0  && typeof(outAddr)==='string') AdrrSend = outAddr    
    
    await contractAbi.methods.transfer(AdrrSend, count).send({from: defautAddr, gas: 50000}, async function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
    }); 
    if (outAddr.length > 0 && typeof(outAddr)==='object' )
        Transfer(outAddr, count).then(() => {
            console.log('transfer complite')
        })
    else return 
}

// вызов на конкретный адрес
//Transfer(outAddr, 100).then(() => console.log('transfer complite'));
// вызов на несколько адресов 
Transfer(addrList, 100).then(() => console.log('transfer complite'));




