const Usuario = require('../modelo/Usuario');
const { Op } = require('sequelize');

exports.createusuario = async (req, res) => {
  console.log('createusuario');
  const { nome, idade, cidade, uf ,cep, complemento, bairro, numero} = req.body;
  console.log('Createusuario.Nome'+nome);
  console.log('createusuario.Idade'+idade);
  console.log('createusuario.Cidade'+cidade);
  console.log('createusuario.UF'+uf);
  console.log('createusuario.CEP'+cep);
  console.log('createusuario.Complemento'+complemento);
  console.log('createusuario.Bairro'+bairro);
  console.log('createusuario.Numero'+numero);
  try {
    const novoUsuario = await Usuario.create({ nome, idade , cidade, uf, cep, complemento, bairro, numero});
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.log("Erro ao criar usuário");
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

exports.getusuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
};

exports.updateusuario = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, cidade, uf, cep, complemento, bairro, numero  } = req.body;
  console.log("updateusuario id:"+id+" - nome:"+nome+" - idade:"+idade+"- cidade:"+cidade+"- uf:"+uf+"- cep:"+cep+"- complemento:"+complemento+"- bairro:"+bairro+"- numero:"+numero);
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nome = nome;
      usuario.idade = idade;
      usuario.cidade = cidade;
      usuario.uf = uf;
      usuario.cep = cep;
      usuario.complemento = complemento;
      usuario.bairro = bairro;
      usuario.numero = numero;
      usuario.updatedAt = new Date();
      await usuario.save();
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};

exports.buscarId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
};

exports.buscarUsuarioPorNome = async (req, res) => {
  const {nome} = req.params;
  try {
    const usuario = await Usuario.findAll({ where: { nome: {  [Op.like]: `%${nome}%` } } });

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Nenhum nome de usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o por nome usuário' });
  }
};

exports.deleteusuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};