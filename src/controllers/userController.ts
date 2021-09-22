import { Request, Response } from 'express';

import { User } from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const addIdade = async (req: Request, res: Response) => {
  //console.log("PARAMS: ", req.params);// Pega o id
  let id: string = req.params.id;
  // Pega idade dele e aumenta
  let results = await User.findAll({ where: {id} });
  
  if(results.length > 0) {
    let usuario = results[0];
    usuario.age++;
    await usuario.save();
  }

  res.redirect('/');// Mostra na home
}

export const menosIdade = async (req: Request, res: Response) => {
  //console.log("PARAMS: ", req.params);// Pega o id
  let id: string = req.params.id;
  // Pega idade dele e aumenta
  let results = await User.findAll({ where: {id} });
  
  if(results.length > 0) {
    let usuario = results[0];
    usuario.age--;
    await usuario.save();
  }

  res.redirect('/');// Mostra na home  
}

export const excluir = async (req: Request, res: Response) => {

  //console.log("PARAMS: ", req.params);// Pega o id
  let id: string = req.params.id;

  await User.destroy({ where: { id } });
  
  res.redirect('/');// Mostra na home  
}