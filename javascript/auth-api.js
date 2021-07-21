const registerForm = document.forms["form-register"];
const loginForm = document.forms["form-login"];
const url = "https://huduma-api.herokuapp.com/account";

const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");


const displayMessage = (message, errorPlace) => {
  const node = document.createElement("p");
  const textNode = document.createTextNode(message);
  node.appendChild(textNode);
  document.getElementById(errorPlace).appendChild(node);
}

registerBtn.addEventListener('click', () => {
    registerCustomer();
})
loginBtn.addEventListener('click', () => {
  authorize();
})


const registerCustomer = async () => {
    // const formData = new FormData();
    // formData.append('firstname', registerForm['firstname'].value);
    // formData.append('lastname', registerForm['lastname'].value);
    // formData.append('email', registerForm['email'].value);
    // formData.append('password', registerForm['password'].value);
    // formData.append('mobile', registerForm['mobile'].value);
    // console.log();
    // registerBtn.
    try {
      const rawFetch = await fetch(url + "/signup", {
          method : "post",
          headers : {
            'Content-type' : "application/json",
            'accept' : "application/json"
          },
          body : JSON.stringify(
            {
              firstname: registerForm['firstname'].value,
              lastname : registerForm['lastname'].value,
              email : registerForm['email'].value,
              password : registerForm['password'].value,
              mobile : registerForm['mobile'].value
            }
          )
      });  
      const response = await rawFetch.json();
      if(response.success){
       return container.classList.remove("right-panel-active");
      }
      console.log(response);
      displayMessage(response.message, 'error');  
    } catch (error) {
      displayMessage("Oops, something went wrong", 'error');
        console.log(error);
    }
}

const authorize = async () => {
  try {
    const rawFetch = await fetch(url + "/login", {
        method : "post",
        headers : {
          'Content-type' : "application/json",
          'accept' : "application/json"
        },
        body : JSON.stringify(
          {
            email : loginForm['email'].value,
            password : loginForm['password'].value,
          }
        )
    });  
    const response = await rawFetch.json();
    if(response.isLoggedIn){
    //  return container.classList.remove("right-panel-active");
    window.location.replace('./dashboard.html');
    return localStorage.setItem('customer', JSON.stringify(response));
    }
    console.log(response);
    displayMessage(response.message, 'error-login');  
  } catch (error) {
    displayMessage("Oops, something went wrong", 'error-login');
      console.log(error);
  }
}