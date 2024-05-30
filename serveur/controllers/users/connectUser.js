const User = require("../../models/User")
const bcrypt = require("bcrypt")

const connectUser = async (req, res) => {
    params = req.query
    result = ""

    user = await User.findAll({
        where: {
            email: params['email'],
        }
    })

    if (user.length == 0) {
        result = false
    } else {
        console.log(params['password'], user[0].password)
        if (await bcrypt.compare(params['password'], user[0].password)) {
            result = user[0]
        } else {
            result = false
        }
    }
    
    res.json(result)

};

module.exports = {connectUser};
