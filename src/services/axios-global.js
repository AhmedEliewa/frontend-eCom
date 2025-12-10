// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000";

//********* env */

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
