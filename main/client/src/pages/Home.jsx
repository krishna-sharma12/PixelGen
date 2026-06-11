import { useState } from "react";
function Home() {
  const [prompt, setPrompt] = useState("");
const [image, setImage] = useState("");


const generateImage = async () => {
  console.log("Generate function called");

  try {
    const response = await fetch(
      "https://cuddly-space-capybara-699wgr7wr5q734464-5000.app.github.dev/api/image/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    setImage(data.image);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h1>PixelGen AI</h1>

      <input
         type="text"
         placeholder="Enter prompt..."
         value={prompt}
         onChange={(e) => setPrompt(e.target.value)}
      /><br></br>
<br></br>
      <button onClick={generateImage}>
        Generate Image
      </button>
      {image && (
        <img
          src={image}
          alt="Generated"
          width="500"
        />
      )}
    </div>
  );
}

export default Home;