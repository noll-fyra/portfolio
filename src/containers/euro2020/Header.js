import React from "react";
import { NavLink } from "react-router-dom";
import constants from "./data/constants";

const sections = ["matches"];

const Header = () => (
  <div>
    <h1 style={{ textAlign: "center", marginTop: "12px", color: constants.colors.red, fontSize: '48px' }}>
      EURO 2020
    </h1>
    <div style={{ backgroundColor: constants.colors.blue }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          margin: "12px auto"
        }}
      >
        {sections.map(sect => (
          <NavLink
            key={sect}
            to={`/euro2020/${sect}`}
            activeStyle={{
              backgroundColor: "gold",
              color: "#19364C"
            }}
            style={{
              width: `calc(100%/${sections.length})`,
              maxWidth: `calc(600px/${sections.length})`,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              textDecoration: "none",
              padding: "8px"
            }}
          >
            {sect[0].toUpperCase().concat(sect.slice(1))}
          </NavLink>
        ))}
      </div>
    </div>
  </div>
);

export default Header;
