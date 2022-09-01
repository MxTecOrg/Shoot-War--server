var pos = {},
mapPos = {};

const setData = (id, nickname, level) => {
    if (!pos[id]){
        pos[id] = {
            id,
            nickname,
            level
        };
    }
    else {
        pos[id].nickname = nickname;
        pos[id].level = level;
    }
}

const setPos = (id, map, x, y, a) => {
    if (!pos[id]) {
        pos[id] = {
            id,
            map,
            x,
            y,
            a
        };
    }
    else {
        pos[id].map = map;
        pos[id].x = x;
        pos[id].y = y;
        pos[id].a = a;
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
}

const getMapPos = (map) => {
    return (mapPos[map] ? mapPos[map] : {});
}

const delPos = (id) => {
    if (pos[id]) delete pos[id];
}

const clearPos = () => {
    pos = {};
}

module.exports = { setData , setPos, getPos, delPos, getMapPos, getAllPos, clearPos };
