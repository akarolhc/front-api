import axios from "axios";

export const translateText = async (text) => {
  const response = await axios.post(
    `https://api.mymemory.translated.net/get?q=${text}&langpair=en|pt`
  );
  return response.data;
};