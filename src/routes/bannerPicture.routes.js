const express = require('express');
const { uploadImage } = require('../utils/cloudinary');
const { getImage } = require('../utils/formidable');
const prisma = require('../../prisma/client');
const bannerPictureRoutes = express.Router();

const allBannerPictures = [];

async function upload(req, res) {
  const imageUploaded = await getImage(req);

  const imageData = await uploadImage(imageUploaded.path);

  const result = await prisma.bannerPicture.create({
    data: {
      userId: imageData.user_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
  });

  res.json(result);
}

bannerPictureRoutes.post('/bannerPictures', async (req, res) => {
  const { userId } = req.body;
  const { format } = req.body;
  const { version } = req.body;
  const newBannerPicture = await prisma.bannerPicture.create({
    data: {
      userId,
      format,
      version,
    },
  });
  allBannerPictures.push({ userId, format, version });
  return res.status(201).json(allBannerPictures);
});

bannerPictureRoutes.get('/allBannerPictures', async (req, res) => {
  const bannerPictures = await prisma.bannerPicture.findMany();
  return res.status(200).json(bannerPictures);
});

bannerPictureRoutes.get('/bannerPictures', async (req, res) => {
  const { id } = req.body;
  const bannerPictures = await prisma.bannerPicture.findUnique({
    where: { id },
  });
  return res.status(200).json(bannerPictures);
});

bannerPictureRoutes.put('/bannerPictures', async (req, res) => {
  const { id, userId, format, version } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isBannerPictureValid = prisma.bannerPicture.findUnique({
    where: { id },
  });

  if (!isBannerPictureValid)
    return res
      .status(404)
      .json('Não existe imagem com esse id cadastrada no banco');

  const bannerPicture = await prisma.bannerPicture.update({
    where: {
      id,
    },
    data: {
      userId,
      format,
      version,
    },
  });

  return res.status(200).json(bannerPicture);
});

bannerPictureRoutes.delete('/bannerPictures', async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isBannerPictureValid = prisma.bannerPicture.findUnique({
    where: { id },
  });

  if (!isBannerPictureValid)
    return res
      .status(404)
      .json('Não existe imagem com esse id cadastrada no banco');

  await prisma.bannerPicture.delete({ where: { id } });

  return res.status(200);
});

module.exports = bannerPictureRoutes;
