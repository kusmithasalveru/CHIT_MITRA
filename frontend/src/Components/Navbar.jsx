import React from "react";

function Navbar() {
    return (
        <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            background: "#1f5d73",
            color: "white"
        }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "10px",
                        background: "#0b2f3a"
                    }}></div>

                    <h2 style={{ margin: 0 }}>CHIT MITRA</h2>
                </div>

                <span style={{ fontSize: "12px", color: "#a8e6cf" }}>
                    Your Trusted Chit Fund Partner
                </span>
            </div>

            <div style={{ display: "flex", gap: "30px" }}>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Home</a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Features</a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>About</a>
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Contact</a>
            </div>

            <button style={{
                background: "#2ecc71",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                color: "white"
            }}>
                Get Started
            </button>
        </nav>
    );
}

export default Navbar;
