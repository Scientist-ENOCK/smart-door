const tenantForm = document.forms["form-tenant"];
const url = "https://huduma-api.herokuapp.com/tenants";
// const url = "http://localhost:3000/account";
const tenantBtn = document.querySelector("#addTenant");
const manageTenants = document.querySelector("#manageTenants");


console.log(manageTenants);

const displayMessage = (message, errorPlace) => {
  const node = document.createElement("p");
  const textNode = document.createTextNode(message);
  node.appendChild(textNode);
  document.getElementById(errorPlace).appendChild(node);
}

tenantBtn.addEventListener('click', () => {
    addTenant();
})

manageTenants.addEventListener('click', () => {
  window.location.replace('./manage-tenants.html');
})

const addTenant = async () => {
    try {
      const rawFetch = await fetch(url + "/add", {
          method : "post",
          headers : {
            'Content-type' : "application/json",
            'accept' : "application/json"
          },
          body : JSON.stringify(
            {
              name: tenantForm['name'].value,
              status : tenantForm['status'].value,
              email : tenantForm['email'].value,
              password : tenantForm['password'].value,
              duration : tenantForm['duration'].value,
              endDuration : tenantForm['endDuration'].value,
              mobile : tenantForm['mobile'].value,
            }
          )
      });  
      const response = await rawFetch.json();
      if(response.success){
       return displayMessage(response.message, 'success');
      }
      displayMessage(response.message, 'error');  
    } catch (error) {
      displayMessage("Oops, something went wrong", 'error');
        console.log(error);
    }
}

const getTenants = async () => {
  try {
    const rawFetch = await fetch(url + "/all", {
        method : "get",
        headers : {
          'Content-type' : "application/json",
          'accept' : "application/json"
        }
    });  
    const response = await rawFetch.json();
    if(response.success){
      response.tenants.forEach(tenant => {
        const row = document.createElement('tr');
          const tdName = document.createElement('td').appendChild(document.createTextNode(tenant.name))
          row.appendChild(tdName);
      });
      
      table.appendChild()
        return;
    }
    console.log(response);
    displayMessage(response.message, 'error');  
  } catch (error) {
    displayMessage("Oops, something went wrong", 'error-login');
      console.log(error);
  }
}
