const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Favorites', () => {
    test('responds to /favorites', async () => {
        const res = await request.get('/favorites/getAll');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /getAll', async () => {
        const res = await request.get('/favorites/createSingle');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /getAll', async () => {
        const res = await request.get('/favorites/updateSingle');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
    test('responds to /getAll', async () => {
        const res = await request.get('/favorites/deleteSinge');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})