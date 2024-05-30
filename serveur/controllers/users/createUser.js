const User = require("../../models/User")
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    params = req.query
    result = ""

    users = await User.findAll({
        where: {
            [Op.or]: [
                { email: params['email'] },
                { userName: params['userName'] }
            ]
          }
    })

    const pastHash = await bcrypt.hash(params['password'], 10)

    if (users.length == 0) {
        const user = await User.create({
            email: params['email'],
            userName: params['userName'],
            password: pastHash
        })

        result = user
    } else {
        result = "User already exists"
    }
    
    res.json(result)

};


module.exports = {createUser};
