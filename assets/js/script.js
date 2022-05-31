//validate form
const validate = {
    password: {
        length: "Password length must be atleast 8 characters",
        lowerCase: "Password must contain at least one lowercase letter",
        upperCase: "Password must contain at least one uppercase letter",
    },
    username: {
        length: "Username length must be atleast 3 characters"
    }
}

const storage = "user";
const userLogin = "userLogin";

//inputs
const fullnameInput = document.getElementById("fullname");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const usernameLogin = document.getElementById("usernameLogin");
const usernameRegister = document.getElementById("usernameLogin");

//form
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

//nav
const account = document.querySelector(".navbar-nav");


//Local storage get function
function localStorageGet(key) {
    return JSON.parse(localStorage.getItem(key));
}
//Local storage set function
function localStorageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

let userState = [];
let userLoginData = {};

if (localStorageGet(userLogin)) {
    userLoginData = localStorageGet(userLogin);
}

if (localStorageGet(storage)) {
    userState = localStorageGet(storage);
}

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    let user = userState?.find((u) =>
        data.username == u.username &&
        data.password == u.password);
    if (user) {
        sessionStorage.setItem("isLogin", true);
        location.pathname = "home.html";
        localStorageSet(userLogin, user);
    } else {
        alert("Username or password is wrong");
    }
});

registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    if (!CheckUsername(data.username)) {
        userState.push(data);
        localStorageSet(storage, userState);
        window.location.pathname = "sign-in.html";
        registerForm.reset();
    } else {
        alert("Already exsist");
    }
});


//Check username
function CheckUsername(username) {
    return userState.find((user) => user.username == username);
}

//Validation Input
function validateInput(input, regex, message) {
    const newRegex = new RegExp(regex);
    if (newRegex.test(input?.value)) {
        return true;
    } else {
        if (input?.nextElementSibling?.tagName.toLowerCase() == "span") {
            input.nextElementSibling.innerText = message;
        }
    }
    return false;
};

//validate inputs
passwordInput?.addEventListener('keyup', function () {
    if (validateInput(this, /.{8,}/, validate.password.length) &&
        validateInput(this, /.*[A-Z]/, validate.password.upperCase) &&
        validateInput(this, /.*[a-z]/, validate.password.lowerCase)) {
        this.nextElementSibling.innerText = "";
    }
});

usernameInput?.addEventListener('keyup', function () {
    if (validateInput(this, /.{3,}/, validate.username.length)) {
        this.nextElementSibling.innerText = "";
    }
});

//Navbar write html
(() => {
    if (sessionStorage.getItem("isLogin") != "true" || !localStorageGet(userLogin)) {
        account.innerHTML = ` <li class="nav-item">
                                    <a class="nav-link text-light" href = "sign-in.html">
                                        Login
                                    </a>
                                    </li >
                              <li class="nav-item">
                                    <a class="nav-link text-light p-2" href="sign-up.html">
                                        Register
                                    </a>
                             </li>`
    } else {
        account.innerHTML = `<li class="nav - item">
                                    ${userLoginData.fullname}
                            </li >`
    }
})();

// if (window.location.pathname == "/sign-in.html" && sessionStorage.getItem("isLogin") == "true") {
//     window.pathname = "home.html";
// }
