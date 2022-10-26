const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const fetch = require('jest-fetch-mock')
let app

describe('Frontend testing', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
        app = require('../static/js/layout.js')
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('requests', () => {
        describe('get all habits for a given user', () => {
            test('it makes a get request to /users/:username', () => {
                // app.userHabits()
                // expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/cats$/))
                // expect(fetch.mock.calls[0][0]).toMatch(/cats$/)
                console.log("First test")
            })
        })
    })
})