const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const jwt = require("jsonwebtoken")


const JWTSecret= "dsfgdsfgsdgfsdgfskmlk"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function auth(req,res,next){
    const authToken = req.headers['authorization']
    if(authToken != undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token,JWTSecret,(err,data)=>{
            if(err){
                res.status(401)
                res.json({err:"Token invalido"})
            }else{
                req.token = token
                req.loggedUser = {id:data.id,email: data.email}
                next()
            }
        })
    }else{
        res.status(401)
        res.json({err:"Token invalido!"})
    }
    
}

var DB = {
    games: [

        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 60

        },
        {
            id:10,
            title:"Gta Sandres",
            year:2002,
            price:50
        },
        {
            id:15,
            title:"Need For Speed2",
            year:2014,
            price:30,
        }
    ],
    users: [
        {
            id: 1,
            nome: "Davi Lima",
            email: "Davidaer8847@gmail.com",
            senha: "Nodejs<3"
        },
        {
            id:20,
            name: "Gabriel Lima",
            email: "juselino@gmail.com",
            senha:"Jonas123"
        
        }

    ]
}


app.get("/games",auth,(req,res)=>{
    res.statusCode = 200
res.json(DB.games)
})

app.get("/games/:id",auth,(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var game = DB.games.find(g =>g.id ==id)

        if(game !=undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }

    }


})

app.post("/game",(req,res)=>{
    var {title,price,year} = req.body
    DB.games.push({
        id:120,
        title,
        price,
        year 
    })
res.sendStatus(200)
})

app.delete("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }

    }
})

app.put("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            var {title,price,year} = req.body

            if(title != undefined){
                game.title = title
            }
            if(price != undefined){
                game.price = price
            }

            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)
            
        }else{
            res.sendStatus(404)
        }
    }
})

    app.post("/auth",(req,res)=>{
        var{email,senha}=req.body
        if(email != undefined){
           var user= DB.users.find(user =>user.email == email)
            if(user != undefined){
                if(user.senha == senha){

                    jwt.sign({id: user.id, email:user.email},JWTSecret,{expiresIn:"48h"},(err,token)=>{
                        if(err){
                            res.status(400)
                            res.json({err:"falha interna"})
                        }else{
                            res.status(200)
                            res.json({token:token})
                        }
                    })
                }else{
                    res.status(401)
                    res.json({err:"Credenciais invalidas!"})
                }


            }else{
                res.status(404)
                res.json({err: "O E-mail enviado não enxiste na base de banco de dados!"})
            }


        }else{
            res.status(400)
            res.json({err:"E-mail invalido"})
        }


    })




app.listen(5000, () => {
    console.log("API RODANDO!")
})