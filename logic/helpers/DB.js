const config = require("../../config.js");
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const UserModel = require("./models/user.js");
const MapsModel = require("./models/maps.js");


/**********************
 * Iniciando Conexion *
 **********************/
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB + '/database.sqlite',
    logging: false
});

(async () => {
    try {
        sequelize.authenticate();
    } catch (err) {
        throw new Error("" + err)
    }
})();

const sequelize2 = new Sequelize({
    dialect: 'sqlite',
    storage: config.DB + '/maps.sqlite',
    logging: false
});

(async () => {
    try {
        sequelize2.authenticate();
    } catch (err) {
        throw new Error("" + err)
    }
})();

/*********************
 * Modelo de Usuario *
 *********************/
class User extends Model {
    getData(_rows) {
        const rows = _rows;
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof(obj[o]) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

User.init(
    UserModel(DataTypes),
    {
        sequelize
    }
);

(async () => {
    await User.sync();
})();

/*******************
 * Modelo de Mapas *
 *******************/
class Map extends Model {
    getData(_rows) {
        const rows = _rows;
        let ret = {};
        for (let row of rows) {
            if (this[row]) {
                try {
                    ret[row] = JSON.parse(this[row]);
                } catch (err) {
                    ret[row] = this[row];
                }
            }
        }
        return ret;
    }

    async setData(obj) {
        let parsedObj = {};
        for (let o in obj) {
            if (this[o] == undefined) continue;
            parsedObj[o] = (typeof(obj[o]) === "object" ? JSON.stringify(obj[o]) : obj[o]);
        }
        try {
            await this.update(parsedObj);
            return true;
        } catch (err) {
            console.err(err);
            return false;
        }
    }
}

Map.init(
    MapsModel(DataTypes),
    {
        sequelize2
    }
);

(async () => {
    await Map.sync();
})();


module.exports = {
    User,
    Map,
    Op
}
