import * as React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className="header">
            <h2 className="ui center aligned icon header ">
                <Link to="/"> <i className="hacker news square icon" /></Link>
            </h2>
        </div>
    );
};