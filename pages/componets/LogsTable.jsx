import { AgGridColumn, AgGridReact } from "ag-grid-react";

export default function Index({ data }) {
  return (
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
        cellRenderer={({ data }) => new Date(data.created_at).toLocaleString()}
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
  );
}
