const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();


const signup =  async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        const password = await bcrypt.hash(req.body.password, salt);
        const data = {...req.body, password:password }
        const user = await prisma.user.create({ data });
        const { id, email, name} = user;

    
       res.json({id, email, name});
    
        
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2002') {
                res.json({
                    "error": "There is a unique constraint violation, a new user cannot be created with this email"
                })


            }
        }   

        
        
    }



}



const  JWTToken= async (user) => {
    return await jwt.sign({
        email:user.email,
        id: user.id
      }, process.env.JWT_SECRET);

  }

const signin = async (req, res) => {
    try {
        const body = req.body;
        const user = await prisma.user.findFirst({
            where:{
                email:body.email
            
                
            }
        });
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            const jwt_secret= await JWTToken(user);
            res.status(200).json({"id": user.id, "token": jwt_secret});
          } else {
            res.status(400).json({ error: "Invalid Password" });
          }
    
        
    } catch (error) {
        res.status(400).json({"error": "Something went wrong..."})

        
    }
   

}



const editProfile = async (req, res) => {
    const userId = parseInt(req.body.userId)
    const user = await prisma.user.update({
        where:{
            id:userId
        },
        data: {
            name:req.body.name
        },
    })
    if(!user){
        res.status(404).json({"error":"User Not Found"})
    }
    const { id, email, name }  = user;
    res.status(202).json({id, email, name})


}

const deleteUser  = async (req, res) =>{
    try {
        const userId =  parseInt(req.body.userId);
        await prisma.user.delete(
           {
               where : {
                   id:userId
               },
           }
       )
   
       res.status(200).json({"succcess": "Record has been deleted"})
   

        
    } catch (error) {
        res.status(404).json({"error": "Record to delete doesn't exist"})

        
    }


}

const displayProfile = async (req, res) => {

    try {
        const userId =  parseInt(req.body.userId);
       const user =  await prisma.user.findFirst(
           {
               where : {
                   id:userId
               },
           }
       )
       const {id, email, name} = user;

   
       res.json({id, email, name})
   

        
    } catch (error) {
        res.status(404).json({"error": "Record to display doesn't exist"})

        
    }


}

module.exports = { signup, signin, editProfile, deleteUser, displayProfile }