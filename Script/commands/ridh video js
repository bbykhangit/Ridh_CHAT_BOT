const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
    name: "video",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Custom",
    description: "Personal video command",
    commandCategory: "media",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const videoUrl = "https://files.catbox.moe/zavvuq.mp4"; 
    const cachePath = __dirname + "/cache/myvideo.mp4";

    try {
        const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(cachePath, Buffer.from(response.data, "utf-8"));
        
        return api.sendMessage(
            {
                body: "এই নিন ridh sir er ভিডিও!",
                attachment: fs.createReadStream(cachePath)
            },
            event.threadID,
            () => fs.unlinkSync(cachePath),
            event.messageID
        );
    } catch (error) {
        return api.sendMessage("ভিডিও পাঠাতে সমস্যা হয়েছে!", event.threadID, event.messageID);
    }
};
