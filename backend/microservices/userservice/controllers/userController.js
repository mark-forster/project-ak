// backend/microservice/userservice/controller/userController.js
const UserModel = require('../models/userModel');
const { produceMessage } = require('../brokers/producer');
const {register, login} = require('../services/userService');
async function createUser(data) {
    try {
        const {email} = data;
        if (await UserModel.isEmailTaken(email)) {
            await produceMessage('response-user',{message:"User already exists"})
        }
        //const alreadyExistUser = await UserModel.findOne({email: email});
        //console.log(alreadyExistUser);
       // if(alreadyExistUser){
          //  await produceMessage('response-user',{message:"User already exists"})
        //}
        else{
            const user = await register(data);
        console.log('User created successfully:', user);
        await produceMessage('response-user', user);
        console.log('User_response post:', user);
        }
        

    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function loginUser(data){
        try{
            const {email, password} = data;
            console.log(email, password);
            const user = await login(data);
            console.log('User Login successfully:', user);
         await produceMessage('response-user', user);
         console.log('User_response post:', user);
        }
        catch(error){
            console.error('Error logging user:', error);
        }
}


module.exports = { createUser, loginUser };
