const { User } = require('../models');

const userData = [
    {
        username: "saladz",
        email: "ceaser_salad@gmail.com",
        password: "password1"
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;