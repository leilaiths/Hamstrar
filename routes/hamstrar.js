//importera databas från database.js

const getDatabase = require('../database.js')


//anropa funktionen

const db = getDatabase();

const express = require('express');
//const { app } = require('firebase-admin');
//const { request } = require('express');
const router = express.Router()

// Startar upp routern
//GET
router.get('/', async (req, res) => {
    //console.log('/hamstrar REST API');
    // res.send('/hamstrar REST API');

    const hamstrarRef = db.collection('Hamstrar');
    const snapshot = await hamstrarRef.get();
       
    if (snapshot.empty) {
        res.sendStatus(404)
        return
    }
    items = []

    snapshot.forEach(doc => {
    const data = doc.data()
    data.id = doc.id //ID behövs för POST, PUT, DELETE
    // res.send(data)
    items.push(data)
    })
    res.status(200).send(items)
    
});

//RANDOM

  router.get('/random', async (req, res) => {
  const hamsterRef = db.collection('Hamstrar')
  const snapshot = await hamsterRef.get()
  console.log('/random console2')

  if (snapshot.empty) {
    res.sendStatus(404)
    return 
  } 
  let items = []

  snapshot.forEach(doc => {
    const data = doc.data()
    data.id = doc.id
    items.push(data)
  })
  const random = Math.floor(Math.random() * items.length)
  res.status(200).send(items[random])
  console.log('items random',items[random])

  //
  
  
})


router.get('/:id', async (req, res) =>{

  const id = req.params.id
  const hamster = db.collection('Hamstrar').doc(id);
  const data = await hamster.get();
  if(!data.exists){
    res.status(404).send('Hamster not found')
  }else{
    res.send(data.data())
  }
})

//POST
router.post('/', async (req, res) => {
const hamster = req.body
// utan att ange id
const docRef = await db.collection('Hamstrar').add(hamster)
console.log('The document id is:' + docRef.id)

res.status(200).send({id:docRef.id})

})

//PUT
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const docRef = await db.collection('Hamstrar').doc(id).get()
        if ( !id || !docRef.exists ) {
            res.status(404).send("")
            return
        }
        const object = req.body
        if ( Object.entries(object).length === 0 ) {
            res.status(400).send("Try again")
            return
        }
        await db.collection('Hamstrar').doc(id).update(object)
        const message  = "updated" + id
        res.status(200).send(message)
    } catch (e) {
        res.status(500).send("Error")
    }
})

  

  
//DELETE

router.delete('/:id', async (req, res) => {
   const id = req.params.id
    // måste ha id
   const docRef = await db.collection('Hamstrar').doc(id).get()
  

 if( !id || !docRef.exists ){
    res.status(404).send('Hamster not found')
     return
  }

  await db.collection('Hamstrar').doc(id).delete()
   res.sendStatus(200)
 
   });
   
module.exports = router