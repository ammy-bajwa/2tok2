import { useState, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: req.locals?.data,
      tradeData: [],
      userName: req.locals?.userName,
      settings: req.locals?.settings,
      title: req.locals?.title,
      token: req.locals?.token,
      userId: req.locals?.userId,
      isAdmin: req.locals?.isAdmin,
    },
  };
}

export default function Index({ messages, data ,tradeData,userName,settings,title,token,userId,isAdmin}) {
  var notyf = null;
  const [state, setState] = useState({
    options: [
      { label: "Bitcoin", value: "BTC" },
      { label: "Ethereum", value: "ETH" },
      { label: "Euro", value: "EUR" },
      { label: "Tether", value: "USDT" },
      { label: "W1", value: "W1" },
      { label: "W2", value: "W2" },
    ],
    trades: JSON.stringify(data),
    payCurrency: "",
    receiveCurrency: "",
    pay: "",
    receive: "",
    sendTo: "",
    sendCurrency: "",
    sendAmount: "",
    depositCurrency: "",
    depositAmount: "",
    withdrawalCurrency: "",
    withdrawalAmount: "",
    withdrawalAddress: "",
  });

  const isNumber = (evt) => {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  };
  const exchange = () => {
    if (!this.receiveCurrency) {
      notyf.error("Please select buy Currency!");
      return;
    }
    if (!this.payCurrency) {
      notyf.error("Please select pay Currency!");
      return;
    }
    if (!this.pay) {
      notyf.error("Please enter sell amount!");
      return;
    }
    if (!this.receive) {
      notyf.error("Please enter buy amount!");
      return;
    }
    fetch("/api/Exchange", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buy: this.receive,
        buyCurrency: this.receiveCurrency,
        sell: this.pay,
        sellCurrency: this.payCurrency,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          notyf.error(data?.error);
        } else {
          this.receiveCurrency = "";
          this.payCurrency = "";
          this.receive = "";
          this.pay = "";
          notyf.success("Exchange Request send !");
          location.reload();
        }
      });
  };
  const deposit = () => {
    if (!this.depositCurrency) {
      notyf.error("Please select Currency!");
      return;
    }
    if (!this.depositAmount) {
      notyf.error("Please enter amount!");
      return;
    }
    fetch("/api/deposit", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: this.depositCurrency,
        amount: this.depositAmount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          notyf.error(data?.error);
        } else {
          this.depositCurrency = "";
          this.depositAmount = "";
          $("#depositModal").modal("hide");
          location.reload();
        }
      });
  };
  const withdraw = () => {
    if (!this.withdrawalCurrency) {
      notyf.error("Please select Currency!");
      return;
    }
    if (!this.withdrawalAmount) {
      notyf.error("Please enter amount!");
      return;
    }
    if (
      this.withdrawalCurrency == "ETH" ||
      this.withdrawalCurrency == "W1" ||
      this.withdrawalCurrency == "W2"
    ) {
      if (!this.withdrawalAddress) {
        notyf.error("Please enter address!");
        return;
      }
    }
    fetch("/api/withdraw", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: this.withdrawalCurrency,
        amount: this.withdrawalAmount,
        address: this.withdrawalAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          notyf.error(data?.error);
        } else {
          this.withdrawalCurrency = "";
          this.withdrawalAmount = "";
          $("#withdrawalModal").modal("hide");
          location.reload();
        }
      });
  };
  const send = () => {
    if (!this.sendTo) {
      notyf.error("Please enter send to email!");
      return;
    }
    if (!this.sendCurrency) {
      notyf.error("Please enter currency!");
      return;
    }
    if (!this.sendAmount) {
      notyf.error("Please enter amount!");
      return;
    }
    fetch("/api/send", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: this.sendCurrency,
        amount: this.sendAmount,
        email: this.sendTo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          notyf.error(data?.error);
        } else {
          this.sendCurrency = "";
          this.sendAmount = "";
          this.sendTo = "";
          $("#sendModal").modal("hide");
          location.reload();
        }
      });
  };
  const reload = () => {
    location.reload();
  };
  const copy = () => {
    var textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = "transparent";

    textArea.value = this.token;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    document.body.removeChild(textArea);
  };
  const approveTrade = (id) => {
    fetch(`/api/trade/approve/${id}`, { method: "put" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          notyf.error(data?.error);
        } else {
          location.reload();
        }
      });
  };
  useEffect(() => {
    notyf = new Notyf();
    setTimeout(() => {
      location.reload();
    }, 50 * 1800);
  }, []);
  const {
    options,
    trades,
    payCurrency,
    receiveCurrency,
    pay,
    receive,
    sendTo,
    sendCurrency,
    sendAmount,
    depositCurrency,
    depositAmount,
    withdrawalCurrency,
    withdrawalAmount,
    withdrawalAddress,
  } = state;
  return (
    <div id="tradeApp" class="container" style="margin-top: 20px">
      {messages?.success && (
        <div class="alert alert-success" role="alert">
          {messages?.success}
        </div>
      )}
      {messages?.error && (
        <div class="alert alert-danger" role="alert">
          {messages?.error}
        </div>
      )}
      <div style="display: flex;flex-direction: row;">
        <div class="card" style="flex: 1;">
          <div class="card-header">
            <ul class="nav nav-pills w-100">
              <li class="nav-pill active">
                <a class="nav-link" onClick="reload">
                  Balances{" "}
                  <ion-icon
                    style="margin-bottom: -3px;padding-left: 5px;padding-right: 5px;"
                    name="reload-outline"
                  ></ion-icon>
                </a>
              </li>
              <li class="nav-pill ml-auto">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#sendModal"
                >
                  Send
                </button>
                <button
                  type="submit"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#depositModal"
                >
                  Deposit
                </button>
                <button
                  type="submit"
                  class="btn btn-warning"
                  data-toggle="modal"
                  data-target="#withdrawalModal"
                >
                  Withdrawal
                </button>
              </li>
            </ul>
          </div>
          <div class="card-body">
            {data && (
              <table class="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Total</th>
                    <th width="200px">Valuation</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).forEach(function (prop) {
                    <tr>
                      <td>{prop}</td>
                      <td>{data[prop]}</td>
                      <td></td>
                    </tr>;
                  })}
                </tbody>
              </table>
            )}

            {(!data || data == {}) && <p class="text-center">No Balance!</p>}
          </div>
        </div>
        <div class="card" style="flex: 1;margin-left: 20px">
          <div class="card-header">
            <ul class="nav nav-pills w-100">
              <li class="nav-pill active">
                <a class="nav-link">Exchange</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <center>
              <h3>Cryptocurrency exchange</h3>
            </center>
            <span style="height: 10px; width: 100%; display: block"></span>
            <div style="display: flex; flex-direction: row">
              <div class="form-group" style="flex: 1; margin-right: 10px">
                <label for="exampleFormControlSelect1">From currency</label>
                <select class="form-control">
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div class="form-group" style="flex: 1">
                <label for="exampleFormControlSelect1">To currency</label>
                <select class="form-control" v-model="receiveCurrency">
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style="display: flex; flex-direction: row">
              <div style="flex: 1; margin-right: 10px">
                <label for="basic-url">Your Pay</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">
                      {payCurrency}
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    v-model="pay"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
              <div style="flex: 1">
                <label for="basic-url">Your receive</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">
                      {receiveCurrency}
                    </span>
                  </div>
                  <input
                    type="number"
                    class="form-control"
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
            </div>
            <span style="height: 10px; width: 100%; display: block"></span>
            <center>
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={exchange}
              >
                Exchange
              </button>
            </center>
            <span style="height: 10px; width: 100%; display: block"></span>
            <center>
              <p style="font-size: 10px">Included fee is: (0.80 %)</p>
            </center>
          </div>
        </div>
      </div>
      <div class="card" style="flex: 1;margin-top: 20px">
        <div class="card-header">
          <ul class="nav nav-pills w-100">
            <li class="nav-pill active">
              <a class="nav-link" onClick={reload}>
                Order Book
              </a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          {tradeData?.length && (
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Datetime</th>
                  <th scope="col">Buy Amount</th>
                  <th width="col">Currency</th>
                  <th scope="col">Sell Amount</th>
                  <th width="col">Currency</th>
                  <th width="col">Fee</th>
                  <th width="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {tradeData?.map((_item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{new Date(_item.createdat).toLocaleString()}</td>
                    <td>{_item.buy}</td>
                    <td>{_item.buycurrency}</td>
                    <td>{_item.sell}</td>
                    <td>{_item.sellcurrency}</td>
                    <td>{_item.fee}</td>
                    <td>
                      {_item.userid != userId && (
                        <div
                          class="btn-group btn-group-toggle"
                          data-toggle="buttons"
                        >
                          <label
                            class="btn btn-success"
                            onClick={approveTrade(_item.id)}
                          >
                            Trade
                          </label>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {(!tradeData || tradeData == {}) && (
            <p class="text-center">No Orders!</p>
          )}
        </div>
      </div>
      <div
        class="modal fade"
        id="sendModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Send any currency to other members
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div style="display: flex; flex-direction: row">
                <div style="flex: 1; margin-right: 10px">
                  <label for="basic-url">Send to:</label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      v-model="sendTo"
                      placeholder="email"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
              <div style="display: flex; flex-direction: row">
                <div class="form-group" style="flex: 1; margin-right: 10px">
                  <label for="exampleFormControlSelect1">Currency</label>
                  <select class="form-control" v-model="sendCurrency">
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style="display: flex; flex-direction: row">
                <div style="flex: 1; margin-right: 10px">
                  <label for="basic-url">Amount</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon3">
                        {sendCurrency}
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      v-model="sendAmount"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick="send">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="depositModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Deposit
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div style="display: flex; flex-direction: row">
                <div class="form-group" style="flex: 1; margin-right: 10px">
                  <label for="exampleFormControlSelect1">Currency</label>
                  <select class="form-control" v-model="depositCurrency">
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                v-if="depositCurrency != 'ETH' && depositCurrency != 'W2' && depositCurrency != 'W1'"
                style="display: flex; flex-direction: row"
              >
                <div style="flex: 1; margin-right: 10px">
                  <label for="basic-url">Amount</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon3">
                        {depositCurrency}
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      v-model="depositAmount"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="depositCurrency == 'ETH' || depositCurrency == 'W2' || depositCurrency == 'W1'"
                style="display: flex; flex-direction: row"
              >
                <div style="flex: 1; margin-right: 10px">
                  <label for="basic-url">Address</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon3">
                        {depositCurrency}
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="token"
                      readonly
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                v-if="depositCurrency != 'ETH' && depositCurrency != 'W2' && depositCurrency != 'W1'"
                type="button"
                class="btn btn-primary"
                onclick="deposit"
              >
                Deposit
              </button>
              <button
                v-if="depositCurrency == 'ETH' || depositCurrency == 'W2' || depositCurrency == 'W1'"
                type="button"
                class="btn btn-primary"
                onclick="copy"
              >
                Copy To ClipBoard
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="withdrawalModal"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Withdrawal
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div style="display: flex; flex-direction: row">
                <div class="form-group" style="flex: 1; margin-right: 10px">
                  <label for="exampleFormControlSelect1">Currency</label>
                  <select class="form-control" v-model="withdrawalCurrency">
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style="display: flex; flex-direction: row">
                <div style="flex: 1; margin-right: 10px">
                  <label for="basic-url">Amount</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon3">
                        {withdrawalCurrency}
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      v-model="withdrawalAmount"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="withdrawalCurrency == 'ETH' || withdrawalCurrency == 'W2' || withdrawalCurrency == 'W1'"
                style="display: flex; flex-direction: row"
              >
                <div style="flex: 1; margin-right: 10px">
                  <label for="basic-url">Address</label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      v-model="withdrawalAddress"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onclick="withdraw">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
