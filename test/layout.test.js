const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('it has a title', () => {
        let title = document.querySelector('title');
        expect(title.textContent).toContain("DaBoiz's Habit Tracker");
    })
})

let modeHelpers;

describe('layout functions', () => {
    let body;

    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        body = document.querySelector('body')
        modeHelpers = require('../static/js/layout');
    })

    beforeEach(() => {
        modeHelpers.clearPage()
    })

    describe('homepage', () => {
        test('it has a h1 and buttons', () => {
            modeHelpers.homePage();
            let h1 = document.querySelector('h1')
            expect(h1.textContent).toContain('HabiTrackerz');
            expect(h1).toBeTruthy();
        })
    })

    describe('loginPage', () => {
        test('it has a form', () => {
            modeHelpers.loginPage();
            let form = document.querySelector('form')
            expect(form).toBeTruthy();
        })
    })

    describe('registerPage', () => {
        test('it has a form', () => {
            modeHelpers.registerPage();
            let form = document.querySelector('form')
            expect(form).toBeTruthy();
        })
    })

    describe('createPage', () => {
        test('it has a form', () => {
            modeHelpers.createPage();
            let form = document.querySelector('form')
            expect(form).toBeTruthy();
        })
    })

    describe('backbutton', () => {
        test('it has a button', () => {
            modeHelpers.backbutton();
            let button = document.querySelector('button')
            expect(button).toBeTruthy();
        })
    })

    describe('logoutButton', () => {
        test('it has a form', () => {
            modeHelpers.logoutButton();
            let button = document.querySelector('button')
            expect(button).toBeTruthy();
        })
    })

    // describe('capitalise', () => {
    //     test('it capitalises the first letter of a string', () => {
    //         const test = modeHelpers.capitalise("test")
    //         expect(test).toBe("Test")
    //     })
    // })

    // describe('dashboard', () => {
    //     test('it has a form', () => {
    //         modeHelpers.dashboard();
    //         let h1 = document.querySelector('h1')
    //         expect(h1.textContent).toContain('Your dashboard');
    //         expect(h1).toBeTruthy();
            
    //     })
    // })
})
