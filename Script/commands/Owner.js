const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Show Owner Info with styled box & random photo",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  
  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : 𝗥丨𝗶𝗱𝗵 𝗜𝘀𝗹𝗮𝗺 𝗔𝘆𝗮𝗻
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : 𝗥丨𝗶𝗱𝗵
║ 🎂 𝗔𝗴𝗲 : 𝟭𝟳+
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗶𝗻𝗴𝗹𝗲
║ 🎓 𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗶𝗼𝗻 : 𝗝𝗼𝗯 𝗛𝗼𝗹𝗱𝗲𝗿𝘀
║ 📚 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗰𝗰
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : 𝗖𝗼𝘅 𝗕𝗮𝘇𝗮𝗿
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
╠═════════════════════ ✿
║ 📘 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 :www.facebook.com/61591763713247
║ 💬 𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿 :m.me/61591763713247
║ 📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 :wa.me/01825784274
║ ✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺 :t.me/@Ayan5478
╚═════════════════════ ✿
`;

  const images = [
    "https://i.postimg.cc/3RghXCnX/IMG-20260601-150213.jpg",
    "https://i.postimg.cc/nrzmjzGB/ccb5cbf3248477f0a9f86b410307caea.jpg",
    "https://i.postimg.cc/Dzn84025/Screenshot-2026-07-19-01-50-45-96-99c04817c0de5652397fc8b56c3b3817.jpg",
    "https://i.postimg.cc/Bncv33x4/06d5711567ef90ee6c6125783c5f99ac-0.jpg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];

  const callback = () => api.sendMessage(
    {
      body: info,
      attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/owner.jpg")
  );

  return request(encodeURI(randomImg))
    .pipe(fs.createWriteStream(__dirname + "/cache/owner.jpg"))
    .on("close", () => callback());
};
