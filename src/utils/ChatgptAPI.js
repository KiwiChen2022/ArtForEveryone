import axios from "axios";

export const sendMessageApi = async (newMessages) => {
  try {
    console.log("Sending request...");
    const response = await axios.post(
      "/api/chat",
      { messages: newMessages },
      { timeout: 30000 }
    );
    console.log("Response received:", response);

    return response.data.message;
  } catch (error) {
    console.error("Error occurred during the API call: ", error);
    return null;
  }
};
