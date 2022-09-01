const config = require("../../config.js");
var moves = {};

const setMove = (id , map , x , y , a) => {
    if(!moves[map]) moves[map] = {};
    moves[map][id] = {
        x , y , a
    };
};

const looper = async (io) => {
    console.log("Loop engine started");
    setInterval(() => {
        for(let m in moves){
            io.to(m).emit(moves[m]);
        }
    } , 33.33);
};

module.exports = {setMove , looper};
