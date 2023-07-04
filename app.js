require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.use(express.json());

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] }
  });
  
  const Person = mongoose.model('Person', personSchema);
  

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à MongoDB');
  
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
    const person = new Person({
        name: "Bessem Zaizaa",
        age: 30,
        favoriteFoods: ["Pizza", "M9rouna"]
      });
      
      person.save()
      .then((data) => {
        console.log('Personne enregistrée avec succès:', data);
      })
      .catch((err) => {
        console.error('Erreur lors de la sauvegarde de la personne:', err);
      });
      // Création de plusieurs personnes avec Model.create()
const arrayOfPeople = [
    { name: "John", age: 25, favoriteFoods: ["Pizza", "Burger"] },
    { name: "Jane", age: 30, favoriteFoods: ["Sushi", "Salad"] },
    { name: "Mike", age: 35, favoriteFoods: ["Pasta", "Ice Cream"] }
  ];
  
  Person.create(arrayOfPeople)
    .then((people) => {
      console.log('Personnes créées avec succès:', people);
      // Effectuer d'autres opérations après la création des personnes
    })
    .catch((err) => {
      console.error('Erreur lors de la création des personnes:', err);
    });
  
  // Recherche de personnes ayant un nom donné avec Model.find()
  Person.find({ name: "John" })
    .then((people) => {
      console.log('Personnes avec le nom "John":', people);
    })
    .catch((err) => {
      console.error('Erreur lors de la recherche des personnes:', err);
    });
  
  // Recherche d'une personne ayant un certain aliment dans les favoris avec Model.findOne()
  Person.findOne({ favoriteFoods: "Pizza" })
    .then((person) => {
      console.log('Personne ayant "Pizza" dans les favoris:', person);
    })
    .catch((err) => {
      console.error('Erreur lors de la recherche de la personne:', err);
    });
  
  // Recherche d'une personne par _id avec Model.findById()
  const personId = "your-person-id";
  Person.findById(personId)
    .then((person) => {
      console.log('Personne avec l\'ID donné:', person);
    })
    .catch((err) => {
      console.error('Erreur lors de la recherche de la personne par ID:', err);
    });
  
  // Mise à jour d'une personne en ajoutant un aliment à la liste des favoris
  Person.findById(personId)
    .then((person) => {
      person.favoriteFoods.push("Hamburger");
      person.save()
        .then((updatedPerson) => {
          console.log('Personne mise à jour avec succès:', updatedPerson);
        })
        .catch((err) => {
          console.error('Erreur lors de la mise à jour de la personne:', err);
        });
    })
    .catch((err) => {
      console.error('Erreur lors de la recherche de la personne par ID:', err);
    });
  
  // Mise à jour d'un document avec model.findOneAndUpdate()
  const personName = "John";
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
    .then((updatedPerson) => {
      console.log('Personne mise à jour avec succès:', updatedPerson);
    })
    .catch((err) => {
      console.error('Erreur lors de la mise à jour de la personne:', err);
    });
  
  // Suppression d'un document avec model.findByIdAndRemove()
  Person.findByIdAndRemove(personId)
    .then((removedPerson) => {
      console.log('Personne supprimée avec succès:', removedPerson);
    })
    .catch((err) => {
      console.error('Erreur lors de la suppression de la personne:', err);
    });
  
  // Suppression de plusieurs documents avec Model.remove()
  Person.remove({ name: "Mary" })
    .then((result) => {
      console.log('Personnes avec le nom "Mary" supprimées:', result);
    })
    .catch((err) => {
      console.error('Erreur lors de la suppression des personnes:', err);
    });
  
  // Chaînage des Query Helpers pour affiner les résultats de recherche
  Person.find({ favoriteFoods: "Burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec()
    .then((people) => {
      console.log('Personnes qui aiment les burritos:', people);
    })
    .catch((err) => {
      console.error('Erreur lors de la recherche des personnes:', err);
    });
  
    
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  });


  
  