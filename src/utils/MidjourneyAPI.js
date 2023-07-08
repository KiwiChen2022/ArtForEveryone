import axios from "axios";

export const createImage = async (prompt) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GATEWAY_URL}/api/imagine`,
      { prompt: prompt }
    );
    console.log(response.data);
    return response.data.taskId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTaskResult = async (taskId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GATEWAY_URL}/api/result`,
      { taskId: taskId }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const upscaleImage = async (taskId, position) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GATEWAY_URL}/api/upscale`,
      {
        taskId: taskId,
        position: position,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
