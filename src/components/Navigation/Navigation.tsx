import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <div className="w-full bg-gray-500 py-4 px-20 flex justify-between items-center fixed top-0 left-0">
            <Link to='/' className="flex hover:scale-[1.05] duration-300">
                <div className="text-2xl font-bold">CAR</div>
                <div className="text-2xl text-white font-bold">LOC</div>
            </Link>
            <div className="flex gap-2">
                <Link to="/">
                    <Button size={'sm'} variant={(location.pathname === '/') ? 'secondary' : 'ghost'}>Accueil</Button>
                </Link>
                <Link to="/locations">
                    <Button size={'sm'} variant={(location.pathname === '/locations') ? 'secondary' : 'ghost'}>Locations</Button>
                </Link>
                <Link to="/stats">
                    <Button size={'sm'} variant={(location.pathname === '/stats') ? 'secondary' : 'ghost'}>Diagramme</Button>
                </Link>
            </div>
        </div>
    )
}

export default Navigation;