/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from "express";
import { artiaAPI } from "../artia/artiaAPI";
import { createPostDataAddComment } from "../artia/comments/createPostDataAddComment";
import { createPostDataListComments } from "../artia/comments/createPostDataListComments";

const getToken = async (req: Request, res: Response, next: NextFunction) => {
  // const token = await asyncGetToken();
  // console.log("Token await =>", token);
  // // return response
  return res.status(200).json({
    message: " Que legal!!",
  });
};

// adding a post
const addComment = async (req: Request, res: Response, next: NextFunction) => {
  //Params para gerar token
  const email = "gabriel@nong.com.br";
  const password = "Java09**";
  const organizationId = "111394";

  //Params para adicionar comentário
  const accountId = "3757125";
  const activityId = "19667956";
  const content =
    "Um pequeno passo para a humanidade, um grande passo para o Mobral!";
  const createdBy = "gabriel@nong.com.br";
  let usersLine: string = `#Caso queira notificar alguém, basta mudar o notificarPessoas para true`;
  const notificarPessoas = false;

  if (notificarPessoas) {
    const usersArray: string[] = [];
    usersLine = `users: "${usersArray}"`;
  }

  const postData = createPostDataAddComment(
    accountId,
    activityId,
    content,
    createdBy,
    usersLine
  );

  const params = {
    email: email,
    password: password,
    organizationId: organizationId,
    postData: postData,
  };

  const responseArtia = await artiaAPI(params);

  return res.status(200).json({
    message: responseArtia,
  });
};

const listComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Params para gerar token
  const email = "gabriel@nong.com.br";
  const password = "Java09**";
  const organizationId = "111394";

  //Params para listar comentŕaio
  const accountId = "3757125";
  const viewed = false;
  let idsLine: string = `#Caso queira listar comentários especifico, basta colocar as ids dele dentro do array listIdComments `;
  const listCommentsById = false; // Caso seja falso, irá listar todos os comentários

  if (listCommentsById) {
    const listIdComments: string[] = [];
    idsLine = `ids:: "${listIdComments}"`;
  }

  const postData = createPostDataListComments(accountId, idsLine, viewed);

  const params = {
    email: email,
    password: password,
    organizationId: organizationId,
    postData: postData,
  };

  const responseArtia = await artiaAPI(params);

  return res.status(200).json({
    message: responseArtia,
  });
};

export default { getToken, addComment, listComments };
