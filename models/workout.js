const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//add schema to map the data collected
const workoutSchema = new Schema(
    {
        day:{
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                    type: String, 
                    trim: true,
                    required: "Please enter a type of exercise"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Please enter the name of the exercise"
                },
                duration: {
                    type: Number,
                    required: "Please enter the duration of the exercise (minutes)"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },

    //include virtual properties in res.json() function by adding boolean value of true 
    //true displays these virtual properties on the client side when the data is requested
    {
        toJSON: {
            virtuals: true
        }
    }
);

//create a virtual property `total workout time` that is computed from `exercises`
workoutSchema.virtual("totalWorkoutTime").get(function () {
    //array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    //reduces array to a single value
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;