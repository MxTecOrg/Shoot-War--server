const config = require("../../config.js");
const { User } = require(config.LOGIC + "/helpers/DB.js");
const admin = require("./admin.js");

const client = async (io, socket, id) => {
    const user = await User.findOne({
        where: {
            user_id: id
        }
    });

    if (!user) {
        socket.emit("error", "USER_NOT_FOUND");
        socket.disconnect();
        return;
    }


    socket.emit("user-data", {
        user_id: user.user_id,
        username: user.username,
        nickname: nickname,
        level: user.level,
        xp: user.xp,
        gold: user.gold,
        gems: user.gems,
        spins: user.spins,
        vip: user.vip
    });
    
    admin(io , socket , id);

};

module.exports = client;
