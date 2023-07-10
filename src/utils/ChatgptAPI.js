import axios from "axios";
import eventEmitter from "./eventEmitter";

export const sendMessageApi = async (newMessages) => {
  try {
    console.log("Sending request...");
    console.log(process.env.REACT_APP_GATEWAY_URL);
    const response = await axios.post(
      `${process.env.REACT_APP_GATEWAY_URL}/api/chat`,
      { messages: newMessages },
      { timeout: 30000 }
    );
    console.log("Response received:", response);

    return response.data.message;
  } catch (error) {
    console.error("Error occurred during the API call: ", error);
    const message = error.message || "Error";
    eventEmitter.emit("apiError", message);
    return null;
  }
};
