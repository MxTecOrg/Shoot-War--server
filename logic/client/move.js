const config = require("../../config.js");
const { setMove } = require(config.LOGIC + "/engine/looper.js");
const { getPos, setPos } = require(config.LOGIC + "/helpers/pos_db.js");

var lastMove = {};

const circleXY = (s, theta) => {
    theta = (theta - 90) * Math.PI / 180;
    return {
        x: s * Math.cos(theta.toFixed(5)),
        y: -s * Math.sin(theta.toFixed(5))
    };
}

const move = async (io, socket, id) => {
    socket.on("move", (data) => {
        const atime = new Date().getTime();
        if ((lastMove[id] ? lastMove[id] : 0) + 33 <= atime && data.x && data.y && data.a) {
            lastMove[id] = atime;
            let { map , x , y } = getPos(id);
            const xy = circleXY(3 , data.a);
            x += -xy.x;
            y += -xy.y;
            setPos(id, map, x , y , data.a);
            setMove(id, map, x , y , data.a);
        }
    });
};

module.exports = move;
