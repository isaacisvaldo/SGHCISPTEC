
const Enfermeiro = require('../models/Enfermeiro');
const Medico = require('../models/Medico')
const Admin = require('../models/Admin');
const Historicos = require('../models/Historicos')

const RelatorioE = require('../models/RelatorioE')
const RelatorioM = require('../models/RelatorioM')
const TranferenciaInterna = require('../models/TranferenciaInterna')
const TranferenciaExterna = require('../models/TranferenciaExterna')
const Actividades = require('../models/Actividades')

const Op = require('sequelize').Op;
const bcrypt = require('bcryptjs');



//console.log(req.Adm) dados do wey q logou
class AdminController {
    //Rotas Apenas Do Digital Seguro
    async Dashboard(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/index', { admin ,actividades})
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async perfilAdmin(req, res) {
        try {

            const idAdmin = req.session.admin.idAdmin
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/perfilAdmin', { certo: req.flash('certo'), errado: req.flash('errado'), admin,actividades})


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }


    //Listar
    async listaEnfermeiro(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const enfermeiro = await Enfermeiro.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/listaEnfermeiro', { actividades,enfermeiro, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async listaMedico(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const medico = await Medico.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/listaMedico', { actividades,medico, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async listaHistoricos(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const historico = await Historicos.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/historicoClinico', { historico,actividades, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async listaActividade(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            res.render('Admin/listaractividades', { actividades, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async TranferenciaInterna(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const tranferenciainterna = await TranferenciaInterna.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/transferenciainterna', {actividades, tranferenciainterna, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async TranferenciaExterna(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const transferenciaexterna = await TranferenciaExterna.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/transferenciaexterna', {actividades, transferenciaexterna, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }

    async RelatorioMedico(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const relatorioM = await RelatorioM.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/relatorioMedico', { actividades,relatorioM, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async RelatorioEnfermeiro(req, res) {
        try {
            const idAdmin = req.session.admin.idAdmin
            const relatorioE = await RelatorioM.findAll({}).catch(err => { console.log(err) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            res.render('Admin/relatorioEnfermeiro', {actividades, relatorioE, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
 
  
    //Fim Listar
    async NovoEnfermeiro(req, res) {
        try {

            console.log(req.User)//pega os dados dele
            const { nome, email, telefone, username, senha, senha2, nif,provincia,municipio } = req.body;
            if (nome.length < 5) {
                req.flash('errado', "Nome demasiado Curto");
                res.redirect('/listaEnfermeiro')

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                req.flash('errado', "user nao pode ter letra Maiscula");
                res.redirect('/listaEnfermeiro')

             
            } else if ((/\s/g.test(username))) {
                req.flash('errado', "User nao pode ter espaço");
                res.redirect('/listaEnfermeiro')

               
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "E-mail invalido");
                res.redirect('/listaEnfermeiro')
              
            } else if (senha.length < 8) {
                req.flash('errado', "Senha muito fraca");
                res.redirect('/listaEnfermeiro')
               
            } else if (senha != senha2) {
                req.flash('errado', "Senhas Diferentes");
                res.redirect('/listaEnfermeiro')
             
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {
                req.flash('errado', "Numero de Telefone incorreto");
                res.redirect('/listaEnfermeiro')
              

            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                req.flash('errado', "Nif incorrecto");
                res.redirect('/listaEnfermeiro')
               
            } else {
                const enfermeiro = await Enfermeiro.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                const admin = await Admin.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                const medico = await Medico.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                if (!enfermeiro) {
                    if (!admin) {
                        if(!medico){
                        const image = (req.file) ? req.file.filename : 'user.png';
                        console.log("Posso cadastrar co  exito !")
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const admin = await Enfermeiro.create({ image, nome, email, telefone,provincia,municipio, username, senha: hash, nif, estado: 0,acesso:0 }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                        
                        req.flash('certo', "Conta criada com sucesso");
                        res.redirect('/listaEnfermeiro')
                    } else {
                        req.flash('errado', "Dados ja Cadastrado");
                        res.redirect('/listaEnfermeiro')
                        
                    }
                    } else {
                        req.flash('errado', "Dados ja Cadastrado");
                        res.redirect('/listaEnfermeiro')
                        
                    }

                } else {
                    req.flash('errado', "Dados ja Cadastrado");
                    res.redirect('/listaEnfermeiro')
                    
                }
            }


        } catch (error) {
            res.json({ erro: "Houve um problema" })
            console.log(error)
        }
    }
    async NovoMedico(req, res) {
        try {

            console.log(req.User)//pega os dados dele
            const { nome, email, telefone, username, senha, senha2, nif,provincia,municipio } = req.body;
            if (nome.length < 5) {
                req.flash('errado', "Nome demasiado Curto");
                res.redirect('/listaMedico')

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                req.flash('errado', "user nao pode ter letra Maiscula");
                res.redirect('/listaMedico')

             
            } else if ((/\s/g.test(username))) {
                req.flash('errado', "User nao pode ter espaço");
                res.redirect('/listaMedico')

               
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "E-mail invalido");
                res.redirect('/listaMedico')
              
            } else if (senha.length < 8) {
                req.flash('errado', "Senha muito fraca");
                res.redirect('/listaMedico')
               
            } else if (senha != senha2) {
                req.flash('errado', "Senhas Diferentes");
                res.redirect('/listaMedico')
             
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {
                req.flash('errado', "Numero de Telefone incorreto");
                res.redirect('/listaMedico')
              

            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                req.flash('errado', "Nif incorrecto");
                res.redirect('/listaMedico')
               
            } else {
                const enfermeiro = await Enfermeiro.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                const admin = await Admin.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                const medico = await Medico.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                if (!enfermeiro) {
                    if (!admin) {
                        if(!medico){
                        const image = (req.file) ? req.file.filename : 'user.png';
                        console.log("Posso cadastrar co  exito !")
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const medico = await Medico.create({ image, nome, email, telefone,provincia,municipio, username, senha: hash, nif, estado: 0,acesso:0 }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                        
                        req.flash('certo', "Conta criada com sucesso");
                        res.redirect('/listaMedico')
                    } else {
                        req.flash('errado', "Dados ja Cadastrado");
                        res.redirect('/listaMedico')
                        
                    }
                    } else {
                        req.flash('errado', "Dados ja Cadastrado");
                        res.redirect('/listaMedico')
                        
                    }

                } else {
                    req.flash('errado', "Dados ja Cadastrado");
                    res.redirect('/listaMedico')
                    
                }
            }


        } catch (error) {
            res.json({ erro: "Houve um problema" })
            console.log(error)
        }
    }
    async DeletarEnfermeiro(req, res) {
        try {
            const { idEnfermeiro } = req.params;
            if (!isNaN(idEnfermeiro)) {
                const enfermeiro = await Enfermeiro.destroy({ where: { idEnfermeiro: idEnfermeiro } })
                if (enfermeiro) {
                    req.flash('certo', "Enfermeiro eliminado com sucesso!");
                    res.redirect('/listaEnfermeiro')

                } else {
                    req.flash('errado', "Utilizador não Eliminado!");
                    res.redirect('/listaEnfermeiro')
                }
            } else {
                req.flash('errado', "Ocorreu um problema!");
                res.redirect('/listaEnfermeiro')
            }



        } catch (error) {
            res.json({ errado: "Ocorreu um problema" })
            console.log(error)
        }
    }
    async DeletarMedico(req, res) {
        try {
            const { idMedico } = req.params;
            if (!isNaN(idMedico)) {
                const medico = await Medico.destroy({ where: { idMedico: idMedico } })
                if (medico) {
                    req.flash('certo', "Medico eliminado com sucesso!");
                    res.redirect('/listaMedico')

                } else {
                    req.flash('errado', "Utilizador não Eliminado!");
                    res.redirect('/listaMedico')
                }
            } else {
                req.flash('errado', "Ocorreu um problema!");
                res.redirect('/listaMedico')
            }



        } catch (error) {
            res.json({ errado: "Ocorreu um problema" })
            console.log(error)
        }
    }

    async EditarAdmin(req, res) {
        try {



            const { nome, email, telefone, username, nif } = req.body;
            const idAdmin = req.session.admin.idAdmin
            const telefone1 = isNaN(telefone)
            const admin = await Admin.findByPk(idAdmin).catch(err => { console.log(err) })
            if (nome.length < 5) {
                req.flash('errado', "Nome demasiado Curto");
                res.redirect('/perfilAdmin')

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                req.flash('errado', " user nao pode ter letra Maiscula");
                res.redirect('/perfilAdmin')
            } else if ((/\s/g.test(username))) {
                console.log((/\s/g.test(username)))
                req.flash('errado', "User nao pode ter espaço");
                res.redirect('/perfilAdmin')
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "nao cadastrado");
                res.redirect('/perfilAdmin')
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone1))) {
                req.flash('info', "Numero de Telefone incorreto");
                res.redirect('/perfilAdmin')

            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                req.flash('info', "NIF incorreto");
                res.redirect('/perfilAdmin')
            } else {
                const image = (req.file) ? req.file.filename : admin.image;
                const admin = await Admin.update({ image, nome, email, telefone: telefone1, username, nif }, { where: { idAdmin: idAdmin } }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                req.flash('certo', "Editado com sucesso");
                res.redirect('/perfilAdmin')

            }


        } catch (error) {
            res.json({ erro: "Houve um problema" })
            console.log(error)
        }
    }



  

    async DeletarActividade(req, res) {
        try {
            const { idActividade } = req.params;
            if (!isNaN(idActividade)) {
                const actividade = await Actividade.destroy({ where: { idActividade: idActividade } })
                if (actividade) {
                    req.flash('certo', "Actividade eliminado com sucesso!");
                    res.redirect('/ListarAcesso')

                } else {
                    req.flash('errado', "actividade não Eliminado!");
                    res.redirect('/ListarAcesso')
                }
            } else {

                req.flash('errado', "Ocorreu um problema ao deletar!");
                res.redirect('/ListarAcesso')
            }



        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    //Fim Deletar
    async NovoParceiro(req, res) {
        try {
            const { nomeParceiro, emailParceiro, telefoneParceiro, tipoParceria } = req.body
            if (nome.length < 5) {
                req.flash('errado', "Nome Demasiado Curto")
                res.redirect('/');

            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {

                req.flash('errado', "E-mail Invalido")
                res.redirect('/');
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {


                req.flash('errado', "Numero de Telefone incorreto")
                res.redirect('/');
            } else {
                if (!(req.file)) {
                    req.flash('errado', "Foto Não submetido")
                    res.redirect('/');
                }
                else {
                    const estadoParceiro = 0;
                    const imageParceiro = (req.file) ? req.file.filename : 'parceiro.jpg';
                    const par = await Parceiros.create(nomeParceiro, emailParceiro, telefoneParceiro, tipoParceria, imageParceiro, estadoParceiro).catch(err => { console.log(err) })
                    if (par) {
                        req.flash('certo', "Perceiro  Cadastrado !")
                        res.redirect('/');
                    } else {
                        req.flash('errado', "Perceiro Não Cadastrado")
                        res.redirect('/');
                    }

                }

            }



        } catch (error) {
            req.flash('errado', "Ocorreu um Problema")
            res.redirect('/');
            console.log(error)
        }
    }



    //Cultural Seguro
    async listaUsuarioC(req, res) {

        try {

            const token = req.session.admin.token
            const idAdmin = req.session.admin.idAdmin
            const ins = await Inscritos.findAll({}).catch(err => { console.log(err) })
            const feedbak = await Feedbak.findAll({ where: { estadoFeedbak: 1 }, include: [{ model: Enfermeiro }] }).catch(err => { console.log(err); });

            const cliente = await Enfermeiro.findAll({}).catch(err => { console.log(err) })
            const solicitacao = await Solicitacao.findAll({ where: { estado: 0 } }).catch(err => { console.log(err) })
            const parceiros = await Parceiros.findAll().catch(err => { console.log(err) })
            const actividades = await Actividade.findAll({ include: [{ model: Enfermeiro }] }).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })


            res.render('Admin/CulturalSeguro/listaUsuario', { token, cliente, admin, solicitacao, actividades, feedbak, parceiros, ins })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    async painelGeralC(req, res) {

        try {

            const token = req.session.admin.token
            const idAdmin = req.session.admin.idAdmin
            const ins = await Inscritos.findAll({}).catch(err => { console.log(err) })
            const feedbak = await Feedbak.findAll({ where: { estadoFeedbak: 1 }, include: [{ model: Enfermeiro }] }).catch(err => { console.log(err); });

            const cliente = await Enfermeiro.findAll({}).catch(err => { console.log(err) })
            const solicitacao = await Solicitacao.findAll({ where: { estado: 0 } }).catch(err => { console.log(err) })
            const parceiros = await Parceiros.findAll().catch(err => { console.log(err) })
            const actividades = await Actividade.findAll({ include: [{ model: Enfermeiro }] }).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })


            res.render('Admin/CulturalSeguro/painelGeral', { token, cliente, admin, solicitacao, actividades, feedbak, parceiros, ins })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }


    //Fim cultural seguro





}
module.exports = new AdminController();