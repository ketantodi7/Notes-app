const jwt = require('jsonwebtoken');
const jwt_secret = 'harry';

const fetchuser = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "enter a valid token" })
    }
try{
    const data = jwt.verify(token,jwt_secret);
    req.user = data.user; 
    next();
}
 catch(error){
    res.status(401).send({error: "enter a valid token" });
}

}


module.exports = fetchuser;