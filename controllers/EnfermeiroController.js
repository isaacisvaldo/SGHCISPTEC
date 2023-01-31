
const Enfermeiro = require('../models/Enfermeiro')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;
const Historico = require('../models/Historicos')
const TranferenciaInterna =require ('../models/TranferenciaInterna')
const TranferenciaExterna=require ('../models/TranferenciaExterna')
const Relatorio=require ('../models/RelatorioE')


const axios = require("axios");
const Medico = require('../models/Medico');


class EnfermeiroController {
    
    
 async DashboardEnfermeiro(req, res) {
        try {
         
            const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
            const meusralatorios = await Relatorio.findAll({where:{enfermeiroIdEnfermeiro:idEnfermeiro}}).catch(err => { console.log(err) })
            const historico = await  Historico.findAll({}).catch(erro => { console.log(erro) }) 
       
            const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
            res.render('Enfermeiro/index',{historico,meusralatorios,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
            
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
            const historico1 = await TranferenciaInterna.destroy({ where: { historicoIdHistorico: idHistorico } })
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
async HistoricosClinico1(req, res) {
    try {
     const {idHistorico}= req.params;
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
   
        const trans = await  TranferenciaInterna.findOne({where:{historicoidHistorico:idHistorico,estado:0}}).catch(erro => { console.log(erro) }) 
        const trans2 = await  TranferenciaExterna.findOne({where:{historicoidHistorico:idHistorico,estado:0}}).catch(erro => { console.log(erro) }) 
      console.log(trans)
       const historico = await  Historico.findOne({where:{idHistorico:idHistorico}}).catch(erro => { console.log(erro) }) 
        const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/historicoClinico1',{trans,trans2,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro,historico})
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async ListarMedicos(req, res) {
    try {
        const {idHistorico}= req.params;
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
        const medico = await Medico.findAll({}).catch(erro => { console.log(erro) }) 
       const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/listaMedico',{medico,idHistorico,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async ListarHospitais(req, res) {
    try {
        const {idHistorico}= req.params;
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
       // const medico = await Medico.findAll({}).catch(erro => { console.log(erro) }) 
       const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/listaHospitais',{idHistorico,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async NovaTransferenciaExterna(req, res) {
    try {
        const {historicoidHistorico,detalheTrasferencia,local}= req.body;
       
        const horaTrasferencia =new Date().toLocaleTimeString();
        const trsns = await TranferenciaExterna.create({historicoIdHistorico:historicoidHistorico,local,detalheTrasferencia,horaTrasferencia,estado:0}).catch(erro => { console.log(erro) }) 
        if(trsns){
            req.flash('certo', "Transferido com sucesso");
                        res.redirect(`/HistoricosClinico1/${historicoidHistorico}`)
          }else{
            req.flash('errado', "Erro ao Tranferir");
            res.redirect(`/HistoricosClinico1/${historicoidHistorico}`)
          }
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async NovaTransferenciaInterna(req, res) {
    try {
        const {historicoidHistorico,medicoidMedico,detalheTrasferencia}= req.body;
       
        const horaTrasferencia =new Date().toLocaleTimeString();
        const trsns = await TranferenciaInterna.create({historicoIdHistorico:historicoidHistorico,medicoIdMedico:medicoidMedico,detalheTrasferencia,horaTrasferencia,estado:0}).catch(erro => { console.log(erro) }) 
        if(trsns){
            req.flash('certo', "Transferido com sucesso");
                        res.redirect(`/HistoricosClinico1/${historicoidHistorico}`)
          }else{
            req.flash('errado', "Erro ao Tranferir");
            res.redirect(`/HistoricosClinico1/${historicoidHistorico}`)
          }
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async NovoRelatorio(req, res) {
    try {
        const {info,consultasRealizadas,tratamentoRealizadas,diagnosticoFeito,suspeitaClinica,internacoes,historicoIdHistorico}= req.body;
        const enfermeiroIdEnfermeiro = req.session.Enfermeiro.idEnfermeiro
        const hora =new Date().toLocaleTimeString();
        const relatorio = await Relatorio.create({info,enfermeiroIdEnfermeiro,consultasRealizadas,tratamentoRealizadas,diagnosticoFeito,suspeitaClinica,internacoes,hora,historicoIdHistorico,estado:0}).catch(erro => { console.log(erro) }) 
        if(relatorio){
            req.flash('certo', "Relatorio Registado com sucesso");
                        res.redirect(`/HistoricosClinico1/${historicoIdHistorico}`)
          }else{
            req.flash('errado', "Erro ao Registar");
            res.redirect(`/HistoricosClinico1/${historicoIdHistorico}`)
          }
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}
async TranferenciaInterna(req, res) {
    try {
      
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
        const trans = await TranferenciaInterna.findAll({include: [{ model: Historico }]}).catch(err => { console.log(err) })
        
       const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/transferenciainterna',{trans,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
        
    
    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}
async TranferenciaExterna(req, res) {
    try {
      
        const trans = await TranferenciaExterna.findAll({}).catch(err => { console.log(err) })
       
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
       
       const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/transferenciainterna',{trans,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
        
    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}

async MeusRelatorios(req, res) {
    try {
        const idEnfermeiro = req.session.Enfermeiro.idEnfermeiro
        const meusralatorios = await Relatorio.findAll({where:{enfermeiroIdEnfermeiro:idEnfermeiro}}).catch(err => { console.log(err) })
        
        const enfermeiro = await Enfermeiro.findOne({ where: { idEnfermeiro: idEnfermeiro } }).catch(erro => { console.log(erro) }) 
        res.render('Enfermeiro/meusRelatorios',{meusralatorios,certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info'),enfermeiro})
        
    } catch (error) {
        res.send("Ocorreu um problema")
        console.log(error)
    }
}




   


}
module.exports = new EnfermeiroController();