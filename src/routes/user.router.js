import { Router } from "express";
import { userModel } from "../dao/models/user.model.js"; //importamos el modelo de MongoDB


//Definimos un servicio y hacemos una consulta

const router=Router();

//los Modelos son consultas asincronicas por eso ponemos async ya que son a la base de datos

router.get('/',async(req,res)=>{

    try {
        const users = await userModel.find(); // con esta linea hago mi consuta a la bd y traigo almacenado  todos los usuario que tengo.
        res.send({result: 'success', payload:users}); //payload se le dice a datos que le retornamos a nuestro cliente(se puede poner cualquier nombre)
    } catch (error) {

        res.status(500).send({error});
        
    }

});


router.post('/', async (req,res)=>{
    
        const{first_name, last_name, email}= req.body;

        if(!first_name || !last_name || !email){
            return res.status(400).send({error:'incomplete values'});
        }
        try {
            const result = await userModel.create({
                first_name,
                last_name,
                email
            })

        res.send({result:'success', payload:result});
        
    } catch (error) {

        res.status(500).send({error})
        
    }
});

router.put('/:uid', async(req,res)=>{
    const {uid}=req.params;

    const userToReplace=req.body;

    if(!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email){
        return res.status(400).send({error:'incomplete values'});
    }

    try {
        const result = await userModel.updateOne({_id:uid}, userToReplace);
        res.send({result:'success', payload:result});
    } catch (error) {
        res.status(500).send({error})
        
    }


});

router.delete('/:uid',async(req,res)=>{
    const {uid}=req.params;
    try {
        const result =await userModel.deleteOne({_id:uid});
        res.send({result:'success', payload:result});
    } catch (error) {

        res.status(500).send({error})
        
    }
})

export default router;



