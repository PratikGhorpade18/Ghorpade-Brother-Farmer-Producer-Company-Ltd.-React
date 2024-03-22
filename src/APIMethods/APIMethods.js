 

  //Method for With Json Converted body
export const postAPICall = (api, body) => {
    debugger
 return fetch(api, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
   },
  body: JSON.stringify(body),
 }).then((respone) => respone.json());
};

export const getAPICall = (api) => {
  const Token = sessionStorage.getItem("Authorize");
  console.log(Token);
  return fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Token,
    },
  }).then((respone) => respone.json());
};
