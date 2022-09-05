const config = require("../../config.js");
const { setMove } = require(config.LOGIC + "/engine/looper.js");
const {getPos , setPos} = require(config.LOGIC + "/helpers/pos_db.js");

var lastMove = {};

const move = async (io , socket , id) => {
    socket.on("move" , (data) => {
        const atime = new Date().getTime();
        if((lastMove[id] ? lastMove[id] : 0) + 33 <= atime && data.x && data.y && data.a){
            lastMove[id] = atime;
            const {map} = getPos(id);
            setPos(id , map , data.x , data.y , data.a);
            setMove(id , map , data.x , data.y , data.a);
        }
    });
};

module.exports = move;
