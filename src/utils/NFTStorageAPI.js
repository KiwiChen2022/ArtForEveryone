import axios from "axios";

export const uploadNFT = async (imageURL, name, description) => {
  try {
    const response = await axios.post("/upload", {
      imageURL,
      name,
      description,
    });
    console.log(response.data);
    return response.data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
