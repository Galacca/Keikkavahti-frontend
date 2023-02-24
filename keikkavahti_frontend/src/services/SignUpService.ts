export const signUpApiCall = async (signUpFormAsJson: string) => {
  let url: string = "http://localhost:8000/users/post/signup/";

  if (import.meta.env.PROD) {
    url = "YEAH WE'RE NOT HERE YET";
  }

  const response = await (
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: signUpFormAsJson,
    })
  ).json();
  return response;
}
