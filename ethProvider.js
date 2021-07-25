const Web3 = require("web3");
const EthereumTx = require("ethereumjs-tx").Transaction;
const axios = require("axios");
var etherscan = require("etherscan-api").init(
  "52KWBTETPDVZQMJJ3TUF2YPRTJZ2TCZNPN",
  "rinkeby",
  30000
);
const database = require("./db");
global.users = {};
database.raw("Select id,token from users").then((data) => {
  data.rows?.map((_d) => {
    global.users[_d.token] = _d.id;
  });
  console.log("all_users", global.users);
});
const ADMIN_ADDRESS = "0xB426971b6378FB6Ce32DBce35E21304B233602A9";
const ADMIN_PRIVATEKEY =
  "b1e0ed7023418b62d493bc30d56d9bfbec956bef711b2c88511d92ba0cf12415";

const RINKEBY_WSS =
  "wss://rinkeby.infura.io/ws/v3/d280284753204f3ba271a03d95bf4368";
let provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);
let web3 = new Web3(provider);

//transferFund({address: '0x0xxx00000000xx00x0', privateKey: '1x11111111'},{address: '0x0xxx000000000000x00x0x0'},0.10)
async function transferFund(recieverAddress, amountToSend) {
  const sendersData = {
    address: ADMIN_ADDRESS,
    privateKey: ADMIN_PRIVATEKEY,
  };
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
        to: recieverAddress,
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
async function syncBalance(address, id) {
  try {
    var txlist = await etherscan.account.txlist(
      address,
      1,
      "latest",
      1,
      100,
      "asc"
    );
    for (let i = 0; i < txlist?.result?.length; i++) {
      const tx = txlist.result[i];
      //console.log("txlist", txlist);
      try {
        await database.raw(
          "INSERT INTO transaction (ref,amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?,?) RETURNING id",
          [
            tx?.hash,
            web3.utils.fromWei(tx?.value, "ether"),
            id,
            "credit",
            "ETH",
            0,
            "ok",
            new Date(),
          ]
        );
      } catch (error) {
        //console.log('error',error)
      }
    }
    const txERC20list = await etherscan.account.tokentx(
      address,
      null,
      1,
      "latest",
      "asc"
    );
    for (let i = 0; i < txERC20list?.result?.length; i++) {
        const tx = txERC20list.result[i];
        //console.log("txlist", txlist);
        try {
          await database.raw(
            "INSERT INTO transaction (ref,amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?,?) RETURNING id",
            [
              tx?.hash,
              web3.utils.fromWei(tx?.value, "ether"),
              id,
              "credit",
              tx?.tokenName,
              0,
              "ok",
              new Date(),
            ]
          );
        } catch (error) {
          //console.log('error',error)
        }
    }
  } catch (err) {
    console.log("err", err);
  }
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
// var subscription = web3.eth.subscribe(
//   "pendingTransactions",
//   function (error, result) {
//     if (!error) {
//       //console.log('eth_log',result);
//       try {
//         setTimeout(function setTx() {
//           web3.eth
//             .getTransaction(result)
//             .then((tx) => {
//               if (!tx) {
//                 setTimeout(setTx, 60 * 1000);
//                 return;
//               }
//               if (tx?.to && global.users[tx?.to?.toLowerCase()]) {
//                 database
//                   .raw(
//                     "INSERT INTO transaction (ref,amount,userId,type,currency,fee,status,createdAt) VALUES (?,?,?,?,?,?,?,?) RETURNING id",
//                     [
//                       result,
//                       web3.utils.fromWei(tx?.value, "ether"),
//                       global.users[tx?.to?.toLowerCase()],
//                       "credit",
//                       "ETH",
//                       0,
//                       "ok",
//                       new Date(),
//                     ]
//                   )
//                   .catch((err) => console.log("db_deposit", err));
//                 console.log(
//                   "result:" +
//                     result +
//                     " from: " +
//                     tx?.from?.toLowerCase() +
//                     " to: " +
//                     tx.to?.toLowerCase() +
//                     " value: " +
//                     web3.utils.fromWei(tx?.value, "ether")
//                 );
//               }
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }, 60 * 1000);
//       } catch (err) {}
//     }
//   }
// );

// provider.on("error", (e) => console.log("WS Error", e));
// provider.on("end", (e) => {
//   console.log("WS closed");
//   console.log("Attempting to reconnect...");
//   provider = new Web3.providers.WebsocketProvider(RINKEBY_WSS);

//   provider.on("connect", function () {
//     console.log("WSS Reconnected");
//   });

//   web3.setProvider(provider);
// });

module.exports = {
  getBalance,
  transferFund,
  syncBalance,
  web3,
};
