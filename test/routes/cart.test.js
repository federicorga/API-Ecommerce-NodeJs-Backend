import mongoose from 'mongoose'
import chai from 'chai'
import supertest from 'supertest'
import config from '../../src/config/dotenv.config.js';
import CartsManager from '../../src/dao/dbManagers/classes/cart.mongo.js';



mongoose.connect(config.mongoUrl);

const expect = chai.expect
const requester = supertest('http://localhost:8080/')

describe('Testing Cart Router', () => {

 

    let cookie;
    beforeEach(function () {
        this.timeout(10000)
    });
    it('Obtener cookie para autenticacion', async () => {
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
    it('Crear un nuevo carrito', async () => {
        const { statusCode, body } = await requester.post('api/carts/').set('Cookie', `${cookie.name}=${cookie.value}`)
    
        const Carter = new CartsManager();
        expect(statusCode).to.be.eql(200)
        expect(typeof body, "object").to.be.ok
        expect(body.status).to.be.eql('success');
        const idPattern = /new ObjectId\("([a-f\d]+)"\)/;
        const match = body.result.match(idPattern);
        const id = match && match[1]; // Utilizar el operador de cortocircuito para asignar si hay una coincidencia
        Carter.deleteOneProduct(id);
        
        //expect(body).to.have.property('_id');
       
        
      
    })
})