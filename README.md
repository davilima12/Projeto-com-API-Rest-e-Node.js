# API de Games
Esta API é ultilizada para...
## Endpoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nnehum
#### Respostas 
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games

Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "Call of duty MW",
        "year": 2019,
        "price": 60
    },
    {
        "id": 10,
        "title": "Gta Sandres",
        "year": 2002,
        "price": 50
    },
    {
        "id": 15,
        "title": "Need For Speed2",
        "year": 2014,
        "price": 30
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, issu significa que aconteceu alguma falha durante o processo de autenticação da requisição .Motivos:Token inválido, Token expirado.

Exemplo de resposta
```
{
    "err": "Token invalido"
}
```

### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuario cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
    "email":"Davidaer8847@gmail.com",
    "senha":"Nodejs<3"
}
```

#### Respostas 
##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJEYXZpZGFlcjg4NDdAZ21haWwuY29tIiwiaWF0IjoxNjMxNzIzMzcwLCJleHAiOjE2MzE3MjMzNzB9.cw6m0hrxTMigQaN4F251FAfRQY_Y79mfmj-E9c4iA-Y"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, issu significa que aconteceu alguma falha durante o processo de autenticação da requisição . Motivos: Senha ou E-mail incorretos.
Exemplo de resposta
```
{err: "Credencias invalidas!"}
```





