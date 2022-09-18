
exports.verifyToken = (jwt) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        console.log(authHeader)

    
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {

          console.log(user)
          if (err || typeof user === "undefined") return res.sendStatus(400)

          
          /* let token_ = await token_black_list.findOne({
              where: {
                  token: token
              }
          })



          if(typeof token_ !== 'undefined')
          {
            return res.status(400).json({ errors: [{code: 4, param: 'invalid token'}] });
          } */

          res.locals.user = user
          res.locals.token = token
        })
        next()
    }
}

