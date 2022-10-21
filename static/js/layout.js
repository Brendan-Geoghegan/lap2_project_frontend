updateContent()

window.addEventListener('hashchange', updateContent);

function updateContent(){
    let hash = window.location.hash.substring(1);
    if (!hash) {
        homePage();
    } else if (hash = "login") {
        loginPage()
    }
}

function homePage() {
    const homeDiv = document.createElement('div');
    const header = document.createElement('h1');
    header.textContent = "DaBoiz Habit Tracker";
}

function loginPage()
