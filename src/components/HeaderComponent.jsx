import React from "react";
import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <NavLink to={"/"} className="navbar-brand">
              Todo Management Application
            </NavLink>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
