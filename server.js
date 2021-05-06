

//heroku uses process.env.PORT
const PORT = process.env.PORT || 1377
const express = require('express')
const app = express()

const cors = require('cors')
const path = require('path')
const hamstrar = require('./routes/hamstrar.js')


// Middleware som loggar information om inkomande request
app.use(cors() )
app.use (express.json() )


app.use((req, res, next) =>{
    console.log(`${req.method}  ${req.url}`, req.params);
    next()
})


const staticFolder = path.join(__dirname, 'static')
app.use( express.static(staticFolder))

//app.use( express.static(path.join(__dirname, 'static'))







//Hämtar root filen(/) så att den kan visas i porten
//GET registrerar en Route
app.get('/', (req, res) => {
//console.log(res);
 res.send('Yes i am  here')

});

app.get('/static', (req,res) => {
    console.log('This is static');
    res.sendFile(dirname + '/static/index.html')
})
//dirname är till för att veta var man befinner sig och då visar
//variabeln var man befinner sig fram till



//REST API för hamstrar
app.use('/hamsters', hamstrar)


//Starta servern
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`) 
})