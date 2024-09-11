const jwt = require('jsonwebtoken')
const User = require('../models/User_model')

const requireAuth = async (req,res,next) => {

    //verify authentication
    const {authorization} = req.headers 

    if(!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    //split the string into two parts by a space
    const token = authorization.split(' ')[1] //token is in the position 1 

    try {
        //verify token
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await  User.findOne({_id}).select('_id, firstname') //only selecting id
        next()

    } catch (err) {
        console.log(err)
        res.status(401).json({error: "Requrest is not authorized"})

    }
}

module.exports = requireAuth