import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Excel from '../../../src/assets/ms-excel.svg';
import { Button } from "primereact/button";



function Table({ data, columns, isValid }) {
    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
          const workSheet = xlsx.utils.json_to_sheet(data);
          const workBook = { Sheets: { data: workSheet }, SheetNames: ["data"] };
          const excelBuffer = xlsx.write(workBook, {
            bookType: "xlsx",
            type: "array",
          });
          saveAsExcelFile(excelBuffer, "data");
        });
      };
    
      const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((FileSaver) => {
          let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          let EXCEL_EXTENSION = ".xlsx";
          const data = new Blob([buffer], {
            type: EXCEL_TYPE,
          });
          FileSaver.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
          );
        });
      };

      
    const header = (
        isValid && 
        <div className="flex justify-end bg-transparent !border-0 items-center export-button">
            <h5>Export</h5>
            <button
                type="button"
                icon="pi pi-file-excel"
                onClick={exportExcel}
                className="mx-2 my-2 p-button-success"
                data-pr-tooltip="XLS"
           > 
            <img src={Excel} alt="" />
           </button>
        </div>
    );




    return (
        <DataTable
            value={data}
            emptyMessage="Data not found!"
            tableStyle={{ minWidth: '50rem' }}
            stripedRows
            resizableColumns="expand"
            paginator
            rows={25}
            header={header}
            rowsPerPageOptions={[25, 50, 100]}
            sortMode="multiple"
        >
            {columns.map((col) => (
                <Column key={col.field} field={col.field} header={col.header} body={col.body} style={col.style ? "" : { width: '100%' }} sortable={!col.sortable} />
            ))}
        </DataTable>
    )
}

export default Table