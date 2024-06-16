export const base_url = "http://localhost:5000/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};





//export const config = () => {
//  const token = localStorage.getItem("token");
//
//  return {
//    headers: {
//      Authorization: token ? `Bearer ${token}` : "",
//      Accept: "application/json",
//    },
//  };
//};


