import { data } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
export async function loader() {
    const res = await fetch("https://api.github.com/gists");
    return data(await res.json());
}
export default function GistsRoute() {
    const gists = useLoaderData<typeof loader>();
    return (
        <ul>
            {gists.map((gist) => (
                <li key={gist.id}>
                    <a href={gist.html_url}>{gist.id}</a>
                </li>
            ))}
        </ul>
    );
}