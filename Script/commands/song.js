const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
    name: "song",
    version: "3.0.0",
    hasPermssion: 0,
    credits: "Custom Bot",
    description: "YouTube গান প্লে করার কমান্ড",
    commandCategory: "media",
    usages: "[গানের নাম]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const songName = args.join(" ");
    if (!songName) return api.sendMessage("❌ গানের নাম লিখুন! যেমন: &song baby doll", event.threadID, event.messageID);

    const filePath = path.join(__dirname, "cache", `${event.messageID}_song.mp3`);

    try {
        api.sendMessage(`🔍 "${songName}" গানটি প্রসেস করা হচ্ছে, কিছুক্ষণ অপেক্ষা করুন...`, event.threadID, event.messageID);

        // API Endpoint for Searching & Downloading Song
        const res = await axios.get(`https://api.tinhtue.org/youtube?search=${encodeURIComponent(songName)}`);
        
        if (!res.data || !res.data.download) {
            return api.sendMessage("❌ কোনো গান পাওয়া যায়নি বা ডাউনলোডে সমস্যা হয়েছে!", event.threadID, event.messageID);
        }

        const downloadUrl = res.data.download;
        const title = res.data.title || songName;

        const stream = await axios({
            method: 'get',
            url: downloadUrl,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);
        stream.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({
                body: `🎶 **গানের নাম:** ${title}`,
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }, event.messageID);
        });

        writer.on('error', (err) => {
            console.error(err);
            api.sendMessage("❌ অডিও ফাইল সেভ হতে সমস্যা হয়েছে!", event.threadID, event.messageID);
        });

    } catch (error) {
        console.error(error);
        api.sendMessage("❌ গান ডাউনলোড করতে সমস্যা হচ্ছে, আবার চেষ্টা করুন!", event.threadID, event.messageID);
    }
};
