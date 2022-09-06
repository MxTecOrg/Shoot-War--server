const config = require("../../config.js");
const { setMove } = require(config.LOGIC + "/engine/looper.js");
const { getPos, setPos } = require(config.LOGIC + "/helpers/pos_db.js");

var lastMove = {};

const circleXY = (s, theta) => {
    //theta = (theta - 90) * Math.PI / 180;
    return {
        x: s * Math.cos(theta.toFixed(5)),
        y: s * Math.sin(theta.toFixed(5))
    };
}

const move = async (io, socket, id) => {
    socket.on("move", (data) => {
        const atime = new Date().getTime();
        if ((lastMove[id] ? lastMove[id] : 0) + 5 <= atime &&
            (data[0] > 1 ? 1 : (data[0] < -1 ? -1 : data[0])) &&
            (data[1] > 1 ? 1 : (data[1] < -1 ? -1 : data[1]))) {
            lastMove[id] = atime;
            let { map, x, y , speed } = getPos(id);
            
            x += data[0] * speed;
            y += data[1] * speed;
            setPos(id, map, x, y, data[2]);
            setMove(id, map, x, y, data[2]);
        }
    });
};

module.exports = move;