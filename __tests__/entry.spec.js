const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Entries', () => {
    // test('responds to /entries', async () => {
    //     const res = await request.get('/entries/getAll');
    //     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    //     expect(res.statusCode).toBe(200)
    // })
    test('responds to /entries', async () => {
        const res = await request.get('/entries/getSingle');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /getAll', async () => {
        const res = await request.get('/entries/createSingle');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /getAll', async () => {
        const res = await request.get('/entries/updateSingle');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /getAll', async () => {
        const res = await request.get('/entries/deleteSinge');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})