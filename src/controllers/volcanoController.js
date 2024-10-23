import { Router } from "express";
import volcanoService from "../services/volcanoService.js";
import { getErrorMsg } from "../utils/errorUtil.js";

const router = Router();

/* ############################
########### CATALOG
############################# */
router.get('/catalog', async (req, res) => {
   const volcanoes = await volcanoService.getAll().lean();
   res.render("volcano/catalog", { title: "Catalog Page", volcanoes });
})



/* ############################
########### CREATE
############################# */

router.get("/create", (req, res) => {

   const volcanoDataType = getVolcanoTypeViewData({});
  res.render("volcano/create", { title: "Edit Page", volcanoDataType });
});



router.post("/create", async (req, res) => {
  const volcanoData = req.body;
  const userId = req.user._id;

  try {
    await volcanoService.create(volcanoData, userId);

    res.redirect("/volcano/catalog");
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

/* ############################
########### DETAILs
############################# */

router.get('/:volcanoId/details',async (req, res) => {
   const volcanoId = req.params.volcanoId;

   const volcano = await volcanoService.getOne(volcanoId).lean();
   res.render('volcano/details', {title: "Details Page", volcano});
});

// FIXME: This is function for options and. 
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
