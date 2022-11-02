const express = require('express');
const prisma = require('../../prisma/client');
const userRoutes = express.Router();

const allUsers = [];

//create user
userRoutes.post('/users', async (req, res) => {
  const { name } = req.body;
  const { bio } = req.body;
  const { email } = req.body;
  const { address } = req.body;
  const { isVerified } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name,
      bio,
      email,
      address,
      isVerified,
    },
  });
  allUsers.push({ name, bio, email, address, isVerified });
  return res.status(201).json(allUsers);
});

//read users
userRoutes.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
});

//update user
userRoutes.put('/users', async (req, res) => {
  const { id, name, bio, email, address, isVerified } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isUserValid = prisma.user.findUnique({ where: { id } });

  if (!isUserValid) return res.status(404).json('Esse usuário não existe');

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      bio,
      email,
      address,
      isVerified,
    },
  });

  return res.status(200).json(user);
});

//delete user
userRoutes.delete('/users', async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isUserValid = prisma.user.findUnique({ where: { id } });

  if (!isUserValid) return res.status(404).json('Esse usuário não existe');

  await prisma.user.delete({ where: { id } });

  return res.status(200);
});

module.exports = userRoutes;
