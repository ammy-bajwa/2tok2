import { AgGridColumn, AgGridReact } from "ag-grid-react";

import handleRefCellRenderer from "../helpersLocal/refCellRenderer";

const HistoryDepWidTable = ({ data }) => {
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
        headerName="Reference"
        field="ref"
        cellRenderer={handleRefCellRenderer}
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
  );
};

export default HistoryDepWidTable;
