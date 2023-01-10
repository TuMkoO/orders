const { Router } = require("express");
const System = require("../models/System");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const { brand, link, footer, lockedProfile } = req.body;

      // const existing = await System.findOne({ value });

      // if (existing) {
      //   return res.status(400).json({ message: "Такое значение уже добавлено" });
      // }

      const system = new System({
        brand,
        link,
        footer,
        lockedProfile,
      });

      await system.save();

      res.status(201).json({ system });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const system = await System.find();
    res.json(system);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const system = await System.findById(req.params.id);
    res.json(system);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    const value = req.body;

    try {
      const systemData = await System.findByIdAndUpdate(req.params.id, value, {
        new: true,
      });
      // res.status(200).json({ message: "Значение успешно обновлено" });
      res.status(201).json({ systemData });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const system = await System.findByIdAndDelete(id);
      res.status(200).json({ message: "Запись успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
