import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import Layout from "../componets/Layout";
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: JSON.parse(req.locals?.data || "{}"),
      userName: req.locals?.userName || "",
      isAdmin: req.locals?.isAdmin || false,
      title: req.locals?.title,
    },
  };
}

export default function Index({ userName, title, isAdmin, messages, data }) {
  console.log("home_data", data);
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
      <div className="container" style={{ marginTop: 20 }}>
        {messages?.success && (
          <div className="alert alert-success" role="alert">
            {messages?.success}
          </div>
        )}
        {messages?.error && (
          <div className="alert alert-danger" role="alert">
            {messages?.error}
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <ul className="nav nav-pills w-100">
              <li className="nav-pill active">
                <a className="nav-link">Balances</a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div
              className="ag-theme-alpine-dark"
              style={{ height: "65vh", width: "100%" }}
            >
              <AgGridReact
                rowData={Object.keys(data).map((key) => {
                  return { currency: key, balance: data[key] };
                })}
                defaultColDef={{
                  resizable: true,
                  filter: "agTextColumnFilter",
                }}
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
      </div>
    </Layout>
  );
}
