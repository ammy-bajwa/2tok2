import Layout from "./componets/Layout";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

export async function getServerSideProps({ req }) {
  return {
    props: {
      data: JSON.parse(req.locals?.data || "{}"),
      userName: req.locals?.userName || null,
      title: "logs",
      isAdmin: req.locals?.isAdmin || null,
    },
  };
}

export default function Index({ data, isAdmin }) {
  console.log("data: ", data);
  return (
    <Layout isAdmin={isAdmin}>
      <div className="text-center">
        <div class="card">
          <div class="card-header">
            <h1>Logs</h1>
          </div>
          <div class="card-body">
            <div
              className="ag-theme-alpine-dark"
              style={{ height: "65vh", width: "100%" }}
            >
              <AgGridReact
                rowData={data}
                pagination
                paginationPageSize={30}
                defaultColDef={{
                  resizable: true,
                  filter: "agTextColumnFilter",
                }}
              >
                <AgGridColumn
                  headerName="Id"
                  field="id"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Action"
                  field="action"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Description"
                  field="description"
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>

                <AgGridColumn
                  headerName="Log Time"
                  field="created_at"
                  cellRenderer={({ data }) =>
                    new Date(data.created_at).toLocaleString()
                  }
                  sortable={true}
                  filter={true}
                  flex={1}
                ></AgGridColumn>

                <AgGridColumn
                  headerName="Status"
                  field="succeed"
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
