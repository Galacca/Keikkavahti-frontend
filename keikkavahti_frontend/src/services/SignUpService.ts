import { devOrProd } from "../utils/UrlUtils";

export const signUpApiCall = async (signUpFormAsJson: string) => {
  const url: string = devOrProd() + "/users/post/signup";

  const response = await (
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: signUpFormAsJson,
    })
  ).json();
  return response;
};
