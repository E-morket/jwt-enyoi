const express = require ('express')
const jwt = require ('jsonwebtoken')
const app = express()

app.get('/jwt', (req,res)=>{
    res.json({
        text: 'Api corriendo cool'
    })
})

app.post ('/jwt/login', (req, res) =>{
    const user = {id: 1}
    const token =jwt.sign({user}, 'my_secure_key')
    res.json(token)
})

const Token = (req,res,next) =>{
    const header = req.headers['authorization']
    console.log(header)
    if(typeof header !== 'undefined'){
        const portador = header.split(" ")
        console.log(portador)
        const tokenPortador = portador[1]
        req.token = tokenPortador
        next()
    }else{
        res.sendStatus(403)
    }
    
}

app.get('/jwt/protected',Token, (req,res)=>{
    jwt.verify(req.token, 'my_secure_key', (err,respuesta)=>{
        if (err) {
            res.sendStatus(403)
        }else{
            res.json({
                text: 'ruta protegida activada'
            })
        }
    })
})


app.listen (3001,()=>{
    console.log('aplicacion en puerto 3001')
})