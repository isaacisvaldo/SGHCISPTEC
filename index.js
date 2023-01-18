const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const connection = require("./database/database");
const cors =require("cors")
const  route = require('./routes/routes');
//Models
const Admin = require('./models/Admin')
const Enfermeiro = require('./models/Enfermeiro')
const Historicos = require('./models/Historicos')
const Medico = require('./models/Medico')
const RelatorioE = require('./models/RelatorioE')
const RelatorioM = require('./models/RelatorioM')
const TranferenciaInterna = require('./models/TranferenciaInterna')
const TranferenciaExterna = require('./models/TranferenciaExterna')
const Actividades = require('./models/Actividades')
//const leasing = require('./models/leasing')
// Fim Models
// View engine
app.set('view engine','ejs');
//Sessions
app.use(session({
    secret: "qualquercoisaparaaumentaraseguranç@", cookie: { maxAge: 80000000 },
    saveUninitialized:true,
    resave:true
}))
app.use(flash());
// Static
app.use(express.static('public'));
//Body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/",route);
app.use(cors());
// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })
    app.use(function  (req,res,next){
    res.render('error/404')
}) 

app.listen(8080, function (erro) {
    if (erro) {
        console.log(erro);
    } else {
        console.log("Servidor iniciado com sucesso! porta:8080");
    }
})