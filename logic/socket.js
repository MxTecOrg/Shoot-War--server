const config = require("../config.js");
const io = require(config.DIRNAME + "/server.js");
const client = require(config.LOGIC + "/client/client.js");
const { User } = require(config.LOGIC + "/helpers/DB.js");

io.on("connection", async (socket) => {
    if (!socket.handshake.query) {
        socket.emit("error", "EMPTY_TOKEN");
        socket.disconnect();
        return;
    }
    const token = socket.handshake.query.token;
    if (!token) {
        socket.emit("error", "EMPTY_TOKEN")
        socket.disconnect();
        return;
    }

    let id;
    try {
        id = Buffer.from(token).toString("base64");
    } catch (err) {
        id = null;
        console.log(err);
    }
    if (!id) {
        socket.emit("error", "WRONG_TOKEN");
        socket.disconnect();
        return;
    }
    let user = await User.findOne({
        where: {
            user_id: id
        }
    });
    if (!user) {
        const cuser = () => {
            user = await User.create({
                user_id: id,
                username: String(id),
                nickname: "GUESS_#####".replace(/#/g, (n) => Math.floor(Math.random() * 9))
            });
            if(!user) cuser();
            else {
                await user.setData({
                    pos: config.GAME.start_pos,
                    map: config.GAME.start_map
                });
            }
        }
        cuser();
    }
    
    if(user.acc_level == 0){
        socket.emit("error" , "ACCOUNT_BANNED");
        socket.disconnect();
        return;
    }

    if (io.sockets[id]) {
        io.sockets[id].emit("error", "OTHER_CONNECT");
        io.sockets[id].disconnect();
        delete io.sockets[id];
    }
    io.sockets[id] = socket;
    await user.setData({
        isOnline: true
    });

    socket.__id__ = id;

    client(io, socket, id);

    socket.on("disconnect", async (data) => {
        const _user = await User.findOne({
            where: {
                user_id: id
            }
        });
        await _user.setData({
            isOnline: false
        });
        delete io.sockets[id];
    });
});

module.exports = true;
