const body = document.querySelector("body");


// ***********Form fields
const loginFields = [
    {tag: "input", attributes: {type: "text", name: "username", placeholder: "Username", required: true}},
    {tag: "input", attributes: {type: "text", name: "password", placeholder: "Password", required: true}},
    {tag: "input", attributes: {type: "submit", value: "Login"}}
]

const registerFields = [
    {tag: "input", attributes: {type: "text", name: "username", placeholder: "Username", required: true}},
    {tag: "input", attributes: {type: "text", name: "password", placeholder: "Password", required: true}},
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
    loginForm.onsubmit = requestLogin;
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
    registerForm.onsubmit = requestRegistration;
    registerDiv.appendChild(registerForm)
}

function dashboard() {
    const dashboardDiv = document.createElement('div');
    body.appendChild(dashboardDiv);
    const header = document.createElement('h1');
    header.textContent = "Your dashboard:";
    dashboardDiv.appendChild(header);
    const habits = userHabits(localStorage.getItem(username));
    habits.forEach(h => {
        const habit = document.createElement("button");
        habit.textContent = `${h.name}`;
        dashboardDiv.appendChild(habit);
    })
}

function clearPage() {
    body.replaceChildren();
}


// ******** Requests

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

function login(data){
    // localStorage.setItem('username', data.user);
    const payload = jwt_decode(data.token);
    // console.log(payload, "payload");
    // console.log(data, "data");
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', payload.username);
    // location.hash = '#feed';
    wondow.location.hash = "dashboard";
}

// async function requestLogin(e) {
//     e.preventDefault();
//     console.log("logging in");
//     window.location.hash = "dashboard"
// }

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`http://localhost:3000/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

// async function requestRegistrastion(e) {
//     e.preventDefault();
//     console.log("registering");
//     window.location.hash = "dashboard"
// }

async function userHabits(username) {
    // console.log("get all habits");
    try {
        const options = {
            headers: new Headers({"Authorization": localStorage.getItem('token')})
        }
        const response = await fetch(`http://localhost:3000/${username}`, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}


