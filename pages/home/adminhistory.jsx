import { toast } from "react-nextjs-toast";

import AdminHistoryTradeTable from "../componets/AdminHistoryTradeTable";
import AdminHistoryDepWidTable from "../componets/AdminHistoryDepWidTable";
import TradeNavTabs from "../componets/TradeNavTabs";

const ErrToast = {
  duration: 5,
  type: "error",
};
const OkToast = {
  duration: 5,
  type: "success",
};
import Layout from "../componets/Layout";
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: JSON.parse(req.locals?.data || {}),
      userName: req.locals?.userName || "",
      title: req.locals?.title || "",
      isAdmin: req.locals?.isAdmin || false,
    },
  };
}

export default function Index({ userName, title, isAdmin, message, data }) {
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
  const approveTransaction = (id) => {
    fetch(`/api/transaction/approve/${id}`, { method: "put" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          location.reload();
        }
      });
  };
  const cancelTrade = (id) => {
    fetch(`/api/trade/cancel/${id}`, { method: "put" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          location.reload();
        }
      });
  };
  const cancelTransaction = (id) => {
    fetch(`/api/transaction/cancel/${id}`, { method: "put" })
      .then((response) => response.json())
      .then((data) => {
        if (data?.error) {
          toast.notify(data?.error, ErrToast);
        } else {
          location.reload();
        }
      });
  };

  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
      <div id="admin" className="container" style={{ marginTop: 20 }}>
        {message.success && (
          <div className="alert alert-success" role="alert">
            {message.success}
          </div>
        )}
        {message.error && (
          <div className="alert alert-danger" role="alert">
            {message.error}
          </div>
        )}

        <div className="card">
          <div
            className="card-header"
            style={{ paddingTop: 10, borderBottom: 0 }}
          >
            <TradeNavTabs />
          </div>
          <div className="card-body">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-trades"
                role="tabpanel"
                aria-labelledby="nav-trades-tab"
              >
                <div
                  className="ag-theme-balham"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <AdminHistoryTradeTable data={data?.trade_data} />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-deposits"
                role="tabpanel"
                aria-labelledby="nav-deposits-tab"
              >
                <div
                  className="ag-theme-balham"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <AdminHistoryDepWidTable data={data?.deposits_data} />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-withdrawals"
                role="tabpanel"
                aria-labelledby="nav-withdrawals-tab"
              >
                <div
                  className="ag-theme-balham"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <AdminHistoryDepWidTable data={data?.withdrawals_data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
