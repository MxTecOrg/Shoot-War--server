var pos = {};

const setPos = (id , x , y , a) => {
    pos[id] = {
        x , y , a
    }
};

const getPos = (id) => {
    if(pos[id]) return pos[id];
    return null;
};

const delPos = (id) => {
    if(pos[id]) delete pos[id];
}

module.exports = {setPos , getPos , delPos};