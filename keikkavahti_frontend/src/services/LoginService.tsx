export const loginApiCall = async (loginFormAsJson: string) => {
  let url: string = "http://localhost:8000/users/post/login";

  if (import.meta.env.PROD) {
    url = "https://keikkavahtibackend-env.eba-gbx8gbvm.eu-north-1.elasticbeanstalk.com/users/post/login";
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
