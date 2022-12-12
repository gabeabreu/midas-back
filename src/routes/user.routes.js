const express = require('express');
const { user } = require('../../prisma/client');
const prisma = require('../../prisma/client');
const userRoutes = express.Router();

//create user
userRoutes.post('/users', async (req, res) => {
  const {
    name,
    bio,
    instagram,
    twitter,
    website,
    discord,
    address,
    isVerified,
    profilePictureUrl,
    bannerPictureUrl,
    collectionsMinted
  } = req.body;

  const userAlreadyExist = await prisma.user.findUnique({ where: { address } });

  if (userAlreadyExist) return res.status(302).json(userAlreadyExist);

  const newUser = await prisma.user.create({
    data: {
      name,
      bio,
      instagram,
      twitter,
      website,
      discord,
      address,
      isVerified,
      profilePictureUrl,
      bannerPictureUrl,
      collectionsMinted
    },
  });

  return res.status(201).json(newUser);
});

//all users
userRoutes.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();

  if (!users) return res.status(204).json('Nenhum usuário cadastrado');
  return res.status(200).json(users);
});

//verified users
userRoutes.get('/users/verified', async (req, res) => {
  const verifiedUsers = await prisma.user.findMany({
    where: { isVerified: true },
  });

  if(verifiedUsers.length) return res.status(200).json(verifiedUsers)
  return res.status(404).json("Nenhum verified cadastrado")
});

//update user(or add field)
userRoutes.put('/users', async (req, res) => {
  const {
    name,
    bio,
    instagram,
    twitter,
    website,
    discord,
    address,
    isVerified,
    profilePictureUrl,
    bannerPictureUrl,
    collectionsMinted
  } = req.body;

  if (!address)
    return res
      .status(406)
      .json('Address é obrigatório e não foi passado como parâmetro');

  const isUserValid = await prisma.user.findUnique({ where: { address } });

  if (!isUserValid) return res.status(404).json('Esse usuário não existe');

  const user = await prisma.user.update({
    where: {
      address,
    },
    data: {
      name,
      bio,
      instagram,
      twitter,
      website,
      discord,
      address,
      isVerified,
      profilePictureUrl,
      bannerPictureUrl,
      collectionsMinted
    },
  });

  return res.status(201).json(user);
});

//delete user
userRoutes.delete('/users', async (req, res) => {
  const { address } = req.body;

  if (!address)
    return res
      .status(400)
      .json('address é obrigatório e não foi passado como parâmetro');

  const isUserValid = await prisma.user.findUnique({ where: { address } });

  if (!isUserValid) return res.status(404).json('Esse usuário não existe');

  await prisma.user.delete({ where: { address } });

  return res.status(200);
});

//specific user (and check if the address is already in DB)
userRoutes.post('/users/find', async (req, res) => {
  const { address } = req.body;

  if (!address)
    return res.status(400).json('Address deve ser passado como parâmetro');

  const user = await prisma.user.findUnique({ where: { address } });

  if (!user) return res.status(404).json('Usuário não encontrado');
  else return res.status(200).json(user);
});

module.exports = userRoutes;
