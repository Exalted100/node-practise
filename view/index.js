import axios from "axois";

axios({
    method: 'post',
    url: '/signup',
    data: {
      firstName: 'Finn',
      lastName: 'Williams'
    }
  });

document.querySelector("button").addEventListener("onclick", )