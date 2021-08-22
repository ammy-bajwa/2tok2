import { useState, useEffect } from "react";
import { toast } from "react-nextjs-toast";
import Layout from "../componets/Layout";
import fetch from "isomorphic-unfetch";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const ErrToast = {
  duration: 5,
  type: "error",
};
const OkToast = {
  duration: 5,
  type: "success",
};
const options = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Euro", value: "EUR" },
  { label: "Tether", value: "USDT" },
  { label: "W1", value: "W1" },
  { label: "W2", value: "W2" },
];

export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: JSON.parse(req.locals?.data || "{}"),
      tradeData: req.locals?.tradeData,
      userName: req.locals?.userName,
      settings: req.locals?.settings,
      title: req.locals?.title || "",
      token: req.locals?.token || "",
      userId: req.locals?.userId || "",
      isAdmin: req.locals?.isAdmin || false,
    },
  };
}

export default function Index({
  message,
  data,
  tradeData,
  userName,
  settings,
  title,
  token,
  userId,
  isAdmin,
}) {
  const [payCurrency, setPayCurrency] = useState("");
  const [receiveCurrency, setReceiveCurrency] = useState("");
  const [pay, setPay] = useState("");
  const [receive, setReceive] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [sendCurrency, setSendCurrency] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [depositCurrency, setDepositCurrency] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalCurrency, setWithdrawalCurrency] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [tradeDataState, setTradeDataState] = useState([]);

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
    if (!receiveCurrency) {
      toast.notify("Please select buy Currency!", ErrToast);
      return;
    }
    if (!payCurrency) {
      toast.notify("Please select pay Currency!", ErrToast);
      return;
    }
    if (!pay) {
      toast.notify("Please enter sell amount!", ErrToast);
      return;
    }
    if (!receive) {
      toast.notify("Please enter buy amount!", ErrToast);
      return;
    }
    fetch("/api/Exchange", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buy: receive.toString(),
        buyCurrency: receiveCurrency.toString(),
        sell: pay.toString(),
        sellCurrency: payCurrency.toString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          setReceiveCurrency("");
          setPayCurrency("");
          setReceive("");
          setPay("");
          toast.notify("Exchange Request send !", OkToast);
          location.reload();
        }
      });
  };
  const deposit = () => {
    if (!depositCurrency) {
      toast.notify("Please select Currency!", ErrToast);
      return;
    }
    if (!depositAmount) {
      toast.notify("Please enter amount!", ErrToast);
      return;
    }
    fetch("/api/deposit", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: depositCurrency,
        amount: depositAmount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          setDepositCurrency("");
          setDepositAmount("");
          $("#depositModal").modal("hide");
          location.reload();
        }
      });
  };
  const withdraw = () => {
    if (!withdrawalCurrency) {
      toast.notify("Please select Currency!", ErrToast);
      return;
    }
    if (!withdrawalAmount) {
      toast.notify("Please enter amount!", ErrToast);
      return;
    }
    if (
      withdrawalCurrency == "ETH" ||
      withdrawalCurrency == "W1" ||
      withdrawalCurrency == "W2"
    ) {
      if (!withdrawalAddress) {
        toast.notify("Please enter address!", ErrToast);
        return;
      }
    }
    fetch("/api/withdraw", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: withdrawalCurrency,
        amount: withdrawalAmount,
        address: withdrawalAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          setWithdrawalCurrency("");
          setWithdrawalAmount("");
          $("#withdrawalModal").modal("hide");
          location.reload();
        }
      });
  };
  const send = () => {
    if (!sendTo) {
      toast.notify("Please enter send to email!", ErrToast);
      return;
    }
    if (!sendCurrency) {
      toast.notify("Please enter currency!", ErrToast);
      return;
    }
    if (!sendAmount) {
      toast.notify("Please enter amount!", ErrToast);
      return;
    }
    fetch("/api/send", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: sendCurrency,
        amount: sendAmount,
        email: sendTo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          setSendCurrency("");
          setSendAmount("");
          setSendTo("");
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

    textArea.value = token;

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
          toast.notify(data?.error, ErrToast);
        } else {
          location.reload();
        }
      });
  };
  useEffect(() => {
    setTimeout(() => {
      location.reload();
    }, 50 * 1800);
    setTradeDataState(JSON.parse(tradeData));
    console.log("tradeData_d1", tradeData);
  }, []);
  console.log("tradeData_d", tradeDataState);
  const actionRenderer = ({ data }) => {
    return (
      <>
        {data.userid != userId && (
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-success" onClick={approveTrade(data.id)}>
              Trade
            </label>
          </div>
        )}
        {data.userid == userId && (
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-success" onClick={approveTrade(data.id)}>
              Cancel
            </label>
          </div>
        )}
      </>
    );
  };
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
      <div id="tradeApp" class="container" style={{ marginTop: 20 }}>
        {message?.success && (
          <div class="alert alert-success" role="alert">
            {message?.success}
          </div>
        )}
        {message?.error && (
          <div class="alert alert-danger" role="alert">
            {message?.error}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div class="card" style={{ flex: 1 }}>
            <div class="card-header">
              <ul class="nav nav-pills w-100">
                <li class="nav-pill active">
                  <a class="nav-link" onClick={reload}>
                    Balances{" "}
                    <ion-icon
                      style={{
                        marginBottom: -3,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                      name="reload-outline"
                    ></ion-icon>
                  </a>
                </li>
                <li class="nav-pill ml-auto">
                  <button
                    type="submit"
                    style={{ marginRight: 10 }}
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#sendModal"
                  >
                    Send
                  </button>
                  <button
                    type="submit"
                    style={{ marginRight: 10 }}
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
            <div
              className="ag-theme-alpine-dark"
              style={{ height: 300, width: "100%" }} >
              <AgGridReact
                rowData={Object.keys(data).map((key) => {return {currency:key,balance:data[key]}})}
                defaultColDef={{
                  resizable: true,
                  filter: "agTextColumnFilter",
                }}
                frameworkComponents={{ actionRenderer }}
              >
                <AgGridColumn
                  field="currency"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                <AgGridColumn
                  field="Total"
                  field="balance"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Available"
                  field="balance"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                </AgGridReact>
                </div>
            </div>
          </div>
          <div class="card" style={{ flex: 1, marginLeft: 20 }}>
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
              <span
                style={{ height: 10, width: "100%", display: "block" }}
              ></span>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div class="form-group" style={{ flex: 1, marginRight: 10 }}>
                  <label for="exampleFormControlSelect1">From currency</label>
                  <select
                    class="form-control"
                    onChange={(e) => setPayCurrency(e.target.value)}
                  >
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group" style={{ flex: 1 }}>
                  <label for="exampleFormControlSelect1">To currency</label>
                  <select
                    class="form-control"
                    onChange={(e) => setReceiveCurrency(e.target.value)}
                  >
                    {options.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, marginRight: 10 }}>
                  <label for="basic-url">You Pay</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon3">
                        {payCurrency}
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      onChange={(e) => setPay(e.target.value)}
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label for="basic-url">You receive</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon3">
                        {receiveCurrency}
                      </span>
                    </div>
                    <input
                      type="number"
                      class="form-control"
                      onChange={(e) => setReceive(e.target.value)}
                      aria-describedby="basic-addon3"
                    />
                  </div>
                </div>
              </div>
              <span
                style={{ height: 10, width: "100%", display: "block" }}
              ></span>
              <center>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={exchange}
                >
                  Exchange
                </button>
              </center>
              <span
                style={{ height: 10, width: "100%", display: "block" }}
              ></span>
              <center>
                <p style={{ fontSize: 10 }}>Included fee is: (0.80 %)</p>
              </center>
            </div>
          </div>
        </div>
        <div class="card" style={{ flex: 1, marginTop: 20 }}>
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
            <div
              className="ag-theme-alpine-dark"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowData={tradeDataState}
                pagination
                defaultColDef={{
                  resizable: true,
                  filter: "agTextColumnFilter",
                }}
                frameworkComponents={{ actionRenderer }}>
                <AgGridColumn
                  headerName="DateTime"
                  field="createdat"
                  cellRenderer={({ data }) =>
                    new Date(data.createdat).toLocaleString()
                  }
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                <AgGridColumn
                  width={100}
                  field="buy"
                  sortable={true}
                  filter={true}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Currency"
                  field="buycurrency"
                  sortable={true}
                  filter={true}
                  width={120}
                ></AgGridColumn>
                <AgGridColumn
                  field="sell"
                  sortable={true}
                  filter={true}
                  width={100}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Currency"
                  field="sellcurrency"
                  sortable={true}
                  filter={true}
                  width={120}
                ></AgGridColumn>
                <AgGridColumn
                  field="fee"
                  sortable={true}
                  filter={true}
                  width={100}
                ></AgGridColumn>
                <AgGridColumn
                  field="status"
                  sortable={true}
                  filter={true}
                  width={120}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Action"
                  cellRenderer="actionRenderer"
                  sortable={true}
                  filter={true}
                  width={140}
                ></AgGridColumn>
              </AgGridReact>
            </div>
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: 1, marginRight: 10 }}>
                    <label for="basic-url">Send to:</label>
                    <div class="input-group mb-3">
                      <input
                        type="text"
                        class="form-control"
                        onChange={(e) => setSendTo(e.target.value)}
                        placeholder="email"
                        aria-describedby="basic-addon3"
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="form-group" style={{ flex: 1, marginRight: 10 }}>
                    <label for="exampleFormControlSelect1">Currency</label>
                    <select
                      class="form-control"
                      onChange={(e) => setSendCurrency(e.target.value)}
                    >
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: 1, marginRight: 10 }}>
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
                        onChange={(e) => setSendAmount(e.target.value)}
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
                <button type="button" class="btn btn-primary" onClick={send}>
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="form-group" style={{ flex: 1, marginRight: 10 }}>
                    <label for="exampleFormControlSelect1">Currency</label>
                    <select
                      class="form-control"
                      onChange={(e) => setDepositCurrency(e.target.value)}
                    >
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {depositCurrency != "ETH" &&
                  depositCurrency != "W2" &&
                  depositCurrency != "W1" && (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ flex: 1, marginRight: 10 }}>
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
                            onChange={(e) => setDepositAmount(e.target.value)}
                            aria-describedby="basic-addon3"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                {(depositCurrency == "ETH" ||
                  depositCurrency == "W2" ||
                  depositCurrency == "W1") && (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, marginRight: 10 }}>
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
                          value={token}
                          readonly
                          aria-describedby="basic-addon3"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {depositCurrency != "ETH" &&
                  depositCurrency != "W2" &&
                  depositCurrency != "W1" && (
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={deposit}
                    >
                      Deposit
                    </button>
                  )}
                {(depositCurrency == "ETH" ||
                  depositCurrency == "W2" ||
                  depositCurrency == "W1") && (
                  <button type="button" class="btn btn-primary" onClick={copy}>
                    Copy To ClipBoard
                  </button>
                )}
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div class="form-group" style={{ flex: 1, marginRight: 10 }}>
                    <label for="exampleFormControlSelect1">Currency</label>
                    <select
                      class="form-control"
                      onChange={(e) => setWithdrawalCurrency(e.target.value)}
                    >
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: 1, marginRight: 10 }}>
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
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        aria-describedby="basic-addon3"
                      />
                    </div>
                  </div>
                </div>
                {(withdrawalCurrency == "ETH" ||
                  withdrawalCurrency == "W2" ||
                  withdrawalCurrency == "W1") && (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, marginRight: 10 }}>
                      <label for="basic-url">Address</label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control"
                          onChange={(e) => setWithdrawalAddress(e.target.value)}
                          aria-describedby="basic-addon3"
                        />
                      </div>
                    </div>
                  </div>
                )}
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
                  type="button"
                  class="btn btn-primary"
                  onClick={withdraw}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
