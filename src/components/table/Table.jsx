import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";



function Table({ data, columns }) {
    return (
        <DataTable
            value={data}
            emptyMessage="Data not found!"
            tableStyle={{ minWidth: '50rem' }}
            stripedRows
            resizableColumns="expand"
            paginator
            rows={25}
            rowsPerPageOptions={[25, 50, 100]}
            sortMode="multiple"
        >
            {columns.map((col) => (
                // <Column key={col.field} field={col.field} header={col.header} body={col.body} style={col.style ? "" : { width: '100%' }} sortable={!col.sortable} />
                <Column key={col.field} field={col.field} header={col.header} body={col.body} />
            ))}
        </DataTable>
    )
}

export default Table