/* Base Config */
const config = {
    URL: "https://mxtec-org-fire.glitch.me",
    PORT: process.env.PORT || 8081, //port
    DIRNAME: __dirname, //root folder
    DB: __dirname + "/database", //database
    LOGIC: __dirname + "/logic", //logic 
    WEBCLI: __dirname + "/webclient",
    TOKEN: {
        secret: "super_secret_token_keyword",
        expire: "365d"
    },
    GAME: {
        start_pos: {
            x: 20,
            y: 20,
            a: 0
        },
        start_map: "a_island"
    },
    SERVER: { version: "v0.0.1" },
};

module.exports = config;
