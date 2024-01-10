import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//core
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";



function Table({ data, columns }) {

    return (
        <DataTable
            value={data}
            scrollable scrollHeight="30rem"
            tableStyle={{ minWidth: '50rem' }}
            showGridlines
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            sortMode="multiple"
        >
            {columns.map((col, i) => (
                <Column key={col.field} field={col.field} header={col.header} sortable />
            ))}
        </DataTable>
    )
}

export default Table