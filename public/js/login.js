const email = document.querySelector("#InputEmail").value.trim()
const nameFirst = document.querySelector("#InputFName").value.trim()
const nameLast = document.querySelector("#InputLName").value.trim()
const inputPassword = document.querySelector("#InputPassword").value.trim()
const confirmPassword = document.querySelector("#ConfirmPassword").value.trim()
async function signupHandler(e){
    e.preventDefault()
    if(!checkMatchingPasswordInputs())return
    try{
        const response = await fetch('/api/users', {
            method:"POST",
            body: JSON.stringify({ email, inputPassword, confirmPassword, nameFirst, nameLast}),
            headers: {"Content-Type":"application/json"}
        })
        if(response.ok){
            console.log("signup-successful")
            document.location.replace("/")
        } else {
            alert(response.statusText)
        }
    } catch (error) {
        console.error(error)
    }
}

function checkMatchingPasswordInputs(){
    if (inputPassword === confirmPassword){
        return true
    } else {
        alert("Passwords do not match!")
        return false
    }
}

document.getElementById("sign-up-form").addEventListener("submit", signupHandler)