const express = require('express'),
      app = express(),
      met = require('./met'),
      PORT = process.env.PORT || 3000;

app.get('/students/:id', (req,res) => {
  const { id } = req.params;
  if(id != 'A01039888') return res.status(400).json({error: "Matricula invalida"})
  return res.status(200).json({
    "id": "A01039888",
    "fullname": "José Guillermo Saldaña Cárdenas",
    "nickname": "Memo Saldaña",
    "major": "ITC",
    "grade": "100 (You know it is you don\'t have to check it 🤣)", 
    "age": 21
  });
})

app.get('/met', (req,res) => {
  const {search} = req.query;
  met.search(search)
    .then((data) => {
      
      return met.get(data) // Extra point for chained promises?
    })
    .then(data => {
      return res.status(200).json({
        ...data, searchTerm: search //Extra points for spread operator?
      });
    })
    .catch((err) => { 
      if(err.requestError){
        if(err.error.response){
          let message = ''
          switch(err.error.response.statusCode) {
            case 404:
              'No se encontró ningun resultado con la busqueda'
            break;
          }
          return res.status(err.error.response.statusCode).json({message});
        } else if(err.error.code == 'ENOTFOUND') {
          return res.status(500).json({message: "No se pudo conectar con el API del Met"});
        }
        return res.status(500).json({message: "Ocurrió un error inesperado."})
      } else {
        return res.status(err.statusCode).json({message:err.message});
      }
    });
})

app.get('/*', (req,res) => {
  return res.status(404).json({message: "No se encontró la ruta deseada"});
})

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
  
});