
const Medico = require('../models/Medico')
const TranferenciaInterna = require('../models/TranferenciaInterna')
const Historico = require('../models/Historicos')

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


}
module.exports = new EnfermeiroController();