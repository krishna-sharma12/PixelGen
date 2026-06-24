
const Image = require("../models/Image");
const axios = require("axios");

const generateImage = async (prompt, userId) => {
  try {

    const response = await axios.post(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      });

    const imageBase64 =
      Buffer.from(response.data).toString("base64");

    const imageurl =
      `data:image/png;base64,${imageBase64}`;

    const image = new Image({
      userId,
      prompt,
      imageUrl: imageurl
    });
    console.log(image);

    await image.save();

    return imageurl;

  } catch (error) {
    console.log(
      error.response?.data?.toString() || error.message
    );
    throw error;
  }
};
const getUserImagesHistory = async (userId) =>{
  const images = await Image.find({ userId });
  return images;
}

module.exports = {
  generateImage,
  getUserImagesHistory
};