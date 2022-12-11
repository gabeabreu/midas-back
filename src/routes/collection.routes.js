const express = require('express');
const { nft } = require('../../prisma/client');
const prisma = require('../../prisma/client');
const collectionRoutes = express.Router();

//create
collectionRoutes.post('/collections', async (req, res) => {
  const { address } = req.body;
  const mintDate = new Date();

  const newCollection = await prisma.collection.create({
    data: {
      address,
      mintDate,
    },
  });

  return res.status(200).json(newCollection);
});

//read
collectionRoutes.get('/collections', async (req, res) => {
  const collections = await prisma.collections.findMany();
  return res.status(200).json(collections);
});

collectionRoutes.get('/collections/trending', async (req, res) => {
  const collections = await prisma.collection.findMany({
    orderBy: {
      mintDate: 'desc',
    },
  });

  return res.status(200).json(collections.slice(0, 3));
});

//update
collectionRoutes.put('/collections', async (req, res) => {
  const { id, address, mintDate } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isCollectionValid = prisma.collection.findUnique({ where: { id } });

  if (!isCollectionValid)
    return res.status(404).json('Essa coleção não existe');

  const collection = await prisma.collection.update({
    where: { id },
    data: {
      address,
      mintDate,
    },
  });

  return res.status(200).json(collection);
});

//delete
collectionRoutes.delete('/collections', async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isCollectionValid = prisma.collection.findUnique({ where: { id } });

  if (!isCollectionValid)
    return res.status(404).json('Essa coleção não existe');

  await prisma.collection.delete({ where: { id } });

  return res.status(200);
});

module.exports = collectionRoutes;
