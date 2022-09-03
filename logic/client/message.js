const config = require("../../config.js");
const { User, Map, Op } = require(config.LOGIC + "/helpers/DB.js");
const { getMessages, addMessage } = require(config.LOGIC + "/helpers/pos_db.js");

const message = (io, socket, id) => {
    const user = User.findOne({
        where: {
            user_id: id
        }
    });
    if (!user) return;
    
    socket.emit("gmsg" , getMessages("global"));
    if(user.accLevel > 1) socket.emit("gmsg" , getMessages("admin"));
    
    socket.on("msg", async (data) => {
        if(!data.chat || !data.msg || data.msg == " ") return;
        addMessage(user.id , data.chat, user.nickname , data.msg);
        socket.broadcast.to(data.chat).emit("msg", {
            id: user.id,
            c: data.chat,
            n: user.nickname,
            m: data.msg
        });
    });
};

module.exports = message;
