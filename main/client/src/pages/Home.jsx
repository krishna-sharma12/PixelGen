import { useState } from "react";
import "./Home.css";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/image/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await response.json();
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h1>🎨 PixelGen AI</h1>
        <p>Create stunning AI-generated images instantly</p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Describe your image..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button onClick={generateImage}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {image && (
          <div className="image-container">
            <img src={image}    alt="Generated" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;