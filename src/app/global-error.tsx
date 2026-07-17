"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ro">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          background: "#FBF7EE",
          color: "#2C3327",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          A apărut o eroare
        </h1>
        <p style={{ color: "#6B7361", maxWidth: "28rem" }}>
          Îți mulțumim pentru răbdare. Te rugăm să reîncerci.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            borderRadius: "9999px",
            background: "#4C6B39",
            color: "#FBF7EE",
            padding: "0.75rem 1.75rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Reîncearcă
        </button>
      </body>
    </html>
  );
}
