import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

/** another way */

// import axios from "axios";

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
