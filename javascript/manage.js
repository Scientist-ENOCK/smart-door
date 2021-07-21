const url = "https://huduma-api.herokuapp.com/tenants";
const fetchTenants = document.querySelector("#reload")

const displayMessage = (message, errorPlace) => {
  const node = document.createElement("p");
  const textNode = document.createTextNode(message);
  node.appendChild(textNode);
  document.getElementById(errorPlace).appendChild(node);
}

window.onload = () => {
    console.log('hello');
    getTenants();
}
fetchTenants.addEventListener('click', () => {
    getTenants();
})
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
    console.log(response.tenants);
    if(response.success){
      response.tenants.forEach(tenant => {
        // const row = document.createElement('tr');
        //   const tdName = document.createElement('td').appendChild(document.createTextNode(tenant.name))
        //   row.appendChild(tdName);
          const newRow = document.querySelector("#table").insertRow(-1);
          newRow.insertCell(0).appendChild(document.createTextNode(tenant.name))
          newRow.insertCell(1).appendChild(document.createTextNode(tenant.email))
          newRow.insertCell(2).appendChild(document.createTextNode(tenant.mobile))
          newRow.insertCell(3).appendChild(document.createTextNode(tenant.duration))
          newRow.insertCell(4).appendChild(document.createTextNode(tenant.endDuration))
          newRow.insertCell(5).appendChild(document.createTextNode(tenant.status))
        //   newRow.appendChild(tdName);
        //   document.querySelector("#looped-tenants").appendChild(row);
      });
        return;
    }
    console.log(response);
    displayMessage(response.message, 'error');  
  } catch (error) {
    displayMessage("Oops, something went wrong", 'error-login');
      console.log(error);
  }
}
