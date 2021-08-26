import { AgGridColumn, AgGridReact } from "ag-grid-react";


export default function Index({ data }) {
  console.log("data: ", data);
  const actionRenderer = ({ data }) => {
    return (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-success ">Approve</label>
        <label className="btn btn-danger">Cancel</label>
      </div>
    );
  };
  return (
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
        flex={1}
        field="username"
        sortable={true}
        filter={true}
      ></AgGridColumn>
      <AgGridColumn
        flex={1}
        field="email"
        sortable={true}
        filter={true}
      ></AgGridColumn>
      <AgGridColumn
        headerName="DateTime"
        field="createdat"
        cellRenderer={({ data }) => new Date(data.createdat).toLocaleString()}
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
  );
}
