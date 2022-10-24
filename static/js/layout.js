const body = document.querySelector("body");


// ***********Form fields
const loginFields = [
    {tag: "input", attributes: {type: "text", name: "username", placeholder: "Username"}},
    {tag: "input", attributes: {type: "text", name: "password", placeholder: "Password"}},
    {tag: "input", attributes: {type: "submit", value: "Login"}}
]

const registerFields = [
    {tag: "input", attributes: {type: "text", name: "username", placeholder: "Username"}},
    {tag: "input", attributes: {type: "text", name: "password", placeholder: "Password"}},
    {tag: "input", attributes: {type: "submit", value: "Register"}}
]


// **********Page content
updateContent()

window.addEventListener('hashchange', updateContent);

function updateContent(){
    console.log("updateContent function");
    let hash = window.location.hash.substring(1);
    if (!hash) {
        clearPage();
        homePage();
    } else if (hash == "login") {
        clearPage();
        loginPage();
    } else if (hash == "register") {
        clearPage();
        registerPage();
    } else if (hash == "dashboard") {
        clearPage();
        dashboard();
    }
}

function homePage() {
    const homeDiv = document.createElement('div');
    body.appendChild(homeDiv);
    const header = document.createElement('h1');
    header.textContent = "Welcome to HabitTrackerz";
    homeDiv.appendChild(header);
    const loginButton = document.createElement("button")
    loginButton.textContent = "Login";
    homeDiv.appendChild(loginButton);
    loginButton.addEventListener("click", () => {window.location.hash = "login"})
    const registerButton = document.createElement("button")
    registerButton.textContent = "Register";
    homeDiv.appendChild(registerButton);
    registerButton.addEventListener("click", () => {window.location.hash = "register"})
}

function loginPage() {
    const loginDiv = document.createElement('div');
    body.appendChild(loginDiv);
    const loginForm = document.createElement("form");
    loginFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        loginForm.appendChild(field);
    })
    loginForm.onsubmit = login;
    loginDiv.appendChild(loginForm)
}

function registerPage() {
    const registerDiv = document.createElement('div');
    body.appendChild(registerDiv);
    const registerForm = document.createElement("form");
    registerFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        registerForm.appendChild(field);
    })
    registerForm.onsubmit = register;
    registerDiv.appendChild(registerForm)
}

function dashboard() {
    const dashboardDiv = document.createElement('div');
    body.appendChild(dashboardDiv);
    const header = document.createElement('h1');
    header.textContent = "Your dashboard:";
    dashboardDiv.appendChild(header);
}

function clearPage() {
    body.replaceChildren();
}


// ******** Requests

async function login(e) {
    e.preventDefault();
    console.log("logging in");
    window.location.hash = "dashboard"
}

async function register(e) {
    e.preventDefault();
    console.log("registering");
    window.location.hash = "dashboard"
}

async function allHabits(e) {
    e.preventDefault();
    console.log("get all habits");
}


