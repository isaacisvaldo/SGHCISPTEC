const express = require(`express`);
const router = express.Router();
//Controllers
const  Conta =require('../config/Conta');
const  Administracao =require('../controllers/AdminController');
const  Enfermeiro=require('../controllers/EnfermeiroController');
const Medico = require ('../controllers/MedicoController')
//middlewares
const foto = require('../config/upload')
const AuthAdmin = require('../middlewares/adminAuth')
const EnfAuth = require('../middlewares/enferauth')
const MedicoAuth = require('../middlewares/medicoAuth')
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
router.get('/ListarMedicos/:idHistorico',EnfAuth,Enfermeiro.ListarMedicos)
router.get('/ListarHospitais/:idHistorico',EnfAuth,Enfermeiro.ListarHospitais)
router.post('/NovaTransferenciaInterna',EnfAuth,Enfermeiro.NovaTransferenciaInterna)
router.post('/NovaTransferenciaExterna',EnfAuth,Enfermeiro.NovaTransferenciaExterna)
router.post('/NovoRelatorio',EnfAuth,Enfermeiro.NovoRelatorio)

//Rotas do Medico
router.get('/DashboardMedico',MedicoAuth,Medico.DashboardMedico)
router.get('/Transferidos',MedicoAuth,Medico.Transferidos)
router.get('/HistoricosClinico1Medico/:idHistorico',MedicoAuth,Medico.HistoricosClinico1)

//Rotas Administrativas
router.get('/Dashboard',AuthAdmin,Administracao.Dashboard)
router.get('/perfilAdmin',AuthAdmin,Administracao.perfilAdmin)
router.get('/listaEnfermeiro',AuthAdmin,Administracao.listaEnfermeiro)
router.get('/listaMedico',AuthAdmin,Administracao.listaMedico)
router.get('/listaHistoricos',AuthAdmin,Administracao.listaHistoricos)
router.get('/TranferenciaExterna',AuthAdmin,Administracao.TranferenciaExterna)
router.get('/TranferenciaExterna1/:idTrasferencia',AuthAdmin,Administracao.TranferenciaExterna1)
router.get('/DeletarTransExterna/:idTrasferencia',AuthAdmin,Administracao.DeletarTransExterna)
router.get('/DeletarTransInterna/:idTrasferencia',AuthAdmin,Administracao.DeletarTransInterna)
router.get('/TranferenciaInterna',AuthAdmin,Administracao.TranferenciaInterna)
router.get('/TranferenciaInterna1/:idTransferencia',AuthAdmin,Administracao.TranferenciaInterna1)
router.get('/RelatorioEnfermeiro',AuthAdmin,Administracao.RelatorioEnfermeiro)
router.get('/RelatorioMedico',AuthAdmin,Administracao.RelatorioMedico)
router.get('/listaActividade',AuthAdmin,Administracao.listaActividade)
router.post('/NovoEnfermeiro',AuthAdmin,Administracao.NovoEnfermeiro)
router.post('/NovoMedico',AuthAdmin,Administracao.NovoMedico)
router.get('/DeletarEnfermeiro/:idEnfermeiro',AuthAdmin,Administracao.DeletarEnfermeiro)
router.get('/DeletarMedico/:idMedico',AuthAdmin,Administracao.DeletarMedico)
router.get('/listaHistorico1/:idHistorico',AuthAdmin,Administracao.listaHistorico1)
router.get('/DeletarHistoricoAdmin/:idHistorico',AuthAdmin,Administracao.DeletarHistorico)


 //Admin Editar o seu perfil




module.exports = router;