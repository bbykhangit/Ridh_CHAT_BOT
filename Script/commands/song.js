const fs = require("fs-extra");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const axios = require("axios");

module.exports.config = {
    name: "song",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Custom Bot",
    description: "YouTube থেকে গান প্লে বা ডাউনলোড করার কমান্ড",
    commandCategory: "media",
    usages: "[গানের নাম]",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const songName = args.join(" ");
    if (!songName) return api.sendMessage("❌ দয়া করে গানের নাম লিখুন! যেমন: &song nsc songs", event.threadID, event.messageID);

    try {
        api.sendMessage(`🔍 "${songName}" গানটি খোঁজা হচ্ছে, একটু অপেক্ষা করুন...`, event.threadID, event.messageID);

        const searchResults = await yts(songName);
        const video = searchResults.videos[0];

        if (!video) return api.sendMessage("❌ কোনো গান পাওয়া যায়নি!", event.threadID, event.messageID);

        const path = __dirname + `/cache/${event.messageID}_song.mp3`;
        const stream = ytdl(video.url, { filter: "audioonly", quality: "highestaudio" });

        stream.pipe(fs.createWriteStream(path)).on("finish", () => {
            api.sendMessage({
                body: `🎶 **গানের নাম:** ${video.title}\n⏱️ **সময়:** ${video.timestamp}\n🔗 **লিংক:** ${video.url}`,
                attachment: fs.createReadStream(path)
            }, event.threadID, () => {
                fs.unlinkSync(path); // ফাইলটি পাঠানোর পর ডিলিট করে দিবে
            }, event.messageID);
        }).on("error", (err) => {
            console.error(err);
            api.sendMessage("❌ গান ডাউনলোড করতে সমস্যা হয়েছে!", event.threadID, event.messageID);
        });

    } catch (error) {
        console.error(error);
        api.sendMessage("❌ কোনো সমস্যা হয়েছে, আবার চেষ্টা করুন!", event.threadID, event.messageID);
    }
};
