# Nodejs-backend-learning-Todo 

This purpose of this repo is used to build backend using Node, Express and Mongo DB by gradually learning and implementing standard coding practices

Folder structure of Node js server

my-express-app/
├── src/
│   ├── config/                  # Configuration files (database, environment variables)
│   │   ├── db.js                # MongoDB connection
│   │   └── config.js            # Other configuration settings
│   ├── controllers/             # Controllers for handling requests
│   │   ├── userController.js     # User-related logic
│   │   └── todoController.js  # todo-related logic
│   ├── middlewares/             # Custom middleware
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/                  # Mongoose models for MongoDB
│   │   ├── User.js               # User model
│   │   └── todo.js            # todo model
│   ├── routes/                  # Route definitions
│   │   ├── userRoutes.js         # User routes
│   │   └── todoRoutes.js      # todo routes
│   ├── services/                # Business logic and services
│   │   ├── userService.js        # User-related services
│   │   └── todoService.js     # todo-related services
│   ├── utils/                   # Utility functions
│   │   ├── logger.js             # Logging utility
│   │   └── helper.js             # Miscellaneous helper functions
│   ├── validations/             # Input validations
│   │   ├── userValidation.js      # User input validations
│   │   └── todoValidation.js   # todo input validations
│   ├── app.js                   # Main application file
│   └── server.js                # Entry point of the application
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # NPM package file
└── README.md                    # Project documentation


