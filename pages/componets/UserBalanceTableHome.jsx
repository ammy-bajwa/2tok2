import { AgGridColumn, AgGridReact } from "ag-grid-react";

const UserBalanceTableHome = ({ data = {}, actionRenderer }) => (
  <AgGridReact
    rowData={Object.keys(data).map((key) => {
      return { currency: key, balance: data[key] };
    })}
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
);
export default UserBalanceTableHome;
