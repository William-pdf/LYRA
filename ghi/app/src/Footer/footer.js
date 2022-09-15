import React from "react";
import logo from "../lyra_logo/logo_skinny_trans.png"
import "./footer.css";

const Footer = () => {
    let url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* column1 */}
                    <div className="col">
                        <h4>LYRA</h4>
                        <ul className="list-unstyled">
                            <li>303-555-0199</li>
                            <li>Sea of Clouds, MON</li>
                            <li>40.331,20.675</li>
                        </ul>
                    </div>
                    {/* column2 */}
                    <div className="col">
                        <ul className="list-unstyled">
                        <a href={url}><li>Careers</li></a>
                            <li>Merch</li>
                            <li>The Team</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} LYRA Live Song Request | All Rights Reserved | Terms of Service
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Footer;