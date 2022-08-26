import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("MONGODB connected")
    })
    .catch((err) => {
        console.log(err)
    })

export default mongoose