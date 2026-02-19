const username = document.getElementById("username");
const feedback = document.getElementById("feedback");
const form = document.getElementById("registerForm");

let isUsernameValid = false;

let timeout=null;

username.addEventListener("input",()=>{
    clearTimeout(timeout);

    const usrname = username.value.trim();

    if(usrname.length === 0){
        feedback.textContent = "";
        return;
    }

    timeout = setTimeout(() => {
        checkUsername(usrname);
    }, 500);
});

async function checkUsername(usrname){
    feedback.textContent = "Checking availability...";
    feedback.className = "loading";
    isUsernameValid = false;

    try {
        const response = await fetch("users.json");
        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1000));

        if(data.users.includes(usrname.toLowerCase())){
            feedback.textContent = "Username is already taken.";
            feedback.className = "error";
            isUsernameValid = false;
        }

        else{
            feedback.textContent = "Username is available.";
            feedback.className = "success";
            isUsernameValid = true;
        }
    }catch(error){
        feedback.textContent = "Error checking username.";
        feedback.className = "error";
        isUsernameValid = false;
    }
}

form.addEventListener("submit",(e)=>{
    if(!isUsernameValid){
        e.preventDefault();
        alert("Please choose a valid username before submitting.");
    }
});