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

      // let existing = null;

      // if (number) {
      //   existing = await Order.findOne({ number });
      // }

      // if (existing) {
      //   return res
      //     .status(400)
      //     .json({ message: "Такое значение уже добавлено" });
      // }

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

// router.get(
//   "/:id",
//   authMiddleware,
//   roleMiddleware(["admin", "god", "user"]),
//   async (req, res) => {
//     try {
//       const order = await Order.findById(req.params.id);

//       res.json(order);
//     } catch (e) {
//       res
//         .status(500)
//         .json({ message: "Что-то пошло не так, попробуйте снова" });
//     }
//   }
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   roleMiddleware(["admin", "god", "user"]),
//   async (req, res) => {
//     try {
//       const id = req.params.id;
//       const order = await Order.findByIdAndDelete(id);
//       res.status(200).json({ message: "Заявка успешно удалена!" });
//     } catch (e) {
//       res
//         .status(500)
//         .json({ message: "Что-то пошло не так, попробуйте снова" });
//     }
//   }
// );

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    const value = req.body;
    // console.log("req.body==", req.body);

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
