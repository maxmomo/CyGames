const User = require("../../models/User")

const setAvatarUser = async (req, res) => {
    params = req.query

    user = await User.findOne({
        where: {
            id: params['user_id']
          }
    });

    user.avatar = params['avatar'];
    user.save();
    
    res.json(user)

};


module.exports = {setAvatarUser};
