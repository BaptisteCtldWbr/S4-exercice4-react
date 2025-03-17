import { Link } from "@remix-run/react";

export default function HomePage(){
    return (
        <div>
            <h1>Bienvenue</h1>
            <Link to="/about">Aller à la page à propos</Link>
        </div>
    );
}