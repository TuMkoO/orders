const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 7, max: 32 }),
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  userController.delete
);
router.post(
  "/update",
  body("id").isLength({ min: 3 }),
  authMiddleware,
  userController.update
);
router.post(
  "/update-requisites",
  body("id").isLength({ min: 3 }),
  authMiddleware,
  userController.updateRequisites
);
router.post(
  "/update-password",
  authMiddleware,
  body("id").isLength({ min: 3 }),
  body("oldPassword").isLength({ min: 7, max: 32 }),
  body("newPassword").isLength({ min: 7, max: 32 }),
  userController.updatePassword
);
router.post(
  "/update-user-password",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  body("id").isLength({ min: 3 }),
  body("newPassword").isLength({ min: 7, max: 32 }),
  userController.updateUserPassword
);
router.get("/refresh", userController.refresh);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  userController.getUsers
);
router.get("/user", authMiddleware, userController.getUserCurrent);
router.get("/users/:id", authMiddleware, userController.getUserById);

module.exports = router;
