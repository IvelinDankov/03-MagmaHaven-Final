import { Router } from "express";
import volcanoService from "../services/volcanoService.js";
import { getErrorMsg } from "../utils/errorUtil.js";

const router = Router();

router.get("/create", (req, res) => {
  res.render("volcano/create", { title: "Edit Page" });
});

router.post("/create", async (req, res) => {
  const volcanoData = req.body;
  const userId = req.user._id;

  try {
    await volcanoService.create(volcanoData, userId);

    res.redirect("/volcano");
  } catch (err) {
    const error = getErrorMsg(err);
    const volcanoDataType = getVolcanoTypeViewData(volcanoData);
    res.render("volcano/create", {
      title: "Edit Page",
      volcano: volcanoData,
      volcanoTypes: volcanoDataType,
      error,
    });
  }
});

function getVolcanoTypeViewData({ typeVolcano }) {
  const volcanoTypes = [
    "Supervolcanoes",
    "Submarine",
    "Subglacial",
    "Mud",
    "Stratovolcanoes",
    "Shield",
  ];

  const viewData = volcanoTypes.map((type) => ({
    value: type,
    label: type,
    selected: typeVolcano === type ? "selected" : "",
  }));

  return viewData;
}

export default router;
