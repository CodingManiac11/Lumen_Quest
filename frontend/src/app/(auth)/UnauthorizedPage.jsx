"use client";
import { useRouter } from "next/navigation";

function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "5rem",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#d9534f" }}>🚫 Access Denied</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "1rem" }}>
        You do not have permission to view this page.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Go to Home
        </button>

        <button
          onClick={() => router.push("/auth/login")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#6c757d",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login Again
        </button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
