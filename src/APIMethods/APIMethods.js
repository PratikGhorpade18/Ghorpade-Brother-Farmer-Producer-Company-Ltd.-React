 

  //Method for With Json Converted body
export const postAPICall = (api, body) => {
     
 return fetch(api, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
   },
  body: JSON.stringify(body),
 }).then((respone) => respone.json());
};
//Method for Without Json Converted body
export const postStringAPICall = (api, body) => {debugger
  const Token = sessionStorage.getItem("Authorize");
  return fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Token,
     },
    body: JSON.stringify(body),
    mode:"no-cors"
  }).then((respone) => respone.json())
  
};

export const getAPICall = (api) => {
  const Token = sessionStorage.getItem("Authorize");

  return fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Token,
    },
 
  }).then((respone) => respone.json());
};

export const putAPICall = (api, body) => {
  debugger
  const Token = sessionStorage.getItem("Authorize");
  return fetch(api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Token,
     },
    body: JSON.stringify(body),
    // mode:"no-cors"
  }).then((respone) => respone.json());
};
export const deleteAPICall = (api) => {
  debugger
  const Token = sessionStorage.getItem("Authorize");
  return fetch(api, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + Token,
     },
    // mode:"no-cors"
  }).then((respone) => respone.json());
};
