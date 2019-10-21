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
    "age": 21
  });
})

app.get('/met', (req,res) => {
  const {search} = req.query;
  met.search(search)
    .then((data) => {
      
      return met.get(data)
    })
    .then(data => {
      return res.status(200).json({
        ...data, searchTerm: search
      });
    })
    .catch((err) => {
      if(err){
        if(err.requestError){
          return res.status(500).json({error: err.error})
        } else {
          return res.status(400).json({message:err.message});
        }
      }
    });
})

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
  
});