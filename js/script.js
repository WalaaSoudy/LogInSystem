var Name = document.getElementById('Name')
var Email = document.getElementById('Email')
var Password = document.getElementById('Password')
var login = document.getElementById('login')
var signup = document.getElementById('signup')
var message = document.getElementById('message')
var header = document.getElementById('header')

var index;
var users=[];
checkLocalStorage();
if (header != null) {
    header.innerHTML = `Welcome, ${users[index].name}`;
}



if (signup != null) {
    function signupEvent(e) {
        e.preventDefault();
        if (Name.value == "" || Email.value == "" || Password.value == "") {
            displayMessage("All inputs are required", "text-danger")
        } else if (validEmail(Email.value)) {

            const checkEmail = checksignup();
            if (checkEmail) {
                displayMessage("You have already an account with this email!", "text-danger");
            } else {
                const user = {
                    name: Name.value,
                    email: Email.value,
                    password: Password.value
                }
                users.push(user);
                displayMessage("Success", "text-success");
                clearDate();
                updateData();
            }

        } else {
            displayMessage("Your email is not valid. Try again!", "text-danger");
        }
    }


    function checksignup() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == Email.value) {
                return true;
            }
        }
        return false;
    }

    function validEmail(email) {
        const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return patternEmail.test(email);
    }

    function clearDate() {
        Name.value = "";
        Email.value = "";
        Password.value = "";
    }

    function updateData() {
        localStorage.setItem("users", JSON.stringify(users));
    }

}


if (login != null) {
    function loginEvent(e) {
        
        if (Email.value == "" || Password.value == "") {
            displayMessage("All inputs are required", "text-danger")
        } else if (users.length == 0) {
            displayMessage("This account is not found. Sign up, please!", "text-danger")
        } else {
            index = getUser();
            localStorage.setItem("index", JSON.stringify(index));
            if (index != -1) {
                window.open("home.html", "_self");
            }
        }
    }


    function getUser() {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == Email.value) {
                if (users[i].password == Password.value) {
                    displayMessage("Success", "text-success");
                    return i;
                } else {
                    displayMessage("Your password is not correct!", "text-danger");
                    return -1;
                }
            }
        }

        displayMessage("This account is not found. Sign up, please!", "text-danger")
        return -1;
    }
}



function checkLocalStorage() {
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
    }
    if (localStorage.getItem("index")) {
        index = JSON.parse(localStorage.getItem("index"));
    }
}



function displayMessage(text, color) {
    message.innerHTML = text;
    message.classList.remove("text-danger", "text-success");
    message.classList.add(color, "fw-semibold");
}