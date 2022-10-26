const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const fetch = require('jest-fetch-mock');
let modeHelpers;

describe('layout functions with fetch requests', () => {
    let body;

    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        body = document.querySelector('body')
        modeHelpers = require('../static/js/layout');
    })

    beforeEach(() => {
        modeHelpers.clearPage()
    })

    afterEach(() => {
        fetch.resetMocks();
    })

    describe('dashboard', () => {
        test('it has a h1', async () => {
            fetch.mockResponseOnce(JSON.stringify([{ habits: [{habit: "running"}] }]))
            const res = await modeHelpers.dashboard()
            expect(fetch.mock.calls.length).toEqual(1)
            let h1 = document.querySelector('h1')
            expect(h1.textContent).toContain('Your dashboard:');
            expect(h1).toBeTruthy();
        })
    })

    describe('habitModal', () => {
        test('it has a h1 and buttons', async () => {
            fetch.mockResponseOnce(JSON.stringify({ habit: 'running', streak: 1, frequency: "Weekly" }))
            const res = await modeHelpers.habitModal(0)
            expect(fetch.mock.calls.length).toEqual(1)
            let h1 = document.querySelector('h1')
            expect(h1.textContent).toContain('running');
            expect(h1).toBeTruthy();
        })
    })
})
