const jwt = require('jsonwebtoken')
async function verify(req, res,next) {
    try {
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }else{
            return res.status(401).json({message:'Bạn chưa có token'})
        }

        jwt.verify(token,'12345',(err,decoded)=>{
            if(err){
                return res.status(403).json({message: 'Token không hợp lệ hoặc hết hạn'})
            }
            req.user = decoded
            next()
        })
    }catch(err){
        return res.json({status: null,message: err})
    }
}

module.exports = { verify }
