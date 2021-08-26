import Layout from "../componets/Layout";
import HistoryTradeTable from "../componets/HistoryTradeTable";
import HistoryDepWidTable from "../componets/HistoryDepWidTable";
import HistoryNav from "../componets/HistoryNav";

export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || "",
      data: JSON.parse(req.locals?.data || "[]"),
      userName: req.locals?.userName || "",
      title: req.locals?.title || "",
      isAdmin: req.locals?.isAdmin || false,
    },
  };
}

export default function Index({ message, data, userName, title, isAdmin }) {
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
      <div className="container" style={{ marginTop: 20 }}>
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
            <HistoryNav />
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
                  className="ag-theme-alpine-dark"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <HistoryTradeTable data={data?.trade_data} />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-deposits"
                role="tabpanel"
                aria-labelledby="nav-deposits-tab"
              >
                <div
                  className="ag-theme-alpine-dark"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <HistoryDepWidTable data={data?.deposits_data} />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-withdrawals"
                role="tabpanel"
                aria-labelledby="nav-withdrawals-tab"
              >
                <div
                  className="ag-theme-alpine-dark"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <HistoryDepWidTable data={data?.withdrawals_data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
