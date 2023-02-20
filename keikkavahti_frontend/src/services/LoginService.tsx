export async function loginApiCall(loginFormAsJson: string) {
  let url: string = "http://localhost:8000/users/post/login/";

  if (import.meta.env.PROD) {
    url = "YEAH WE'RE NOT HERE YET";
  }

  const response = await (
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: loginFormAsJson,
    })
  ).json();
  return response;
}
