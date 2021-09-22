import { Request, Response } from 'express';
//import { sequelize } from '../instances/pg';

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response) => {
  
  //Verifica se usuario já criado
  const [ usuario, created ] = await User.findOrCreate({
    where: { name: 'Carlos' },
    defaults: {
      age: 80
    }
  });
  if(created) {
    console.log("Usuário criado com sucesso!");
  } else {
    console.log('Achamos o usuário!');
  }
  console.log("NOME: ", usuario.name);
  //console.log("USUARIO: ", usuario);
  //console.log("CREATED", created);

  /*let usuario = await User.findByPk(2);// Ache pela chave
  if(usuario) {
    console.log(`O usuario ${usuario.name} tem ${usuario.age} anos.`);
  } else {
    console.log("Usuário não encontrado!");
  }*/
  
  
  let users = await User.findAll();

  let age: number = 90;
  let showOld: boolean = false;

  if (age > 50) {
    showOld = true;
  }

  let list = Product.getAll();
  let expensiveList = Product.getFromPriceAfter(12);

  res.render('pages/home', {
    name: 'Bonieky',
    lastName: 'Lacerda',
    showOld,
    products: list,
    expensives: expensiveList,
    frasesDoDia: [],
    users
  });
};
// Adicionar novo usuário
export const novoUsuario = async (req: Request, res: Response) => {
  let { name, age } = req.body;

  if(name) {
    const newUser = User.build({name});

    if(age) {
      newUser.age = parseInt(age);
    }
    await newUser.save();
  }
  res.redirect('/');
};
export const idadeMais = () => {
  
};