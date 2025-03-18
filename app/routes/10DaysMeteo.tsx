/* 
https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&hourly=temperature_2m&timezone=Europe%2FBerlin&past_days=5&forecast_days=1
Only for non-commercial use and less than 10.000 daily API calls. See Terms for more details.
*/


import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { DataGrid } from '@mui/x-data-grid';

export async function loader() {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&hourly=temperature_2m&models=meteofrance_seamless&temporal_resolution=hourly_6&start_date=2025-03-07&end_date=2025-03-17");
    const data = await res.json();
    return json(data);
}

export default function GistsRoute() {
    const { hourly } = useLoaderData<typeof loader>();
    const { time, temperature_2m } = hourly;

    return (
        <table>
            <thead>
                <th scope="col">Jour</th>
                <th scope="col">Température</th>
            </thead>
            <ul>
                {time.map((timeValue, index) => (
                    <tr key={index}>
                        <td>{timeValue}</td>
                        <td>{temperature_2m[index]}</td>
                    </tr>
                ))}
            </ul>
        </table>
    );
}
