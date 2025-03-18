import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {} from '@mui/x-data-grid/themeAugmentation';


export async function loader() {
    try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&hourly=temperature_2m&models=meteofrance_seamless&temporal_resolution=hourly_6&start_date=2025-03-07&end_date=2025-03-17");
        const data = await res.json();
        console.log(data);
        return json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return json({ error: error.message });
    }
}

export default function GistsRoute() {
    const data = useLoaderData<typeof loader>();

    const hourly = data.hourly;

    const { time, temperature_2m } = hourly;

    
    const rows = time.map((timeValue, index) => ({
        id: index,
        time: timeValue,
        temperature: temperature_2m[index]
    }));
    console.log(rows);

    const columns = [
        { field: 'time', headerName: 'Jour', width: 200 },
        { field: 'temperature', headerName: 'Température', width: 150 }
    ];

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
   
    );
}
