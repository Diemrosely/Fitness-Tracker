const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require ("path");

//ROUTES
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
});

router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../Develop/public/stats.html"));
});

//MIDDLEWARE

//GET Requests
//Fetches a record or set of resources from the server	
router.get("/api/workouts", (req, res) => {
    Workout.find()
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

//POST Request 
//Creates a new set of resources or a resource	
router.post("/api/workouts", (req,res) => {
    Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//PUT Request
//Updates or replaces the given record
//https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model
//Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {...
router.put("/api/workouts/:id", ({body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;