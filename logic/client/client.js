const config = require("../../config.js");
const { User } = require(config.LOGIC + "/helpers/DB.js");
const {setData} = require(config.LOGIC + "/helpers/pos_db.js");
const admin = require("./admin.js");
const map = require("./map.js");
const move = require("./move.js");

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
        id: user.id,
        username: user.username,
        nickname: nickname,
        level: user.level,
        xp: user.xp,
        gold: user.gold,
        gems: user.gems,
        spins: user.spins,
        vip: user.vip,
        map: user.map,
        pos: user.getData(["pos"]).pos
    });
    
    setData(user.id , nickname , level);
    
    map(io , socket , id);
    
    admin(io , socket , id);
    
    move(io , socket , user.id);

};

module.exports = client;
