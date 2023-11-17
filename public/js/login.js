
const email = document.querySelector("#signup-email").value.trim()
const password = document.querySelector("#signup-password").value.trim()
const nameY = document.querySelector("#signup-name").value.trim()
async function signupHandler(e){
  e.preventDefault()
  try {
    const response = await fetch('/api/users',{
      method:"POST",
      body:JSON.stringify({email,password,name:nameY}),
      headers:{"Content-Type":"application/json"}
    })
    if(response.ok){
      console.log("signup-successful")
      document.location.replace("/")
    }else{
      alert(response.statusText)
    }
  } catch (error) {
    
  }
}
document.getElementById("sign-up-form").addEventListener("submit",signupHandler)