const request = require('request'),
      exp = {};

exp.search = search => {
  return new Promise((resolve, reject) => { // Extra point for promises?
    request.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`,(error, response, body)=>{
      if(error) return reject({requestError: true, error});
      let jsonBody = JSON.parse(body);
      if(jsonBody.total==0) return reject({requestError: false, message: "No se encontró ningun resultado con la busqueda", statusCode: 404});
      return resolve( jsonBody.objectIDs[0]);
    })
  });
}

exp.get = objectId => {
  return new Promise((resolve, reject) => {
    request.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`, (error, response, body) => {
      if(error) return reject({requestError: true, error})
      let jsonBody = JSON.parse(body);
      return resolve({
        artist : jsonBody.constituents[0].name,
        title: jsonBody.title,
        year: jsonBody.objectEndDate,
        technique: jsonBody.medium,
        metUrl: jsonBody.objectURL
      }
      )
    })
  });
}

module.exports = exp;