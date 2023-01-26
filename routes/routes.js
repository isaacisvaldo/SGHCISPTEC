const express = require(`express`);
const router = express.Router();
//Controllers
const  Conta =require('../config/Conta');
const  Administracao =require('../controllers/AdminController');
const  Enfermeiro=require('../controllers/EnfermeiroController');
//middlewares
const foto = require('../config/upload')
const AuthAdmin = require('../middlewares/adminAuth')
const EnfAuth = require('../middlewares/enferauth')
const s = require('../middlewares/sessao')




router.get( '/',(req,res )=>{
    res.render('inicio/index',{certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
}); 
router.get('/logout' ,Conta.logout); 
router.post('/Autenticar', Conta.Autenticar); //Rota para fazer autenticação
//Rotas Enfermeiro
router.get('/DashboardEnfermeiro',EnfAuth,Enfermeiro.DashboardEnfermeiro)
router.get('/HistoricosClinicos',EnfAuth,Enfermeiro.HistoricosClinicos)
router.get('/HistoricosClinico1/:idHistorico',EnfAuth,Enfermeiro.HistoricosClinico1)
router.post('/NovoHistorico',EnfAuth,Enfermeiro.NovoHistorico)
router.get('/DeletarHistorico/:idHistorico',EnfAuth,Enfermeiro.DeletarHistorico)


//Rotas Administrativas
router.get('/Dashboard',AuthAdmin,Administracao.Dashboard)
router.get('/perfilAdmin',AuthAdmin,Administracao.perfilAdmin)
router.get('/listaEnfermeiro',AuthAdmin,Administracao.listaEnfermeiro)
router.get('/listaMedico',AuthAdmin,Administracao.listaMedico)
router.get('/listaHistoricos',AuthAdmin,Administracao.listaHistoricos)
router.get('/TranferenciaExterna',AuthAdmin,Administracao.TranferenciaExterna)
router.get('/TranferenciaInterna',AuthAdmin,Administracao.TranferenciaInterna)
router.get('/RelatorioEnfermeiro',AuthAdmin,Administracao.RelatorioEnfermeiro)
router.get('/RelatorioMedico',AuthAdmin,Administracao.RelatorioMedico)
router.get('/listaActividade',AuthAdmin,Administracao.listaActividade)
router.post('/NovoEnfermeiro',AuthAdmin,Administracao.NovoEnfermeiro)
router.post('/NovoMedico',AuthAdmin,Administracao.NovoMedico)
router.get('/DeletarEnfermeiro/:idEnfermeiro',AuthAdmin,Administracao.DeletarEnfermeiro)
router.get('/DeletarMedico/:idMedico',AuthAdmin,Administracao.DeletarMedico)


 //Admin Editar o seu perfil




module.exports = router;