import React from "react";

function Hero() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "60px 80px",
                background: "linear-gradient(to right, #1e4f63, #6ea3d8)",
                color: "white",
            }}
        >
            {/* LEFT CONTENT */}
            <div style={{ maxWidth: "500px" }}>
                <h1 style={{ fontSize: "48px" }}>Welcome to Chit Mitra</h1>

                <p style={{ marginTop: "20px" }}>
                    Join India's most trusted digital chit fund platform. Secure,
                    transparent, and hassle-free savings for a better tomorrow.
                </p>

                <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
                    <button
                        style={{
                            background: "#2ecc71",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "25px",
                            color: "white",
                        }}
                    >
                        Start Saving Today
                    </button>

                    <button
                        style={{
                            background: "#00bcd4",
                            border: "none",
                            padding: "12px 25px",
                            borderRadius: "25px",
                            color: "white",
                        }}
                    >
                        Learn More
                    </button>
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <img
                src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1"
                alt="saving"
                style={{ width: "420px", borderRadius: "20px" }}
            />
        </div>
    );
}

export default Hero;
