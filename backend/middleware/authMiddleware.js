import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            token = req.headers.authorization.split(' ')[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
            req.user = await User.findById(decoded.id)
            
           // next(); this calls the 
           //next middleware in the stack 
           //and the main route in the server.js 
           //app.use('/api/users', userRoutes) is terminated although not completed
           //and the next in stack middleware that is -->(not found) in server.js
           //app.use(notFound) is called and we get the message provided in the notfound middleware 
        }
         catch (error) {
            res.status(401)
            throw new Error("token failed, not authorized")
        }
    } 
    if(!token){
        res.status(401)
        throw new Error('Not authorized ')
    }
    next()
})

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error("Not an Admin")
    }
}


export { protect, admin }