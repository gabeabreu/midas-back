const express = require('express');
const { uploadImage } = require('../utils/cloudinary');
const { getImage } = require('../utils/formidable');
const prisma = require('../../prisma/client');
const profilePictureRoutes = express.Router();

const allProfilePictures = [];

async function upload(req, res) {
  const imageUploaded = await getImage(req);

  const imageData = await uploadImage(imageUploaded.path);

  const result = await prisma.profilePicture.create({
    data: {
      publicId: imageData.user_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
  });

  res.json(result);
}

//create
profilePictureRoutes.post('/profilePictures', async (req, res) => {
  const { userId } = req.body;
  const { format } = req.body;
  const { version } = req.body;
  // const newProfilePicture = await prisma.profilePicture.create({
  //   data: {
  //     userId,
  //     format,
  //     version,
  //   },
  // });
  allProfilePictures.push({ userId, format, version });
  return res.status(201).json(allProfilePictures);
});

//read
profilePictureRoutes.get('/allProfilePictures', async (req, res) => {
  const profilePictures = await prisma.profilePicture.findMany();
  return res.status(200).json(profilePictures);
});

//read
profilePictureRoutes.get('/profilePictures', async (req, res) => {
  const { id } = req.body;
  const profilePictures = await prisma.profilePicture.findUnique({
    where: { id },
  });
  return res.status(200).json(profilePictures);
});

//update
profilePictureRoutes.put('/profilePictures', async (req, res) => {
  const { id, userId, format, version } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isProfilePictureValid = prisma.profilePicture.findUnique({
    where: { id },
  });

  if (!isProfilePictureValid)
    return res
      .status(404)
      .json('Não existe imagem com esse id cadastrada no banco');

  const profilePicture = await prisma.profilePicture.update({
    where: {
      id,
    },
    data: {
      userId,
      format,
      version,
    },
  });

  return res.status(200).json(profilePicture);
});

//delete
profilePictureRoutes.delete('/profilePictures', async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json('Id é obrigatório e não foi passado como parâmetro');

  const isProfilePictureValid = prisma.profilePicture.findUnique({
    where: { id },
  });

  if (!isProfilePictureValid)
    return res
      .status(404)
      .json('Não existe imagem com esse id cadastrada no banco');

  await prisma.profilePicture.delete({ where: { id } });

  return res.status(200);
});

module.exports = profilePictureRoutes;
