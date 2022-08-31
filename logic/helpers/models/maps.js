const MapsModel = (DataTypes) => {
    return {
        map_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            default: "{x: 25 , y: 25}"
        },
        defaultTerrain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        terrain: {
            type: DataTypes.STRING,
            defaultValue: "{}"
        },
        objects: {
            type: DataTypes.STRING,
            defaultValue: "{}"
        }
    };
};

module.exports = MapsModel;
