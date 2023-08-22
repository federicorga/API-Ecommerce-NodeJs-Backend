import mongoose from 'mongoose'
import chai from 'chai'
import supertest from 'supertest'
import config from '../../src/config/dotenv.config.js';
mongoose.connect(config.mongoUrl);

const expect = chai.expect
const requester = supertest('http://localhost:8080/')

describe('Testing Product Router', () => {
    let cookie;
    beforeEach(function(){
        this.timeout(10000)
    })
    it('Obtener cookie para autenticacion',async () => {
        let credentialsMock = {
            email: 'coder@gmail.com',
            password: '1234'
        }
        const result = await requester.post('api/session/login').send(credentialsMock);
        const cookieResult = result.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok

        const cookieResultSplit = cookieResult.split('=');
        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        }
        
        expect(cookie.name).to.be.ok.and.equal('eCookieToken')
        expect(cookie.value).to.be.ok
    })
    it('Obtener los primeros 10 productos',async () => {
        const { body } = await requester.get('api/products/').set('Cookie',`${cookie.name}=${cookie.value}`)
       
        //expect(statusCode).to.be.eql(200)
        expect(typeof body, "object").to.be.ok
        expect(Array.isArray(body.docs)).to.be.ok
        // expect(body.products.docs).to.have.length(10)
        
    })
    it('Obtener un producto por su ObjectId',async () => {
        const productid='646aeb99e7df43df2d743789';
        const { statusCode, body } = await requester.get(`api/products/${productid}`).set('Cookie',`${cookie.name}=${cookie.value}`)
        
        expect(statusCode).to.be.eql(200)
        expect(typeof body, "object").to.be.ok
        expect(body._id).to.be.equal(productid)
 
    })
})