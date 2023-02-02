
const Medico = require('../models/Medico')
const TranferenciaInterna = require('../models/TranferenciaInterna')
const Historico = require('../models/Historicos')
const Relatorio=require ('../models/RelatorioM')

const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;

const axios = require("axios");


class EnfermeiroController {
    
    async DashboardMedico(req, res) {
        try {
            const idMedico = req.session.medico.idMedico

          const trans = await TranferenciaInterna.findAll({where:{medicoIdMedico:idMedico,estado:0},include: [{ model: Historico }]}).catch(erro => { console.log(erro) }) 
            const medico = await Medico.findOne({ where: { idMedico: idMedico } }).catch(erro => { console.log(erro) }) 
            res.render('Medico/index',{trans,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),medico})
            console.log(trans)
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
}
async Transferidos(req, res) {
    try {
        const idMedico = req.session.medico.idMedico

      const trans = await TranferenciaInterna.findAll({where:{medicoIdMedico:idMedico,estado:0},include: [{ model: Historico }]}).catch(erro => { console.log(erro) }) 
        const medico = await Medico.findOne({ where: { idMedico: idMedico } }).catch(erro => { console.log(erro) }) 
        res.render('Medico/listaTransferidos',{trans,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),medico})
        console.log(trans)
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async HistoricosClinico1(req, res) {
    try {
     const {idHistorico}= req.params;
     const idMedico = req.session.medico.idMedico

     const trans = await TranferenciaInterna.findAll({where:{medicoIdMedico:idMedico,estado:0},include: [{ model: Historico }]}).catch(erro => { console.log(erro) }) 
       const medico = await Medico.findOne({ where: { idMedico: idMedico } }).catch(erro => { console.log(erro) }) 
       const historico = await  Historico.findOne({where:{idHistorico:idHistorico}}).catch(erro => { console.log(erro) }) 
        res.render('Medico/Transferido1',{medico,trans,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),historico})
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async NovoRelatorio(req, res) {
    try {
        const {info	,tratamentoRealizadas	,diagnosticoFeito,	suspeitaClinica	,internacoes	,estado	,transferenciainternaIdTrasferencia}= req.body;
        const medicoIdMedico = req.session.medico.idMedico
        const horaEntrada =new Date().toLocaleTimeString();
        const relatorio = await Relatorio.create({info	,tratamentoRealizadas,	horaEntrada,diagnosticoFeito,	suspeitaClinica	,internacoes	,estado	,transferenciainternaIdTrasferencia,medicoIdMedico,estado:0}).catch(erro => { console.log(erro) }) 
        if(relatorio){
            req.flash('certo', "Relatorio Registado com sucesso");
                        res.redirect(`/HistoricosClinico1Medico/${historicoIdHistorico}`)
          }else{
            req.flash('errado', "Erro ao Registar");
            res.redirect(`/HistoricosClinico1Medico/${historicoIdHistorico}`)
          }
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}


}
module.exports = new EnfermeiroController();