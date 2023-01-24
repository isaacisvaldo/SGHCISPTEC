
const Enfermeiro = require('../models/Enfermeiro')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;
const Historico = require('../models/Historicos')

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
async HistoricosClinicos(req, res) {
    try {
     
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
       const historico = await  Historico.findAll({}).catch(erro => { console.log(erro) }) 
        const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/historicoClinico',{certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro,historico})
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async NovoHistorico(req, res) {
    try {
     
       const{nomePaciente,provincia,municipio,sexoPaciente,nascimentoPaciente,profissaoPaciente,enderecoPaciente,telefonePaciente,biPaciente,alturaPaciente,pesoPaciente,remediosPaciente,substToxicaPaciente}=req.body
        const horaHistorico =new Date().toLocaleTimeString();
      
       const Hist = await Historico.create({horaHistorico,nomePaciente,provincia,municipio,sexoPaciente,nascimentoPaciente,profissaoPaciente,enderecoPaciente,telefonePaciente,biPaciente,alturaPaciente,pesoPaciente,remediosPaciente,substToxicaPaciente}).catch(erro => { console.log(erro) }) 
          if(Hist){
            req.flash('certo', "Conta criada com sucesso");
                        res.redirect('/HistoricosClinicos')
          }else{
            req.flash('errado', "Conta criada com sucesso");
                        res.redirect('/HistoricosClinicos')
          }
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async DeletarHistorico(req, res) {
    try {
        const { idHistorico } = req.params;
        if (!isNaN(idHistorico)) {
            const historico = await Historico.destroy({ where: { idHistorico: idHistorico } })
            if (historico) {
                req.flash('certo', "Historico eliminado com sucesso!");
                res.redirect('/HistoricosClinicos')

            } else {
                req.flash('errado', "Historico não Eliminado!");
                res.redirect('/HistoricosClinicos')
            }
        } else {
            req.flash('errado', "Ocorreu um problema!");
            res.redirect('/HistoricosClinicos')
        }



    } catch (error) {
        res.json({ errado: "Ocorreu um problema" })
        console.log(error)
    }
}



   


}
module.exports = new EnfermeiroController();