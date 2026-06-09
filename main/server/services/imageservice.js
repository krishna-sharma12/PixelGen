const axios = require("axios");

const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const imageBase64 = Buffer.from(response.data).toString("base64");

    return `data:image/png;base64,${imageBase64}`;
  } catch (error) {
    console.log(
      error.response?.data?.toString() || error.message
    );
    throw error;
  }
};

module.exports = generateImage;