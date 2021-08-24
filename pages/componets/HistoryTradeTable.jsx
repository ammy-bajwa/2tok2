import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const HistoryTradeTable = ({ data }) => {
  return (
    <AgGridReact
      rowData={data}
      pagination
      defaultColDef={{
        resizable: true,
        filter: "agTextColumnFilter",
      }}
    >
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
    </AgGridReact>
  );
};

export default HistoryTradeTable;
