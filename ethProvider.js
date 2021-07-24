const Web3 = require("web3");
const EthereumTx = require("ethereumjs-tx").Transaction;
const axios = require("axios");
const RINKEBY_WSS =
  "wss://rinkeby.infura.io/ws/v3/161e66f35f0e461ca450b114bd1e4626";
let provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);
let web3 = new Web3(provider);
const account = "0x940cf80a2d493ca68ca4f9804ec87564a69eab35";
web3.eth.getAccounts(console.log);
//transferFund({address: '0x0xxx00000000xx00x0', privateKey: '1x11111111'},{address: '0x0xxx000000000000x00x0x0'},0.10)
async function transferFund(sendersData, recieverData, amountToSend) {
  return new Promise(async (resolve, reject) => {
    var nonce = await web3.eth.getTransactionCount(sendersData.address);
    web3.eth.getBalance(sendersData.address, async (err, result) => {
      if (err) {
        return reject();
      }
      let balance = web3.utils.fromWei(result, "ether");
      console.log(balance + " ETH");
      if (balance < amountToSend) {
        console.log("insufficient funds");
        return reject();
      }

      let gasPrices = await getCurrentGasPrices();
      let details = {
        to: recieverData.address,
        value: web3.utils.toHex(
          web3.utils.toWei(amountToSend.toString(), "ether")
        ),
        gas: 21000,
        gasPrice: gasPrices.low * 1000000000,
        nonce: nonce,
        chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
      };

      const transaction = new EthereumTx(details, { chain: "rinkeby" });
      let privateKey = sendersData.privateKey.split("0x");
      let privKey = Buffer.from(privateKey[1], "hex");
      transaction.sign(privKey);

      const serializedTransaction = transaction.serialize();

      web3.eth.sendSignedTransaction(
        "0x" + serializedTransaction.toString("hex"),
        (err, id) => {
          if (err) {
            console.log(err);
            return reject();
          }
          const url = `https://rinkeby.etherscan.io/tx/${id}`;
          console.log(url);
          resolve({ id: id, link: url });
        }
      );
    });
  });
}

async function getCurrentGasPrices() {
  let response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
  };
  return prices;
}

async function getBalance(address) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, async (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(web3.utils.fromWei(result, "ether"));
    });
  });
}
var subscription = web3.eth.subscribe(
  "pendingTransactions",
  function (error, result) {
    if (!error) {
      //console.log('eth_log',result);
      try {
        setTimeout(() => {
          web3.eth.getTransaction(result).then((tx) => {
            //console.log('tx',tx)
            if (tx?.to?.toLowerCase() == account.toLowerCase()) {
              console.log("result:" + result +
                " from: " +
                  tx?.from?.toLowerCase() +
                  " to: " +
                  tx.to?.toLowerCase() +
                  " value: " +
                  tx?.value
              );
            }
          });
        }, 60 * 1000);
      } catch (err) {}
    }
  }
);
// unsubscribes the subscription
// subscription.unsubscribe(function(error, success){
//     if(success)
//         console.log('Successfully unsubscribed!');
// });

provider.on("error", (e) => console.log("WS Error", e));
provider.on("end", (e) => {
  console.log("WS closed");
  console.log("Attempting to reconnect...");
  provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);

  provider.on("connect", function () {
    console.log("WSS Reconnected");
  });

  web3.setProvider(provider);
});

module.exports = {
  getBalance,
};
