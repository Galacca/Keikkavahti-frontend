import { devOrProd } from "../utils/UrlUtils";

export const loginApiCall = async (loginFormAsJson: string) => {
  const url: string = devOrProd() + "/users/post/login";

  const response = await (
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: loginFormAsJson,
    })
  ).json();
  return response;
};
