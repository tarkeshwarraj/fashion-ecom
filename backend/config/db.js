import mongoose from "mongoose";


export const connectDB = async () => {
try{
    await mongoose.connect('mongodb+srv://tarkeshwar:E7Q5eCllulVOaskL@cluster0.iy1jx73.mongodb.net/MyMernDataBase?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected...');

    //Switch to the specific database

    const db = mongoose.connection.useDb('MyMernDataBase');
    console.log('Switched to MyMernDataBase...')

}catch(err){
    console.error('Error connection to MongoDB Atlas:',err);
}

}

//mongodb+srv://tarkeshwar:E7Q5eCllulVOaskL@cluster0.iy1jx73.mongodb.net/MyMernDataBase?retryWrites=true&w=majority
//mongodb+srv://tarkeshwar:E7Q5eCllulVOaskL@cluster0.iy1jx73.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0







//E7Q5eCllulVOaskL