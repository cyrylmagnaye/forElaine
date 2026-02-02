// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  valentineName: "Elaine",
  pageTitle: "To Elaine",

  fonts: {
    title: "deagoiset.regular",
    subtitle: "astralaga",
    message: "astralaga",
    button: "charter",
  },

  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"],
  },

  questions: {
    first: {
      text: "Do you like me?",
      yesBtn: "Yes",
      noBtn: "No",
      secretAnswer: "I don't like you, I love you! ❤︎",
    },
    second: {
      text: "How much do you love me?",
      startText: "This much!",
      nextBtn: "Next",
    },
    third: {
      text: "Will you be my Valentine on\n February 14th? 🌹",
      yesBtn: "Yes!",
      noBtn: "No",
    },
  },

  loveMessages: {
    extreme: "WOW You love me that much?? ",
    high: "To infinity and beyond! ",
    normal: "And beyond! ",
  },

  celebration: {
    title: "Yay! I'm the luckiest person in the world!",
    message:
      "Now we get to disappear into our own little bubble—movies on, snacks and food in hand, and you on the call making me smile while you distract me in the best way.",
    emojis: "",

    // ✅ Celebration Video (MP4)
    video: {
      enabled: true,
      src: "./assets/russel-1.gif", // local test gif
      poster: "",

      controls: false,
      autoplay: true,
      muted: true, // muted helps autoplay work on most browsers
      loop: false,
      playsInline: true,

      caption: "",
    },
  },

  colors: {
    backgroundStart: "#3B010B",
    backgroundEnd: "#560B18",
    buttonBackground: "#75162D",
    buttonHover: "#560B18",
    textColor: "#F2E5C6",
  },

  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5,
  },

  music: {
  enabled: true,
  autoplay: true,
  musicUrl: "./assets/renees-song.mp3",
  startText: "🎵 Play Music",
  stopText: "🔇 Stop Music",
  volume: 0.5,
  },
};

window.VALENTINE_CONFIG = CONFIG;
