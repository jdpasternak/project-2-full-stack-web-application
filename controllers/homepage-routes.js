const router = require("express").Router();
const {
  User,
  Activity,
  Interest,
  UserDietaryPref,
  UserInterest,
  DietaryPref,
  Attendance,
} = require("../models");
const { withAuth } = require("../utils/auth");

//need routes to navigate throughout the app
//just get routes for events

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("landing-page", { loggedIn: req.session.loggedIn });
});

// [ ] TODO add routes to the users personal notifications

// GET /homepage
router.get("/homepage", withAuth, (req, res) => {
  // [ ] TODO add homepage data
  res.render("homepage", { loggedIn: req.session.loggedIn });
});

router.get("/browsing", withAuth, (req, res) => {
  Activity.findAll({
    attributes: ["id", "title", "description"],
  })
    .then((dbActivityData) => {
      const activities = dbActivityData.map((activity) =>
        activity.get({ plain: true })
      );
      res.render("browsing", {
        activities,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /login
router.get("/login", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

// GET /signup
router.get("/signup", (req, res) => {
  res.render("signup", { loggedIn: req.session.loggedIn });
});

// GET /profile
// a logged-in user's profile
router.get("/profile", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ["id", "username", "email", "zip"],
    include: [
      {
        model: Interest,
        attributes: ["id", "name"],
        through: UserInterest,
        as: "interests",
      },
      {
        model: DietaryPref,
        attributes: ["id", "name"],
        through: UserDietaryPref,
        as: "dietary_preferences",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with that ID." });
        return;
      }
      const user = dbUserData.get({ plain: true });
      console.log(user);
      res.render("userprofile", {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* 
    GET /activity/edit/:id
    Renders a view allowing a user to edit an activity
*/
router.get("/activity/:id/edit", withAuth, (req, res) => {
  Activity.findOne({
    where: { id: req.params.id },
    include: [{ model: User, attributes: ["id", "username"] }],
  })
    .then((dbActivityData) => {
      res.render("edit-activity", {
        activity: dbActivityData.get({ plain: true }),
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get(
  "/activity/zip/:location",
  /* withAuth, */ (req, res) => {
    Activity.findAll({
      where: {
        location: req.params.location,
      },
      attributes: ["id", "title", "description"],
    })
      .then((dbActivityData) => {
        if (dbActivityData.length < 1) {
          res.render("browsing", {
            activities: [{ title: "No activities found" }],
            loggedIn: req.session.loggedIn,
          });
          return;
        }
        const activities = dbActivityData.map((activity) =>
          activity.get({ plain: true })
        );
        res.render("browsing", { activities, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
);

router.get("/activity/new", withAuth, (req, res) => {
  res.render("newActivity", { loggedIn: req.session.loggedIn });
});

router.get("/activity/:id", withAuth, async (req, res) => {
  try {
    const dbActivityData = await Activity.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ["id", "username"] }],
    });
    const attendances = await Attendance.findAndCountAll({
      where: { activity_id: req.params.id },
    });
    console.log(dbActivityData.get({ plain: true }));
    res.render("activity", {
      activity: dbActivityData.get({ plain: true }),
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
      attendances: attendances.count,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
