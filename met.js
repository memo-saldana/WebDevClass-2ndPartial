const request = require('request'),
      exp = {};

exp.search = search => {
  return new Promise((resolve, reject) => { // Extra point for promises?
    request.get({url:`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`, json:true} ,(error, response, body)=>{
      if(error) return reject({requestError: true, error});
      if(body.total==0) return reject({requestError: false, message: "No se encontró ningun resultado con la busqueda", statusCode: 404});
      return resolve( body.objectIDs[0]);
    })
  });
}

exp.get = objectId => {
  return new Promise((resolve, reject) => {
    request.get({url:`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`, json:true}, (error, response, body) => {
      if(error) return reject({requestError: true, error})
      return resolve({
        artist : body.constituents[0].name,
        title: body.title,
        year: body.objectEndDate,
        technique: body.medium,
        metUrl: body.objectURL
      }
      )
    })
  });
}

module.exports = exp;