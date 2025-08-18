// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{ 
      marginTop: "2rem", 
      padding: "1rem", 
      textAlign: "center", 
      borderTop: "1px solid #ccc", 
      fontSize: "0.9rem" 
    }}>
      <p>
        Built with ❤️ by Mini Market Predictor |{" "}
        <a href="mailto:etapsell@gmail.com" style={{ color: "#0070f3" }}>
          Contact Us
        </a>
      </p>
    </footer>
  );
}
