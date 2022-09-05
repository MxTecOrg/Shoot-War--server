const config = require("../../config.js");
const {getPos} = require(config.LOGIC + "/helpers/pos_db.js");
const { User , Map , Op} = require(config.LOGIC + "/helpers/DB.js");

const admin = async (io , socket , id) => {
    let user = await User.findOne({
        where: {
            user_id: id
        }
    });
    
    if(!user || user.acclevel < 2) return;
    
    socket.join("admin");
    socket.on("a-create-map" , async (data) => {
        const map = await Map.create({
            map_id : data.map_id,
            name: data.name,
            size: JSON.stringify(data.size),
            defaultTerrain: data.defaultTerrain
        });
        
        if(map) return socket.emit("a-create-map" , true);
        return socket.emit("a-create-map" , false);
    });
    
    socket.on("a-teleport" , async (data) => {
        const map = await Map.findOne({
            where: {
                [Op.or] : [{
                    map_id : data},
                    {name: data
                }]
            }
        });
        
        if(!map) return socket.emit("a-teleport" , false);
        
        user = await User.findOne({
            where: {
                user_id : id
            }
        });
        await socket.broadcast.to(user.map).emit("del-pj" , user.id);
        await socket.leave(user.map);
        await socket.join(map.map_id);
        let pos = map.getData(["size"]).size;
        pos.a = 0;
        setPos(user.id, map.map_id, pos.x, pos.y, pos.a);
        console.log(pos);
        socket.broadcast.to(map.map_id).emit("new-pj", {
            id: user.id,
            level: user.level,
            nickname: user.nickname,
            map: user.map,
            pos: pos
        });
        user.setData({
            map: map.map_id,
            pos: {
                x: pos.x ,
                y: pos.y ,
                a: pos.a
            }
        });
        
        return socket.emit("a-teleport" , true);
    });
    
    socket.on("a-delete-map" , async (data) => {
        const map = await Map.findOne({
            where: {
                [Op.or] : [{
                    map_id : data},
                    {name: data
                }]
            }
        });
        
        if(map){
            await map.destroy();
            return socket.emit("a-delete-map" , true);
        }
        
        return socket.emit("a-delete-map" , false);
    });
    
    socket.on("a-set-tile" , async (data) => {
        const map = await Map.findOne({
            where: {
                map_id : data.map_id
            }
        }); 
        
        let tiles = map.getData([data.type]);
        
        tiles[data.tile] = {
            t: data.t,
            d: data.d,
            a: data.a
        };
        
        await map.setData({
            [data.type]: tiles
        });
    });
}

module.exports = admin;
