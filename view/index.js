import axios from "axois";

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const age = document.querySelector("#age");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

/*const apiRequest = () => {
    axios.post('/signup', {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      email: email.value,
      password: password.value
    })
  .then((response) => document.querySelector("h6").innerHTML = response)
  .then(response => console.log(response))
}

document.querySelector("button").addEventListener("click", apiRequest);*/