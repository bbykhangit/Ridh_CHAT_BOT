const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
 name: "helpall",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "SHAHADAT SAHU",
 description: "Displays all available commands in one page",
 commandCategory: "system",
 usages: "[No args]",
 cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
 const { commands } = global.client;
 const { threadID, messageID } = event;

 const allCommands = [];

 for (let [name] of commands) {
 if (name && name.trim() !== "") {
 allCommands.push(name.trim());
 }
 }

 allCommands.sort();

 const finalText = `╔═══❖ 🌟 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓 🌟 ❖═══╗
${allCommands.map(cmd => `║ ➔ ${cmd}`).join("\n")}
╠═════🔰 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 🔰═════╣
║ 🤖 𝐁𝐨𝐭: ─꯭─⃝‌‌𝗥丨𝗶𝗱𝗵 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭
║ 👑 𝐎𝐰𝐧𝐞𝐫: 𝗥丨𝗶𝗱𝗵 𝗜𝘀𝗹𝗮𝗺 𝗔𝘆𝗮𝗻
║ 📦 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${allCommands.length} 
╚═══════════════════════╝`;

 // 🔹 এখানে আপনার ফটো Imgur লিংক করে বসাবেন ✅
 
 const backgrounds = [
    "https://i.postimg.cc/3RghXCnX/IMG-20260601-150213.jpg",
    "https://i.postimg.cc/nrzmjzGB/ccb5cbf3248477f0a9f86b410307caea.jpg",
    "https://i.postimg.cc/Dzn84025/Screenshot-2026-07-19-01-50-45-96-99c04817c0de5652397fc8b56c3b3817.jpg",
    "https://i.postimg.cc/Bncv33x4/06d5711567ef90ee6c6125783c5f99ac-0.jpg"
 ];
 const selectedBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
 const imgPath = __dirname + "/cache/helpallbg.jpg";

 const callback = () =>
 api.sendMessage({ body: finalText, attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);

 request(encodeURI(selectedBg))
 .pipe(fs.createWriteStream(imgPath))
 .on("close", () => callback());
};
