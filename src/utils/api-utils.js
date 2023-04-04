import axios from "axios";

function getData(url, setState) {
  axios
    .get(url)
    .then((response) => {
      setState(response.data);
    })
    .catch((error) => {
      console.error(
        "We are having a problem accessing the posts API: " + error
      );
    });
}

export { getData };
