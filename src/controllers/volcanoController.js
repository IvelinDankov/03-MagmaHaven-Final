import { Router } from "express";
import volcanoService from "../services/volcanoService.js";
import { getErrorMsg } from "../utils/errorUtil.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = Router();

/* ############################
########### CATALOG
############################# */
router.get("/catalog", async (req, res) => {
  const volcanoes = await volcanoService.getAll().lean();
  res.render("volcano/catalog", { title: "Catalog Page", volcanoes });
});

/* ############################
########### CREATE
############################# */

router.get("/create", isAuth, (req, res) => {
  const volcanoDataType = getVolcanoTypeViewData({});
  res.render("volcano/create", {
    title: "Edit Page",
    volcanoTypes: volcanoDataType,
  });
});

router.post("/create", isAuth, async (req, res) => {
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

router.get("/:volcanoId/details", async (req, res) => {
  const volcanoId = req.params.volcanoId;

  const volcano = await volcanoService.getOne(volcanoId).lean();

  const isVoted = volcano.voteList.some((userId) => userId == req.user?._id);
  const isOwner = volcano.owner.toString() === req.user?._id;
  res.render("volcano/details", {
    title: "Details Page",
    volcano,
    isOwner,
    isVoted,
  });
});

/* ############################
########### VOTE
############################# */

router.get("/:volcanoId/vote", isAuth, async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = req.user._id;
  


  const isOwner = volcanoOwner(volcanoId, userId);
  
  if (isOwner) {
   return  res.redirect('/404');
  }

  try {
    await volcanoService.vote(volcanoId, userId);


    return res.redirect(`/volcano/${volcanoId}/details`);
  } catch (err) {
    // TODO: Error
    console.log(err.message);
  }
});

/* ############################
########### DELETE
############################# */

router.get("/:volcanoId/delete", isAuth, async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = req.user._id;
  await volcanoService.remove(volcanoId);

  const isOwner = volcanoOwner(volcanoId, userId);

  if (!isOwner) {
    return res.redirect('/404');
  }

  res.redirect("/volcano/catalog");
});

/* ############################
########### EDIT
############################# */

router.get("/:volcanoId/edit", isAuth, async (req, res) => {
  const volcanoId = req.params.volcanoId;
  const userId = req.user._id;
  const volcano = await volcanoService.getOne(volcanoId).lean();
  const volcanoDataType = getVolcanoTypeViewData(volcano);

  const isOwner = volcanoOwner(volcanoId, userId);

  if (!isOwner) {
    return res.redirect('/404');
  }

  res.render("volcano/edit", {
    title: "Edit Page",
    volcano,
    volcanoTypes: volcanoDataType,
  });
});

router.post("/:volcanoId/edit", isAuth, async (req, res) => {
  const userId = req.user._id;
  const volcanoId = req.params.volcanoId;
  const volcanoData = req.body;

  
  const isOwner = volcanoOwner(volcanoId, userId);

  if (!isOwner) {
    return res.redirect("/404");
  }


  try {
    await volcanoService.edit(volcanoId, volcanoData);

    res.redirect(`/volcano/${volcanoId}/details`);
  } catch (err) {
    const error = getErrorMsg(err);
    const volcanoDataType = getVolcanoTypeViewData(volcanoData);
    res.render("volcano/edit", {
      title: "Edit Page",
      volcano: volcanoData,
      volcanoTypes: volcanoDataType,
      error,
    });
  }
});

/* ############################
########### HELPERs
############################# */
async function volcanoOwner(volcanoId, userId) {
  const volcano = await volcanoService.getOne(volcanoId);
  const isOwner = volcano.owner.toString() === userId;

  return isOwner;
}


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
