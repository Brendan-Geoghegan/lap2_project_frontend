const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const fetch = require('jest-fetch-mock');
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

            it("calls userHabits and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habits: '12345' }]))
                const res = await app.userHabits("username")
                expect(res).toEqual('12345')
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/users/username')
            })

            it("calls singleHabit and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.singleHabit("username", "index")
                expect(res[0].habit).toEqual('12345')
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/users/username/habits/index')
            })

            it("calls completedHabit and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.completedHabit("username", "index")
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/users/username/habits/index/completed')
            })

            it("calls createHabit and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.createHabit("username", "e")
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/users/username/habits')
            })

            it("calls updateFrequency and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.updateFrequency("username", "index", "e")
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/users/username/habits/index/frequency')
            })

            it("calls deleteHabit and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.deleteHabit("username", "index", "e")
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/users/username/habits/index')
            })

            it("calls requestLogin and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.requestLogin("e")
                expect(fetch.mock.calls.length).toEqual(1)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/auth/login')
            })

            it("calls requestRegistration and returns data", async () => {
                fetch.mockResponseOnce(JSON.stringify([{ habit: '12345' }]))
                const res = await app.requestRegistration("e")
                expect(fetch.mock.calls.length).toEqual(2)
                expect(fetch.mock.calls[0][0]).toEqual('http://localhost:3000/auth/register')
                expect(fetch.mock.calls[1][0]).toEqual('http://localhost:3000/auth/login')
            })
        })
    })
})
