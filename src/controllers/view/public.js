const { returnRandomArrayElements } = require("../../helpers");
const { Routine, Exercise, ExerciseRoutine, User } = require("../../models");
const {
  getExercisesByTarget,
  getRoutinesByUser,
  getAllRoutines,
} = require("../api");

const renderLogin = (req, res) => {
  res.render("login");
};

const renderHome = async (req, res) => {
  const { loggedIn } = req.session;

  const routines = await getAllRoutines();

  const topFiveRoutines = returnRandomArrayElements(routines, 5);

  if (!loggedIn) {
    return res.render("home", { topFiveRoutines });
  } else {
    const { firstName, lastName } = req.session.user;

    return res.render("home", {
      loggedIn,
      firstName,
      lastName,
      topFiveRoutines,
    });
  }
};

const renderSignUp = (req, res) => {
  res.render("signup");
};

const renderRoutines = async (req, res) => {
  const { loggedIn } = req.session;

  const routines = await Routine.findAll({
    include: [
      {
        model: Exercise,
        through: ExerciseRoutine,
      },
      {
        model: User,
      },
    ],
  });

  const allRoutines = routines.map((each) => {
    return each.get({
      plain: true,
    });
  });
  console.log(allRoutines);
  res.render("routines", { loggedIn, allRoutines });
};

const renderRoutine = async (req, res) => {
  const { loggedIn, id } = req.session;

  const routineData = await Routine.findByPk(req.params.id, {
    include: [
      {
        model: Exercise,
        through: ExerciseRoutine,
      },
      {
        model: User,
      },
    ],
  }).catch((err) => {
    res.json(err);
  });

  const routine = routineData.get({ plain: true });
  res.render("routine", { loggedIn, routine, id });
};

const renderExercises = async (req, res) => {
  const { loggedIn } = req.session;

  const routines = await getRoutinesByUser(req);

  if (!loggedIn) {
    return res.render("exercises");
  } else {
    return res.render("exercises", { loggedIn, routines });
  }
};

const renderExercise = async (req, res) => {
  const { loggedIn } = req.session;

  if (!loggedIn) {
    const selected = await getExercisesByTarget(req.params.target);
    return res.render("exercises", { selected });
  } else {
    const selected = await getExercisesByTarget(req.params.target);
    const routines = await getRoutinesByUser(req);
    return res.render("exercises", {
      selected,
      routines,
      loggedIn,
    });
  }
};
module.exports = {
  renderHome,
  renderLogin,
  renderSignUp,
  renderExercise,
  renderExercises,
  renderRoutine,
  renderRoutines,
};
