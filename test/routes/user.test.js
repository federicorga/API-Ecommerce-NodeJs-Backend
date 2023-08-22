import mongoose from 'mongoose'
import chai from 'chai'
import supertest from 'supertest'
import config from '../../src/config/dotenv.config.js';

//mocha test/routes/user.test.js

mongoose.connect(config.mongoUrl);

const expect = chai.expect
const requester = supertest('http://localhost:8080/')

describe('Testing User/Session Router',() => {
    beforeEach(function(){
        this.timeout(10000)
    })
    
    it('Obtener un usuario por su email', async ()=>{
        let credentialsMock = {
            email: 'coder@gmail.com',
            password: '1234'
        }
        const { statusCode, body, headers } = await requester.post('api/session/login').send(credentialsMock);
        
        expect(statusCode).to.be.eql(200)
        expect(typeof body, "object").to.be.ok
        expect(body.status).to.be.eql('success')
    })

    it('Obtener un error enviando usuario invalido', async () => {
        let credentialsMock = {
            email: 'coderiadsan@gmail.com',
            password: '12dsds3456'
        }
        const { statusCode, body } = await requester.post('api/session/login').send(credentialsMock);
        expect(statusCode).to.be.eql(401)
        expect(body.status).to.be.eql('error')
        expect(body.error).to.be.eql('Invalid credentials')
    })
})
