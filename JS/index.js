var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");
var usersList = [];
var alertMessage = document.querySelector("#alertMessage")
var signUpBtn = document.querySelector("#signUpBtn");
var logInBtn = document.querySelector("#logInBtn");
var logOutBtn = document.querySelector("#logOutBtn");
var welcomeMassage = document.querySelector("#welcomeMassage");
var requiredInputs = document.querySelector("#requiredInputs");


if (localStorage.getItem('usersList') != null) {
    usersList = JSON.parse(localStorage.getItem("usersList"))
    console.log(usersList);
} else {
    usersList = [];
    console.log(usersList);
}


function signUp() {
    if (ValidateEmail() && validateName() && validatePassword()) {
        var user = {
            Name: userName.value,
            email: userEmail.value,
            password: userPassword.value
        }
        if (userName == '' || userEmail.value == '' || userPassword.value == '' || checkEmailExist(usersList)) {
            if (userName == '' || userEmail.value == '' || userPassword.value == '') {
                showAlertMessage('All inputs required', 'text-danger');
            }
            if (checkEmailExist(usersList) != null) {
                showAlertMessage('email is already exist', 'text-danger');
            }
        }
        else {
            showAlertMessage('Success', 'text-success')
            usersList.push(user);
            localStorage.setItem("usersList", JSON.stringify(usersList));
        }
    }
    else {
        console.log(userName.value, userEmail.value, userPassword.value);
        showAlertMessage('Invalide Name or Email or Password', 'text-danger');
    }
}

function checkEmailExist(list) {
    for (var i = 0; i < usersList.length; i++) {
        if (list[i].email == userEmail.value) {
            return list[i].email;
        }
    }
}

function clearForm() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
}

function showAlertMessage(mess, textColor) {
    alertMessage.innerHTML = mess;
    alertMessage.setAttribute("class", "d-block")
    alertMessage.classList.add(`${textColor}`);
}
if (signUpBtn != null) {
    signUpBtn.addEventListener('click', function () {
        signUp();
        clearForm();
    })
}
if (logInBtn != null) {
    logInBtn.addEventListener("click", function () {
        for (var i = 0; i < usersList.length; i++) {
            if (userEmail.value == '' || userPassword.value == '') {
                showAlertMessage('All inputs required', 'red')
            } else if (usersList[i].email == userEmail.value && usersList[i].password == userPassword.value) {
                localStorage.setItem('userName', JSON.stringify(usersList.Name));
                window.location.href = 'home.html'
                if (welcomeMassage != null) {
                    var user = JSON.parse(localStorage.getItem('userName'));
                    welcomeMassage.innerHTML = 'welocme  ' + user;
                }
            } else {
                showAlertMessage('Email or password not correct', 'red')
            }

        }
    }
    )
}
if (logOutBtn != null) {
    logOutBtn.addEventListener("click", function () {
        logOut();
    })
}



function logOut() {
    window.location.href = "registration.html";
}


function ValidateEmail() {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(userEmail.value)) {
        return true;
    } else {
        return false;
    }

}

function validateName() {
    let regex = /^[A-Z][a-z]{3,8}$/
    if (regex.test(userName.value)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword() {
    let regex = /^[A-Za-z]\w{7,14}$/
    if (regex.test(userPassword.value)) {
        return true;
    } else {
        return false;
    }
}

userName.addEventListener("focus", function () {
    requiredInputs.classList.replace("d-none", "d-block")
})