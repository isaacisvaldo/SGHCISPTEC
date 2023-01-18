const express = require(`express`);
const router = express.Router();
//Controllers
const  Conta =require('../config/Conta');
const  Administracao =require('../controllers/AdminController');
const  Enfermeiro=require('../controllers/EnfermeiroController');
//middlewares
const foto = require('../config/upload')
const AuthAdmin = require('../middlewares/adminAuth')
const AuthCliente = require('../middlewares/clienteAuth')
const s = require('../middlewares/sessao')
const usuario = require('../middlewares/usuario')



router.get('/',s,Enfermeiro.index); 
router.get('/logout' ,Conta.logout); 
router.post('/Autenticar', Conta.Autenticar); //Rota para fazer autenticação


//Rotas Administrativas
router.get('/Dashboard',usuario,Administracao.Dashboard)
router.get('/perfilAdmin',usuario,Administracao.perfilAdmin)
router.get('/listaEnfermeiro',usuario,Administracao.listaEnfermeiro)
router.get('/listaMedico',usuario,Administracao.listaMedico)
router.get('/listaHistoricos',usuario,Administracao.listaHistoricos)
router.get('/TranferenciaExterna',usuario,Administracao.TranferenciaExterna)
router.get('/TranferenciaInterna',usuario,Administracao.TranferenciaInterna)
router.get('/RelatorioEnfermeiro',usuario,Administracao.RelatorioEnfermeiro)
router.get('/RelatorioMedico',usuario,Administracao.RelatorioMedico)
router.get('/listaActividade',usuario,Administracao.listaActividade)


 //Admin Editar o seu perfil




module.exports = router;