const config = require("../../config.js");
const { User , Map , Op} = require(config.LOGIC + "/helpers/DB.js");
const {getMapPos , setPos} = require(config.LOGIC + "/helpers/pos_db.js");

const map = async (io , socket , id) => {
    let user = await User.findOne({
        where: {
            user_id : id
        }
    });
    if(!user) return;
    
    const _map = await Map.findOne({
        where: {
            map_id: user.map
        }
    });
    
    const pos = user.getData(["pos"]).pos;
    setPos(user.id , user.map , pos.x , pos.y , pos.a);
    socket.join(user.map);
    socket.to(user.map).broadcast("new-pj" , {
        id: user.id,
        level: user.level,
        nickname: user.nickname,
        map: user.map,
        pos: pos
    });
    const m = _map.getData(["name" , "defaultTerrain" ,
    "terrain" , "objects" , "size"]);
    m.pjs = getMapPos(user.map);
    socket.emit("map-data" , m);
}

module.exports = map;
