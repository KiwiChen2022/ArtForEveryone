import axios from "axios";

export const createImage = async (prompt) => {
  try {
    const response = await axios.post("/imagine", { prompt: prompt });
    console.log(response.data);
    return response.data.taskId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTaskResult = async (taskId) => {
  try {
    const response = await axios.post("/result", { taskId: taskId });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
