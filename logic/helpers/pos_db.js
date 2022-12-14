var pos = {},
mapPos = {};

const setData = (id, nickname, level, speed) => {
    if (!pos[id]){
        pos[id] = {
            id,
            nickname,
            level,
            speed
        };
    }
    else {
        pos[id].nickname = nickname;
        pos[id].level = level;
    }
}

const setPos = (id, map, x, y, a ) => {
    if (!pos[id]) {
        pos[id] = {
            id,
            map,
            x: parseFloat(x),
            y: parseFloat(y),
            a: parseFloat(a)
        };
    }
    else {
        pos[id].map = map;
        pos[id].x = parseFloat(x);
        pos[id].y = parseFloat(y);
        pos[id].a = parseFloat(a);
    }
    if(!mapPos[map]) mapPos[map] = {};
    mapPos[map][id] = pos[id];
};

const getPos = (id) => {
    if (pos[id]) return pos[id];
    return null;
};

const getAllPos = () => {
    return pos;
};

const getMapPos = (map) => {
    return (mapPos[map] ? mapPos[map] : {});
};

const delPos = (id) => {
    if (pos[id]) delete pos[id];
};

const clearPos = () => {
    pos = {};
};

var CHATS = {
    global: [],
    admin: []
};

const addMessage = (id , chat , nickname, message) => {
    if(CHATS[chat])
    CHATS[chat].push({
        id:id,
        c: chat,
        n: nickname,
        m: message
    });
};

const getMessages = (chat) => {
    let mess = [];
    for(let m = (CHATS[chat].length - 1) ; m > 0 && m > (CHATS[chat].length - 25) ; m--){
        if(CHATS[m]) mess.push(CHATS[m]);
    }
    return mess.reverse();
}

module.exports = { setData , setPos, getPos, delPos
, getMapPos, getAllPos, clearPos , addMessage , getMessages};
