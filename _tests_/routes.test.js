const supertest = require('supertest')
const dotenv = require('dotenv')
const path = require('path');
const server = require('../src/server')
const config = require('../src/config')
const { mongoose } = require('../src/services')

if(process.env.NODE_ENV === 'test')
  dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

const objectDefault = {
    name: "gabriell",
    password: "teste123",
    email: "gabriellluccas14@gmail.com",
    phones: [{
        number: "32113121",
        ddd: "43"
    }]
}
let request = {}
describe('Tests for route - POST /sign-up', () => {
    beforeAll(async () => {
        await config.mongoose.open();
        request = supertest(await server(true))
    })

    afterAll(async () => {
        await config.mongoose.close();
    })

    afterEach(async () => await mongoose.deleteMany({}))

    it('Should pass if all data pass is correctly', async () => {
        await request
            .post('/sign-up')
            .send(objectDefault)
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(typeof res.body.data).toBe('object')
            })
    })

    it('Should be error if don\'t pass name', async () => {
        const { email, password } = objectDefault
        const body = {email, password}
        await request
            .post('/sign-up')
            .send(body)
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(400)
                expect(Array.isArray(res.body.message)).toBe(true)
                expect(typeof res.body.message[0]).toBe('string')
            })
    })

    it('Should be error if already have email in database', async () => {    
        await request
        .post('/sign-up')
        .send(objectDefault)
        .set('Accept', 'application/json')
        
        await request
            .post('/sign-up')
            .send(objectDefault)
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.statusCode).toBe(400)
                expect(Array.isArray(res.body.message)).toBe(true)
                expect(typeof res.body.message[0]).toBe('string')
            })
    })

})