const serverURL = "http://localhost:3000";
// const serverURL = "https://daboiz-habit-tracker.herokuapp.com";

const body = document.querySelector("body");
body.id = "body";

// ***********Form fields
const loginFields = [
    {tag: "input", attributes: {type: "text", name: "username", placeholder: "Username", required: true}},
    {tag: "input", attributes: {type: "password", name: "password", placeholder: "Password", required: true}},
    {tag: "input", attributes: {type: "submit", value: "Login"}}
]

const registerFields = [
    {tag: "input", attributes: {type: "text", name: "username", placeholder: "Username", required: true}},
    {tag: "input", attributes: {type: "password", name: "password", placeholder: "Password", required: true}},
    {tag: "input", attributes: {type: "submit", value: "Register"}}
]

const frequencyFormFields = [
    {tag: "select", attributes: {name: "frequency", id: "frequencyFormSelect"}},
    {tag: "input", attributes: {type: "submit", value: "Update"}}
]

const frequencyFields = [
    {tag: "option", attributes: {value: "Daily"}},
    {tag: "option", attributes: {value: "Weekly"}},
    {tag: "option", attributes: {value: "Monthly"}}
]

const createFields = [
    {tag: "input", attributes: {type: "text", name: "habit", placeholder: "Enter habit", required: true}},
    {tag: "select", attributes: {name: "frequency", id: "frequencySelect"}},
    {tag: "input", attributes: {type: "submit", value: "Create"}}
]


// **********Page content
updateContent()

window.addEventListener('hashchange', updateContent);

function updateContent(){
    let hash = window.location.hash.substring(1);
    let hashBegin = hash.slice(0, 5);
    let hashEnd = hash.slice(5);
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
    } else if (hashBegin == "habit" && hashEnd >= 0) {
        clearPage();
        habitModal(hashEnd);
    } else if (hash == "create") {
        clearPage();
        createPage();
    }
}

function homePage() {
    const homeDiv = document.createElement('div');
    homeDiv.id = "homeDiv"
    body.appendChild(homeDiv);
    const header = document.createElement('h1');
    header.textContent = "HabitTrackerz";
    homeDiv.appendChild(header);
    const homeBtnDiv = document.createElement('div');
    homeBtnDiv.id = "homeBtnDiv"
    homeDiv.appendChild(homeBtnDiv);


    const loginBtnDiv = document.createElement('div');
    loginBtnDiv.className = "buttonContainer";
    homeBtnDiv.appendChild(loginBtnDiv)
    const loginButton = document.createElement("button")
    loginButton.className = "btn";
    loginButton.textContent = "Login";
    loginBtnDiv.appendChild(loginButton);
    loginButton.addEventListener("click", () => {window.location.hash = "login"})

    const registerBtnDiv = document.createElement('div')
    registerBtnDiv.className = "buttonContainer";
    homeBtnDiv.appendChild(registerBtnDiv)
    const registerButton = document.createElement("button")
    registerButton.className = "btn";
    registerButton.textContent = "Register";
    registerBtnDiv.appendChild(registerButton);
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
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        requestLogin(e)
    })
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
    // registerForm.onsubmit = requestRegistration;
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        requestRegistration(e)
    })
    registerDiv.appendChild(registerForm)
}

async function dashboard() {
    const dashboardDiv = document.createElement('div');
    body.appendChild(dashboardDiv);
    const header = document.createElement('h1');
    header.textContent = "Your dashboard:";
    dashboardDiv.appendChild(header);
    const habits = await userHabits(localStorage.getItem("username"));
    console.log("habits", habits);
    habits.forEach((h, index) => {
        const habit = document.createElement("button");
        habit.textContent = `${h.habit}`;
        habit.addEventListener("click", () => {window.location.hash = `habit${index}`})
        dashboardDiv.appendChild(habit);
    })
    const createButton = document.createElement('button');
    createButton.textContent = "+";
    createButton.addEventListener("click", () => {window.location.hash = "create"})
    dashboardDiv.appendChild(createButton);
    logoutButton();
}

async function habitModal(index) {
    const oneHabit = await singleHabit(localStorage.getItem("username"), index);
    const habitDiv = document.createElement('div');
    body.appendChild(habitDiv);
    const header = document.createElement('h1');
    header.textContent = oneHabit.habit;
    habitDiv.appendChild(header);
    const streak = document.createElement('h2');
    streak.textContent = `Completion streak: ${oneHabit.streak}`;
    habitDiv.appendChild(streak);
    const frequency = document.createElement('h2');
    frequency.textContent = `Frequency: ${oneHabit.frequency}`;
    habitDiv.appendChild(frequency);
    const completionButton = document.createElement('button');
    completionButton.textContent = `Complete`;
    completionButton.addEventListener("click", async (e) => {
        e.preventDefault()
        await completedHabit(localStorage.getItem("username"), index)
        updateContent()
    })
    habitDiv.appendChild(completionButton);

    const freqUpdateForm = document.createElement("form");
    frequencyFormFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        freqUpdateForm.appendChild(field);
    })
    habitDiv.appendChild(freqUpdateForm);

    const freqSelection = document.querySelector("#frequencyFormSelect");
    frequencyFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        field.textContent = f.attributes.value;
        freqSelection.appendChild(field);
    })
    if (oneHabit.frequency == "Daily"){
        freqSelection[0].setAttribute("selected", true)
    } else if (oneHabit.frequency == "Weekly") {
        freqSelection[1].setAttribute("selected", true)
    } else if (oneHabit.frequency == "Monthly") {
        freqSelection[2].setAttribute("selected", true)
    }
    freqUpdateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        await updateFrequency(localStorage.getItem("username"), index, e)
        updateContent()
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = `Delete`;
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        deleteHabit(localStorage.getItem("username"), index)
    })
    habitDiv.appendChild(deleteButton);
    backbutton("dashboard");
    logoutButton();
}

function createPage() {
    const createDiv = document.createElement('div');
    body.appendChild(createDiv);
    const createForm = document.createElement("form");
    createFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        createForm.appendChild(field);
    })
    createDiv.appendChild(createForm);
    const selectFreq = document.querySelector("#frequencySelect")
    console.log(selectFreq);
    frequencyFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        field.textContent = f.attributes.value;
        selectFreq.appendChild(field);
    })
    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        createHabit(localStorage.getItem("username"), e)
    });
    backbutton("dashboard");
    logoutButton();
}

function clearPage() {
    body.replaceChildren();
}

function backbutton(hash) {
    let backbutton = document.createElement("button")
    backbutton.textContent = `Back to ${hash}`;
    backbutton.addEventListener("click", () => {window.location.hash = hash})
    body.appendChild(backbutton);
}

function logoutButton() {
    let logoutbutton = document.createElement("button")
    logoutbutton.textContent = "Log out";
    logoutbutton.addEventListener("click", logout)
    body.appendChild(logoutbutton);
}

// ******** Requests

async function requestLogin(e){
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${serverURL}/auth/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

function login(data){
    const payload = jwt_decode(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', payload.username);
    window.location.hash = "dashboard";
}

function logout(){
    localStorage.clear();
    location.hash = 'login';
}


async function requestRegistration(e) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${serverURL}/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}


async function userHabits(username) {
    try {
        const options = {
            headers: new Headers({"Authorization": localStorage.getItem('token')})
        }
        const response = await fetch(`${serverURL}/users/${username}`, options);
        const data = await response.json();
        console.log("data", data)
        console.log("data[0].habits", data[0].habits)
        return data[0].habits;
    } catch (err) {
        console.warn(err);
    }
}

async function singleHabit(username, index) {
    try {
        const options = {
            headers: new Headers({"Authorization": localStorage.getItem('token')})
        }
        const response = await fetch(`${serverURL}/users/${username}/habits/${index}`, options);
        const data = await response.json();
        console.log("data", data)
        return data
    } catch (err) {
        console.warn(err);
    }
}


async function completedHabit(username, index) {
    console.log("completed habit");
    try {
        const options = {
            method: 'PATCH',
            headers: new Headers({"Authorization": localStorage.getItem('token')})
        }
        const response = await fetch(`${serverURL}/users/${username}/habits/${index}/completed`, options);
        // updateContent();
    } catch (err) {
        console.warn(err);
    }
}

async function createHabit(username, e) {
    try {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',  "Authorization": localStorage.getItem('token')},
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch(`${serverURL}/users/${username}/habits`, options);
        window.location.hash = "dashboard";
    } catch (err) {
        console.warn(err);
    }
}

async function updateFrequency(username, index, e) {
    try {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',  "Authorization": localStorage.getItem('token')},
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch(`${serverURL}/users/${username}/habits/${index}/frequency`, options);
        // updateContent();
    } catch (err) {
        console.warn(err);
    }
}


async function deleteHabit(username, index, e) {
    try {
        const options = {
            method: 'DELETE',
            headers: new Headers({"Authorization": localStorage.getItem('token')}),
        }
        const response = await fetch(`${serverURL}/users/${username}/habits/${index}`, options);
        window.location.hash = "dashboard";
    } catch (err) {
        console.warn(err);
    }
}

module.exports = {
    requestLogin,
    requestRegistration,
    userHabits,
    completedHabit,
    createHabit,
    updateFrequency,
    deleteHabit,
    singleHabit,
    homePage,
    clearPage,
    loginPage,
    registerPage,
    dashboard,
    createPage,
    backbutton,
    logoutButton,
    habitModal
}
