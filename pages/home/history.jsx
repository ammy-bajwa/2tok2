import { refLink } from "../../constants/link";
import Layout from "../componets/Layout";
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
      <div class="container" style={{ marginTop: 20 }}>
        {message.success && (
          <div class="alert alert-success" role="alert">
            {message.success}
          </div>
        )}
        {message.error && (
          <div class="alert alert-danger" role="alert">
            {message.error}
          </div>
        )}
        <div class="card">
          <div class="card-header" style={{ paddingTop: 10, borderBottom: 0 }}>
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link active"
                  id="nav-trades-tab"
                  data-toggle="tab"
                  href="#nav-trades"
                  role="tab"
                  aria-controls="nav-trades"
                  aria-selected="true"
                >
                  Trades
                </a>
                <a
                  class="nav-item nav-link"
                  id="nav-deposits-tab"
                  data-toggle="tab"
                  href="#nav-deposits"
                  role="tab"
                  aria-controls="nav-deposits"
                  aria-selected="false"
                >
                  Deposits
                </a>
                <a
                  class="nav-item nav-link"
                  id="nav-withdrawals-tab"
                  data-toggle="tab"
                  href="#nav-withdrawals"
                  role="tab"
                  aria-controls="nav-withdrawals"
                  aria-selected="false"
                >
                  Withdrawals
                </a>
              </div>
            </nav>
          </div>
          <div class="card-body">
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-trades"
                role="tabpanel"
                aria-labelledby="nav-trades-tab"
              >
                {data?.trade_data?.length && (
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
                        <th width="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.trade_data?.map((_item, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{new Date(_item.createdat).toLocaleString()}</td>
                          <td>{_item.buy}</td>
                          <td>{_item.buycurrency}</td>
                          <td>{_item.sell}</td>
                          <td>{_item.sellcurrency}</td>
                          <td>{_item.fee}</td>
                          <td>{_item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {!data?.trade_data?.length && (
                  <p class="text-center">No Trades!</p>
                )}
              </div>
              <div
                class="tab-pane fade"
                id="nav-deposits"
                role="tabpanel"
                aria-labelledby="nav-deposits-tab"
              >
                {data?.deposits_data?.length && (
                  <table class="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">DateTime</th>
                        <th scope="col">Reference</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Total</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.deposits_data?.map((_item, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{new Date(_item.createdat).toLocaleString()}</td>
                          <td>
                            <a
                              href={`${refLink}${_item.ref}`}
                              className="text-light"
                              target="_blank"
                            >
                              {_item.ref}
                            </a>
                          </td>
                          <td>{_item.amount}</td>
                          <td>{_item.fee}</td>
                          <td>{_item.amount}</td>
                          <td>{_item.currency}</td>
                          <td>{_item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {!data?.deposits_data?.length && (
                  <p class="text-center">No Deposits!</p>
                )}
              </div>
              <div
                class="tab-pane fade"
                id="nav-withdrawals"
                role="tabpanel"
                aria-labelledby="nav-withdrawals-tab"
              >
                {data?.withdrawals_data?.length && (
                  <table class="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">DateTime</th>
                        <th scope="col">Reference</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Total</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.withdrawals_data?.map((_item, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{new Date(_item.createdat).toLocaleString()}</td>
                          <td>
                            <a
                              href={`${refLink}${_item.ref}`}
                              className="text-light"
                              target="_blank"
                            >
                              {_item.ref}
                            </a>
                          </td>
                          <td>{_item.amount}</td>
                          <td>{_item.fee}</td>
                          <td>{_item.amount}</td>
                          <td>{_item.currency}</td>
                          <td>{_item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {!data?.withdrawals_data?.length && (
                  <p class="text-center">No withdrawals!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
