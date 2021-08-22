import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import Layout from "../componets/Layout";
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: JSON.parse(req.locals?.data || "[]"),
      userName: req.locals?.userName || "",
      isAdmin: req.locals?.isAdmin || false,
      title: req.locals?.title || "",
    },
  };
}

export default function Index({ message, data, userName, title, isAdmin }) {
  const actionRenderer = ({ data }) => {
    return (
      <>
        {data.admin != 1 && data.active != 0 && (
          <a
            class="btn btn-danger delete"
            onclick="return alert('Are You sure?')"
            href={`user/delete/${data.id}`}
          >
            Deactivate
          </a>
        )}
        {data.admin == 1 && "Admin"}
      </>
    );
  };
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
          <div class="card-header">
            <ul class="nav nav-pills w-100">
              <li class="nav-pill active">
                <a class="nav-link">Users</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div
              className="ag-theme-alpine-dark"
              style={{ height: "70vh", width: "100%" }}
            >
              <AgGridReact
                rowData={data}
                pagination
                defaultColDef={{
                  resizable: true,
                  filter: "agTextColumnFilter",
                }}
                frameworkComponents={{ actionRenderer }}
              >
                <AgGridColumn
                  headerName="Name"
                  field="username"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                <AgGridColumn
                  flex={1}
                  field="email"
                  sortable={true}
                  filter={true}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="ETH Address"
                  field="token"
                  sortable={true}
                  filter={true}
                  flex={1}
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
      </div>
    </Layout>
  );
}
