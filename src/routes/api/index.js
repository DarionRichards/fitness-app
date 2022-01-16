const { Router } = require("express");

const {
  login,
  signup,
  logout,
  createNewRoutine,
  updateRoutineById,
  deleteRoutineById,
  getAllRoutines,
  getRoutineById,
  getExercisesByTarget,
} = require("../../controllers/api");

const router = Router();

router.get("/exercise/:target", getExercisesByTarget);

router.get("/routines", getAllRoutines);
router.get("/routines/:id", getRoutineById);
router.post("/routines", createNewRoutine);
router.put("/routines/:id", updateRoutineById);
router.delete("/routines/:id", deleteRoutineById);

// router.post("/exercises", createNewRoutine);
// router.put("/routines/:id", updateRoutineById);
// router.delete("/routines/:id", deleteRoutineById);

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
