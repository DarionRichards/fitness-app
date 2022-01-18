const { Routine, Exercise, ExerciseRoutine, User } = require("../../models");

const createNewRoutine = async (req, res) => {
  res.send("createNewRoutine");
};

const updateRoutineById = async (req, res) => {
  res.send("updateRoutineById");
};

const deleteRoutineById = async (req, res) => {
  res.send("deleteRoutineById");
};

const getAllRoutines = async (req, res) => {
  const routines = await Routines.findAll({
    include: [
      {
        model: Exercises,
        through: ExerciseRoutine,
      },
      {
        model: Users,
      },
    ],
  });

  const allRoutines = routines.map((each) => {
    return each.get({
      plain: true,
    });
  });

  res.json({ data: allRoutines });
  //res.send("getAllRoutines");
};

const getRoutineById = async (req, res) => {
  res.send("getRoutineById");
};

const getExercisesByTarget = async (req, res) => {
  console.log(req);
  const URL = `https://exercisedb.p.rapidapi.com/exercises/target/${req}`;

  const { data } = await axios.get(URL, {
    headers: {
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
    },
  });

  const shuffled = data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 6);

  console.log(selected);

  return selected;
};

module.exports = {
  createNewRoutine,
  updateRoutineById,
  deleteRoutineById,
  getRoutineById,
  getAllRoutines,
  getExercisesByTarget,
};
