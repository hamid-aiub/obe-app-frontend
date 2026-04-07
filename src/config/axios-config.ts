// import { bearerToken } from "@/helpers/authHelper";
import axios from "axios";
import { z } from "zod";
import { iAxios } from "../interfaces/axios.interface";

export const axiosInstance = axios.create({
  // baseURL: config.BACKEND_API_BASE_URL + "/api",
  baseURL: "/api",
  // withCredentials: true,
  // crossDomain: true
});

export const getAxios = <T extends z.ZodTypeAny>(
  info: iAxios<any | FormData, any>,
  responseSchema: T | null = null,
): Promise<z.infer<T>> => {
  // console.log({info});
  return new Promise((resolve, reject) => {
    const { url, params = {}, data = {}, method = "get" } = info;
    // const withCredentials = true;

    let dataType = "application/json";

    // console.log("Data type:", data instanceof FormData);
    // console.log("Data type:", data.get("file"));

    if (data instanceof FormData) {
      dataType = "FormData";
    }
    // const tenant = getCurrentUserTenants();
    const headers = {
      //   Authorization: "Bearer " + bearerToken(),
      //'Content-Type': "application/json;charset=UTF-8",
      // "x-tenant": getCurrentUserTenants(),
      "Content-Type":
        dataType === "FormData"
          ? "multipart/form-data"
          : "application/json;charset=UTF-8",
    };

    // axiosInstance.withCredentials = true;
    //console.log("Axios data:",headers)
    axiosInstance
      .request({ method, url, data, headers, params })
      .then((response) => {
        resolve(
          !!responseSchema
            ? responseSchema.parse(response.data)
            : response.data,
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const API_SERVICE = axios.create({
  // Use Next.js rewrite proxy (/api -> backend) to avoid browser CORS issues.
  baseURL: "/api",
});
