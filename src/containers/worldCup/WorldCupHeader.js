import React from "react";
import { NavLink } from "react-router-dom";

const sections = ["polls", "table", "matches", "teams"];

const WorldCupHeader = () => (
  <div>
    <h1 style={{ textAlign: "center", marginTop: "12px" }}>
      2018 FIFA WORLD CUP PREDICTION GAME
    </h1>
    <div style={{ backgroundColor: "#19364C" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "480px",
          margin: "12px auto"
        }}
      >
        {sections.map(sect => (
          <NavLink
            key={sect}
            to={`/worldcup/${sect}`}
            activeStyle={{
              backgroundColor: "gold",
              color: "#19364C"
            }}
            style={{
              width: `calc(100%/${sections.length})`,
              maxWidth: `calc(480px/${sections.length})`,
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

export default WorldCupHeader;
