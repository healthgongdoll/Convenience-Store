const{ verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next)=>{
        let token = req.get("authorization");
        //if token is there 
        if(token){
            token = token.slice(7)
            verify(token, "eecs4413",(err, decoded) => {
                if(err){
                    res.status(403).json({
                        sucess: 0,
                        message: "Invalid Token"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.status(403).json({
                sucess: 0,
                message: "Access denied! unauthroized user"
            })
        }
    }
}