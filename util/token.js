const jwt = require('jsonwebtoken');

// Função para verificar se um token é válido
const checkToken = async (token, id, key) => {
  try {
    const decoded = await verifyToken(token, key);
    return decoded.id === id;
  } catch (err) {
    return false;
  }
};

// Função para verificar a validade de um token
const verifyToken = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Função para gerar um novo token com base em um ID e chave
const setToken = async (id, key) => {
  if (id) {
    try {
      const token = await signToken({ id }, key);
      return token;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
};

// Função para gerar um novo token
const signToken = (payload, key) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, { expiresIn: 28800 }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
module.exports = {checkToken,setToken};