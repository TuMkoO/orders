const { Router } = require("express");
const Numbering = require("../models/OrderTrainingNumbering");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const { prefix, num } = req.body;

      const numbering = new Numbering({
        prefix,
        num,
      });

      await numbering.save();

      res.status(201).json({ numbering });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    try {
      const numbering = await Numbering.find();
      res.json(numbering);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    const value = req.body;

    try {
      await Numbering.findByIdAndUpdate(req.params.id, value);
      res.status(200).json({ message: "Значение успешно обновлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
