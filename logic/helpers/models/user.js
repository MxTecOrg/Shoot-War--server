const equip = {
    head: "na",
    armor: "na",
    p_weapon: "na",
    s_weapon: "na",
    gloves: "na",
    boots: "na",
    skin: "na"
};

const UserModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstEntry: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        color: {
            type: DataTypes.STRING,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        xp: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pic: {
            type: DataTypes.STRING
        },
        daily: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        equipment: {
            type: DataTypes.STRING,
            defaultValue: JSON.stringify(equip)
        },
        inventory: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        spins: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            defaultStatus: false
        },
        lastTimeOnline: {
            type: DataTypes.INTEGER,
            defaultValue: new Date().getTime()
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        vip: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        acclevel: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }
}

module.exports = UserModel;
