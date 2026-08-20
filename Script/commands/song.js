const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
    name: "song",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Custom Bot",
    description: "YouTube থেকে গান নামানোর কাজ করবে",
    commandCategory: "media",
    usages: "[গানের নাম]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const songName = args.join(" ");
    if (!songName) return api.sendMessage("❌ গানের নাম লিখুন!", event.threadID, event.messageID);

    const path = __dirname + `/cache/${event.messageID}_song.mp3`;

    try {
        api.sendMessage(`🔍 "${songName}" ডাউনলোড করা হচ্ছে, অপেক্ষা করুন...`, event.threadID, event.messageID);

        // Working Public Music API
        const res = await axios.get(`https://api.popcat.xyz/song?q=${encodeURIComponent(songName)}`);
        
        if (!res.data || !res.data.media) {
            return api.sendMessage("❌ কোনো গান পাওয়া যায়নি!", event.threadID, event.messageID);
        }

        const audioUrl = res.data.media;
        const title = res.data.title || songName;

        const response = await axios({
            method: 'get',
            url: audioUrl,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(path);
        response.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({
                body: `🎶 **গানের নাম:** ${title}`,
                attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);
        });

        writer.on('error', () => {
            api.sendMessage("❌ ফাইল সেভ করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
        });

    } catch (error) {
        console.error(error);
        api.sendMessage("❌ গান সার্ভার থেকে নামাতে ব্যর্থ হয়েছে, অন্য গানের নাম লিখে ট্রাই করুন!", event.threadID, event.messageID);
    }
};
