import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../lyra_logo/logo_trans.png"
import "./LP.css"

function LandingPage() {
    useEffect(() => {
        document.title = 'LYRA'
    })
    return (
        <main>
            <div className="px-4 py-5 my-5 text-center">
                <NavLink className="navbar-brand" to="/">
                    <img className="lp_logo" src={logo} alt="Lyra" />
                </NavLink>
                <div className="">
                    <h1 className="" id="text-body">
                        The only Live Song Request app used by 'millions' of artists and music professionals worldwide!
                    </h1>
                </div>
            </div>
        </main>
    )
}
export default LandingPage;