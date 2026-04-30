import axios from "axios";

const axoisInstance = axios.create({ baseUrl: "http://localhost:3000" });

export { axoisInstance };
