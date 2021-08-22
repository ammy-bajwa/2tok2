import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

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
                <div
                  className="ag-theme-alpine-dark"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <AgGridReact
                    rowData={data?.trade_data}
                    pagination
                    defaultColDef={{
                      resizable: true,
                      filter: "agTextColumnFilter",
                    }}
                  >
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
                  </AgGridReact>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-deposits"
                role="tabpanel"
                aria-labelledby="nav-deposits-tab"
              >
                <div
                  className="ag-theme-alpine-dark"
                  style={{ height: "70vh", width: "100%" }}
                >
                  <AgGridReact
                    rowData={data?.deposits_data}
                    pagination
                    defaultColDef={{
                      resizable: true,
                      filter: "agTextColumnFilter",
                    }}
                  >
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
                      headerName="Reference"
                      field="ref"
                      sortable={true}
                      filter={true}
                      flex={1}
                    ></AgGridColumn>
                    <AgGridColumn
                      field="amount"
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
                      field="amount"
                      sortable={true}
                      filter={true}
                      width={120}
                    ></AgGridColumn>
                    <AgGridColumn
                      field="currency"
                      sortable={true}
                      filter={true}
                      width={120}
                    ></AgGridColumn>
                    <AgGridColumn
                      field="status"
                      sortable={true}
                      filter={true}
                      width={120}
                    ></AgGridColumn>
                  </AgGridReact>
                </div>
              </div>
              <div class="tab-pane fade" id="nav-withdrawals" role="tabpanel" aria-labelledby="nav-withdrawals-tab">
                <div className="ag-theme-alpine-dark" style={{ height: "70vh", width: "100%" }}>
                  <AgGridReact rowData={data?.withdrawals_data} pagination defaultColDef={{ resizable: true, filter: "agTextColumnFilter" }}>
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
                      headerName="Reference"
                      field="ref"
                      sortable={true}
                      filter={true}
                      flex={1}
                    ></AgGridColumn>
                    <AgGridColumn
                      field="amount"
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
                      field="amount"
                      sortable={true}
                      filter={true}
                      width={120}
                    ></AgGridColumn>
                    <AgGridColumn
                      field="currency"
                      sortable={true}
                      filter={true}
                      width={120}
                    ></AgGridColumn>
                    <AgGridColumn
                      field="status"
                      sortable={true}
                      filter={true}
                      width={120}
                    ></AgGridColumn>
                  </AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
