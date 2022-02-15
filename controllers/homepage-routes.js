const router = require("express").Router();
const { zip } = require("lodash");
const { where } = require("sequelize/types");
const sequelize = require("../../config/connection");
const { User, Activity, Interest, UserDietaryPref } = require('../models')
const withAuth = require('../utils/auth')
//need routes to navigate throughout the app
//just get routes for events
//wait a minute Ive alread done this
router.get("/", (req, res) => {
  res.json({ message: "Not a configured route" });
});
// need routes to the users personal notifications
//

//home
//login
//profile
//:id
//activity/ 
//id

router.get('/homepage', (req, res) => {
  if (req.session.loggedIn) {
    res.render('homepage');
    return;
  } 
})
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/profile', withAuth, (req, res) => {
  if (req.session.loggedIn) {router.get(User, Activity, Interest), (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'user_id',
        'username',
        'email',
        'zip',
      ],
      include: [
        {model: User,
        attributes: [
          'id',
          'username',
          'email',
          'zip'
        ]
        }
      ]
    }
)
  Interest.findAll({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
    ],
    include: [
      {model: Interest,
      attributes: [
        'id',
        'name',
      ]}
    ]
  })
  UserDietaryPref.findOne({
    where: {
      id:req.params.id
    },
    attributes: [
      'id',
      'user_id',
      'dietary_pref_id'
    ]
  })
  .then(dbUserData => {
    const user = dbUserData.map(user => user.get({ plain: true }));
    res.render('userprofile') ({ posts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
res.render('userprofile', {
  User,
  Interest,
  loggedIn: req.session.loggedIn
})
  }}
})
router.get("/", withAuth, (req, res) => {
  
})
router.get("/", withAuth, (req, res) => {
  Interest.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'description'
    ],
    include: [
      {
      model: Interest,
      attributes: [
        'id',
        'name',
        'description'
      ]
      }
    ]
  })
})
router.get("/", withAuth, (req, res) => {
  Activity.findAll ({
  attribures: [
    'id',
    'title',
    'description',
    'location',
    'occurence',
    'organizer_id',
    'is_private',
    'seats',
    'rules',
    'price',
    'req_dietary_pref',
    'interest_id'
  ],
  include: [{
    model: 'Activity',
    attributes: ['id',
    'title',
    'description',
    'location',
    'occurence',
    'organizer_id',
    'is_private',
    'seats',
    'rules',
    'price',
    'req_dietary_pref',
    'interest_id']
  }
  ]
    })
    .then(dbactivityData => {
      const activity =dbactivityData.map(activity => activity.get({ plain: true }));
      res.render('activity') ({ posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});
/* organizer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rules: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    req_dietary_pref: {
      type: DataTypes.BOOLEAN,
    },
    interest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,*/