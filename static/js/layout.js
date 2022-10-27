// const serverURL = "http://localhost:3000";
const serverURL = "https://daboiz-habit-tracker.herokuapp.com";

const body = document.querySelector("body");
body.id = "body";

// ***********Form fields
const loginFields = [
    { tag: "input", attributes: { class: "textInput", type: "text", name: "username", placeholder: "Username", required: true } },
    { tag: "input", attributes: { class: "textInput", type: "password", name: "password", placeholder: "Password", required: true } },
    { tag: "input", attributes: { class: "greenButton", type: "submit", value: "Login" } }
]

const registerFields = [
    { tag: "input", attributes: { class: "textInput", type: "text", name: "username", placeholder: "Username", required: true } },
    { tag: "input", attributes: { class: "textInput", type: "password", name: "password", placeholder: "Password", required: true } },
    { tag: "input", attributes: { class: "greenButton", type: "submit", value: "Register" } }
]

const frequencyFormFields = [
    { tag: "select", attributes: { name: "frequency", id: "frequencyFormSelect" } },
    { tag: "input", attributes: { class: "greenButton", type: "submit", value: "Update" } }
]

const frequencyFields = [
    { tag: "option", attributes: { value: "Daily" } },
    { tag: "option", attributes: { value: "Weekly" } },
    { tag: "option", attributes: { value: "Monthly" } }
]

const createFields = [
    { tag: "input", attributes: { class: "textInput createHabit", type: "text", name: "habit", placeholder: "Enter habit", required: true } },
    { tag: "select", attributes: { name: "frequency", id: "frequencySelect" } },
    { tag: "input", attributes: { class: "greenButton", type: "submit", value: "Create" } }
]


// **********Page content
updateContent()

window.addEventListener('hashchange', updateContent);

function updateContent() {
    console.log("updateContent function");
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
    header.className = "logoHeader";
    header.textContent = "HabiTrackerz";
    homeDiv.appendChild(header);

    const homePageImgDiv = document.createElement('div');
    homePageImgDiv.id = "homePageImgDiv"
    homeDiv.appendChild(homePageImgDiv)
    const homePageImg = document.createElement('img');
    homePageImg.id = "homePageImg";
    homePageImg.src = 'static/js/img/homePageImg.png';
    homePageImgDiv.appendChild(homePageImg);

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
    loginButton.addEventListener("click", () => { window.location.hash = "login" })

    const registerBtnDiv = document.createElement('div')
    registerBtnDiv.className = "buttonContainer";
    homeBtnDiv.appendChild(registerBtnDiv)
    const registerButton = document.createElement("button")
    registerButton.className = "btn";
    registerButton.textContent = "Register";
    registerBtnDiv.appendChild(registerButton);
    registerButton.addEventListener("click", () => { window.location.hash = "register" })
}

function loginPage() {
    const loginPageDiv = document.createElement('div');
    loginPageDiv.id = "loginPageDiv"
    body.appendChild(loginPageDiv);

    const header = document.createElement('h1');
    header.className = "logoHeader";
    header.textContent = "HabiTrackerz";
    loginPageDiv.appendChild(header);

    header.addEventListener("click", () => { window.location.hash = "" })

    const loginDiv = document.createElement('div');
    loginDiv.id = "loginDiv";
    loginPageDiv.appendChild(loginDiv);

    const loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    const loginHeader = document.createElement('h1');
    loginHeader.textContent = "Login";
    loginForm.appendChild(loginHeader);
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
    const registerPageDiv = document.createElement('div');
    registerPageDiv.id = "registerPageDiv"
    body.appendChild(registerPageDiv);

    const headerDiv = document.createElement('div');
    headerDiv.class = "headerDiv"
    registerPageDiv.appendChild(headerDiv);

    const header = document.createElement('h1');
    header.className = "logoHeader";
    header.textContent = "HabiTrackerz";
    registerPageDiv.appendChild(header);

    header.addEventListener("click", () => { window.location.hash = "" })

    const registerDiv = document.createElement('div');
    registerDiv.id = "registerDiv";
    registerPageDiv.appendChild(registerDiv);

    const registerForm = document.createElement("form");
    registerForm.id = "registerForm"
    const registerHeader = document.createElement('h1');
    registerHeader.textContent = "Register";
    registerForm.appendChild(registerHeader);
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

    const header = document.createElement('h1');
    header.className = "logoHeader";
    header.id = "dashboardLogo"
    header.textContent = "HabiTrackerz";
    body.appendChild(header);

    header.addEventListener("click", () => { window.location.hash = "" })

    const dashboardDiv = document.createElement('div');
    dashboardDiv.id = "dashboardDiv"
    body.appendChild(dashboardDiv);
    const dashboardHeader = document.createElement('h1');
    dashboardHeader.id = "dashboardh1";
    dashboardHeader.textContent = "Your dashboard";
    dashboardDiv.appendChild(dashboardHeader);

    const dashboardDivGrid = document.createElement('div');
    dashboardDivGrid.id = "dashboardDivGrid";
    dashboardDiv.appendChild(dashboardDivGrid)
    const habits = await userHabits(localStorage.getItem("username"));
    console.log("habits", habits);
    habits.forEach((h, index) => {
        const habit = document.createElement("button");
        habit.id = "habitButton"
        habit.textContent = `${h.habit}`;
        habit.addEventListener("click", () => { window.location.hash = `habit${index}` })
        dashboardDivGrid.appendChild(habit);
        habit.className = "greenButton"
    })

    const createButton = document.createElement('button');
    const addImg = document.createElement('img');
    addImg.id = "addImg";
    addImg.src = "static/js/img/add.png"

    createButton.appendChild(addImg);
    createButton.addEventListener("click", () => {
        rotateImg();
        setTimeout(() => {
            window.location.hash = 'create';
        }, 1000);
    });
    function rotateImg() {
        document.getElementById("addImg").style.transform = "rotate(360deg)";
    }
    const dashboardFooter = document.createElement('div');
    dashboardFooter.id = "dashboardFooter";
    body.appendChild(dashboardFooter); dashboardFooter.appendChild(createButton);
    createButton.id = "habitButton";
    createButton.className = "createButton";
    logoutButton();
}

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function habitModal(index) {
    backbutton("dashboard");
    const oneHabit = await singleHabit(localStorage.getItem("username"), index);
    const habitDiv = document.createElement('div');
    habitDiv.id = "habitMainDiv";
    body.appendChild(habitDiv);


    const habitCard = document.createElement('div');
    habitCard.id = "habitCard";
    habitDiv.appendChild(habitCard)

    const headerDiv = document.createElement('div');
    headerDiv.id = "headerDiv";
    habitCard.appendChild(headerDiv)
    const header = document.createElement('h1');
    header.textContent = capitalise(oneHabit.habit);
    headerDiv.appendChild(header);
    
    function capitalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const streakContainer = document.createElement('div');
    streakContainer.id = "streakContainer";
    habitCard.appendChild(streakContainer);

    const completionStreakDiv = document.createElement('div');
    completionStreakDiv.id = "completionStreakDiv";
    streakContainer.appendChild(completionStreakDiv);

    const completeButtonDiv = document.createElement('div');
    completeButtonDiv.id = "completeButtonDiv";

    const streak = document.createElement('h2');
    streak.textContent = `Streak: ${oneHabit.streak}`;
    streak.id = "streak"
    completionStreakDiv.appendChild(streak);


const completionButton = document.createElement('button');
    completionButton.textContent = `Complete`;
    completionButton.addEventListener("click", async (e) => {
        e.preventDefault()
        await completedHabit(localStorage.getItem("username"), index)
        updateContent()
    })
    completionButton.className = "greenButton";
    completionButton.id = "habitCompleteButton";
    streakContainer.appendChild(completeButtonDiv);
    completeButtonDiv.appendChild(completionButton);

    const frequencyDiv = document.createElement('div');
    frequencyDiv.id = "frequencyDiv";
    habitCard.appendChild(frequencyDiv);

    const frequency = document.createElement('h2');
    frequency.textContent = `Frequency: ${oneHabit.frequency}`;
    frequency.id = "frequency";
    frequencyDiv.appendChild(frequency);

    const freqUpdateForm = document.createElement("form");
    frequencyFormFields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        freqUpdateForm.appendChild(field);
    })

    frequencyDiv.appendChild(freqUpdateForm);

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
    deleteButton.id = "deleteButton";
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault()
        deleteHabit(localStorage.getItem("username"), index)
    })
    deleteButton.className = "redButton"

    const deleteButtonDiv = document.createElement('div');
    deleteButtonDiv.id = "deleteButtonDiv";
    deleteButtonDiv.appendChild(deleteButton)
    habitCard.appendChild(deleteButtonDiv);
    logoutButton();
}

function createPage() {
    const createDiv = document.createElement('div');
    body.appendChild(createDiv);

    const createHabitHeader = document.createElement('h1');
    createHabitHeader.textContent = "Create habit:";
    createDiv.appendChild(createHabitHeader);

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
    backbutton.addEventListener("click", () => { window.location.hash = hash })
    body.appendChild(backbutton);
    backbutton.className = "redButton"
    backbutton.id = "backbutton"
}

function logoutButton() {
    let logoutbutton = document.createElement("button")
    logoutbutton.id = "dashboardLogout"
    logoutbutton.textContent = "Log out";
    logoutbutton.addEventListener("click", logout)
    const logoutFooter = document.createElement('div');
    logoutFooter.id = "logoutFooter";
    body.appendChild(logoutFooter);
    logoutFooter.appendChild(logoutbutton);
    logoutbutton.className = "redButton"
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
        if (data.err) { throw Error(data.err); }
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

function logout() {
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
        if (data.err) { throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}


async function userHabits(username) {
    try {
        const options = {
            headers: new Headers({ "Authorization": localStorage.getItem('token') })
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
            headers: new Headers({ "Authorization": localStorage.getItem('token') })
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
            headers: new Headers({ "Authorization": localStorage.getItem('token') })
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
            headers: new Headers({ "Authorization": localStorage.getItem('token') }),
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
    habitModal,
    capitalise
}
