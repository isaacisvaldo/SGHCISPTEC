const Cliente = require('../models/Enfermeiro');
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
            const historicos = await Historicos.findAll({}).catch(err => { console.log(err) })
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            const actividades = await Actividades.findAll({}).catch(err => { console.log(err) })
            res.render('Admin/historicoClinico', { historicos,actividades, admin, certo: req.flash('certo'), errado: req.flash('errado'), info: req.flash('info') })


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
    async NovoAdmin(req, res) {
        try {

            console.log(req.User)//pega os dados dele
            const { nome, email, whatsaap, username, senha, senha2, nif } = req.body;
            if (nome.length < 5) {
                res.json({ err: "Nome demasiado Curto" });

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))

                res.json({ err: "user nao pode ter letra Maiscula" });
            } else if ((/\s/g.test(username))) {


                res.json({ err: "User nao pode ter espaço" });
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {

                res.json({ err: "E-mail invalido" });
            } else if (senha.length < 8) {

                res.json({ err: "Senha muito fraca" });
            } else if (senha != senha2) {

                res.json({ err: "Senhas Diferentes" });
            } else if (!(/^[9]{1}[0-9]{8}$/.test(whatsaap))) {

                res.json({ err: "Numero de Telefone incorreto" });

            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {

                res.json({ err: "NIF incorreto" });
            } else {
                const cliente = await Cliente.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { whatsaap: whatsaap }] } }).catch(err => { console.log(err) })
                const admin = await Admin.findOne({ where: { [Op.or]: [{ email: email }, { username: username }, { whatsaap: whatsaap }] } }).catch(err => { console.log(err) })
                if (!cliente) {
                    if (!admin) {
                        const image = (req.file) ? req.file.filename : 'user.png';
                        console.log("Posso cadastrar co  exito !")
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const admin = await Admin.create({ image, nome, email, whatsaap, username, senha: hash, nif, role: 0 }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                        res.json({ certo: "Conta criada com sucesso" });
                        console.log(admin)
                    } else {

                        res.json({ err: "Dados ja Cadastrado" });
                    }

                } else {

                    res.json({ err: "Dados ja Cadastrado" });
                }
            }


        } catch (error) {
            res.json({ erro: "Houve um problema" })
            console.log(error)
        }
    }
    async alterarSenha(req, res) {
        const { senhaatual, senha, senha2 } = req.body
        console.log(senhaatual, senha, senha2)
        const idAdmin = req.session.admin.idAdmin
        if (senha != senha2) {
            req.flash('errado', "Senhas Diferentes");
            res.redirect('/perfilAdmin')
        } else if (senha.length < 6) {
            req.flash('errado', "Senha Muito fraca");
            res.redirect('/perfilAdmin')
        } else {
            const admin = await Admin.findOne({ where: { idAdmin: idAdmin } }).catch(erro => { console.log(erro) })
            var correct = bcrypt.compareSync(senhaatual, admin.senha);
            if (correct) {

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(senha, salt);
                const admin = await Admin.update({ senha: hash }, { where: { idAdmin: idAdmin } }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                req.flash('certo', "Senhas Alterado com sucesso!");
                res.redirect('/perfilAdmin')
            } else {
                req.flash('errado', "Senha atual Errada!");
                res.redirect('/perfilAdmin')

            }
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


    async ListarUmAdmin(req, res) {
        try {
            console.log(req.Adm)//pega os dados do wey logado
            const { idAdmin } = req.params;
            const admin = await Admin.findByPk(idAdmin).catch(err => { console.log(err) })
            res.json({ admin })


        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
    //Deletar
    async DeletarCliente(req, res) {
        try {
            const { idCliente } = req.params;
            if (!isNaN(idCliente)) {
                const cliente = await Cliente.destroy({ where: { idCliente: idCliente } })
                if (cliente) {
                    req.flash('certo', "Cliente eliminado com sucesso!");
                    res.redirect('/listaUsuario')

                } else {
                    req.flash('errado', "Utilizador não Eliminado!");
                    res.redirect('/listaUsuario')
                }
            } else {
                req.flash('errado', "Ocorreu um problema!");
                res.redirect('/listaUsuario')
            }



        } catch (error) {
            res.json({ errado: "Ocorreu um problema" })
            console.log(error)
        }
    }
    async DeletarAdmin(req, res) {
        try {
            const { idAdmin } = req.params;
            if (!isNaN(idAdmin)) {
                const admin = await Admin.destroy({ where: { idAdmin: idAdmin } })
                if (admin) {
                    req.flash('certo', "Admin eliminado com sucesso!");
                    res.redirect('/ListarAdmins')

                } else {
                    req.flash('errado', "Admin não Eliminado!");
                    res.redirect('/ListarAdmins')
                }
            } else {

                req.flash('errado', "Ocorreu um problema ao deletar!");
                res.redirect('/ListarAdmins')
            }



        } catch (error) {
            res.send("Ocorreu um problema")
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
            } else if (!(/^[9]{1}[0-9]{8}$/.test(whatsaap))) {


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
            const feedbak = await Feedbak.findAll({ where: { estadoFeedbak: 1 }, include: [{ model: Cliente }] }).catch(err => { console.log(err); });

            const cliente = await Cliente.findAll({}).catch(err => { console.log(err) })
            const solicitacao = await Solicitacao.findAll({ where: { estado: 0 } }).catch(err => { console.log(err) })
            const parceiros = await Parceiros.findAll().catch(err => { console.log(err) })
            const actividades = await Actividade.findAll({ include: [{ model: Cliente }] }).catch(err => { console.log(err) })
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
            const feedbak = await Feedbak.findAll({ where: { estadoFeedbak: 1 }, include: [{ model: Cliente }] }).catch(err => { console.log(err); });

            const cliente = await Cliente.findAll({}).catch(err => { console.log(err) })
            const solicitacao = await Solicitacao.findAll({ where: { estado: 0 } }).catch(err => { console.log(err) })
            const parceiros = await Parceiros.findAll().catch(err => { console.log(err) })
            const actividades = await Actividade.findAll({ include: [{ model: Cliente }] }).catch(err => { console.log(err) })
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