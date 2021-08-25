import { useState, useEffect } from "react";
import { toast } from "react-nextjs-toast";
import Layout from "../componets/Layout";
import UserBalanceTableHome from "../componets/UserBalanceTableHome";
import fetch from "isomorphic-unfetch";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import HomeExchange from "../componets/HomeExchange";
import OrderBookHome from "../componets/OrderBookHome";
import SendModalHome from "../componets/SendModalHome";
import DepositModalHome from "../componets/DepositModalHome";
import WithdrawModalHome from "../componets/WithdrawModalHome";

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
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-success" onClick={approveTrade(data.id)}>
              Trade
            </label>
          </div>
        )}
        {data.userid == userId && (
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-success" onClick={approveTrade(data.id)}>
              Cancel
            </label>
          </div>
        )}
      </>
    );
  };
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
      <div id="tradeApp" className="container" style={{ marginTop: 20 }}>
        {message?.success && (
          <div className="alert alert-success" role="alert">
            {message?.success}
          </div>
        )}
        {message?.error && (
          <div className="alert alert-danger" role="alert">
            {message?.error}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <ul className="nav nav-pills w-100">
                <li className="nav-pill active">
                  <a className="nav-link" onClick={reload}>
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
                <li className="nav-pill ml-auto">
                  <button
                    type="submit"
                    style={{ marginRight: 10 }}
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#sendModal"
                  >
                    Send
                  </button>
                  <button
                    type="submit"
                    style={{ marginRight: 10 }}
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#depositModal"
                  >
                    Deposit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target="#withdrawalModal"
                  >
                    Withdrawal
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div
                className="ag-theme-alpine-dark"
                style={{ height: 300, width: "100%" }}
              >
                <UserBalanceTableHome
                  data={data}
                  actionRenderer={actionRenderer}
                />
              </div>
            </div>
          </div>
          <div className="card" style={{ flex: 1, marginLeft: 20 }}>
            <HomeExchange
              setPayCurrency={setPayCurrency}
              setReceiveCurrency={setReceiveCurrency}
              setPay={setPay}
              setReceive={setReceive}
              options={options}
              payCurrency={payCurrency}
              receiveCurrency={receiveCurrency}
              exchange={exchange}
            />
          </div>
        </div>
        <div className="card" style={{ flex: 1, marginTop: 20 }}>
          <div className="card-header">
            <ul className="nav nav-pills w-100">
              <li className="nav-pill active">
                <a className="nav-link" onClick={reload}>
                  Order Book
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div
              className="ag-theme-alpine-dark"
              style={{ height: "70vh", width: "100%" }}
            >
              <OrderBookHome tradeDataState={tradeDataState} />
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="sendModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <SendModalHome
            setSendTo={setSendTo}
            setSendCurrency={setSendCurrency}
            options={options}
            setSendAmount={setSendAmount}
            sendCurrency={sendCurrency}
            send={send}
          />
        </div>
        <div
          className="modal fade"
          id="depositModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <DepositModalHome
            options={options}
            depositCurrency={depositCurrency}
            deposit={deposit}
            copy={copy}
            setDepositCurrency={setDepositCurrency}
            setDepositAmount={setDepositAmount}
          />
        </div>
        <div
          className="modal fade"
          id="withdrawalModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <WithdrawModalHome
            options={options}
            setWithdrawalCurrency={setWithdrawalCurrency}
            setWithdrawalAmount={setWithdrawalAmount}
            setWithdrawalAddress={setWithdrawalAddress}
            withdraw={withdraw}
          />
        </div>
      </div>
    </Layout>
  );
}
