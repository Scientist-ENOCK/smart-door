const registerForm = document.forms["form-register"];
const loginForm = document.forms["form-login"];
const url = "http://localhost:3000/account";

const registerBtn = document.querySelector("#registerBtn");
const loginBtn = document.querySelector("#loginBtn");


registerBtn.addEventListener('click', () => {
    registerCustomer();
})

const registerCustomer = async () => {
    const formData = new FormData();
    formData.append('firstname', registerForm['firstname'].value);
    formData.append('lastname', registerForm['lastname'].value);
    formData.append('email', registerForm['email'].value);
    formData.append('password', registerForm['password'].value);
    formData.append('mobile', registerForm['mobile'].value);
    // console.log();
    try {
      const rawFetch = await fetch(url + "/signup", {
          method : "post",
          body : formData
      });  
      const response = await rawFetch.json();
      if(response.success){
        container.classList.remove("right-panel-active");
      }
      console.log(response);
    } catch (error) {
        console.log(error);
    }
}
