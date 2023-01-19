
const Enfermeiro = require('../models/Enfermeiro')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;

const axios = require("axios");


class EnfermeiroController {
    
    
 async DashboardEnfermeiro(req, res) {
        try {
         
            const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
            const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
            res.render('Enfermeiro/index',{certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
            
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
}



   


}
module.exports = new EnfermeiroController();