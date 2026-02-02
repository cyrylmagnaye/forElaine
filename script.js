// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
  const warnings = [];

  if (!config.valentineName) {
    warnings.push("Valentine's name is not set! Using default.");
    config.valentineName = "My Love";
  }

  const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  Object.entries(config.colors).forEach(([key, value]) => {
    if (!isValidHex(value)) {
      warnings.push(`Invalid color for ${key}! Using default.`);
    }
  });

  if (parseFloat(config.animations.floatDuration) < 5) {
    warnings.push("Float duration too short! Setting to 5s minimum.");
    config.animations.floatDuration = "5s";
  }

  if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
    warnings.push("Heart explosion size should be between 1 and 3! Using default.");
    config.animations.heartExplosionSize = 1.5;
  }

  if (warnings.length > 0) {
    console.warn("⚠️ Configuration Warnings:");
    warnings.forEach((warning) => console.warn("- " + warning));
  }
}

// Set page title
document.title = config.pageTitle;

window.addEventListener("DOMContentLoaded", () => {
  validateConfig();

  // Title
  document.getElementById("valentineTitle").textContent = `${config.valentineName}, my loml...`;

  // Q1
  document.getElementById("question1Text").textContent = config.questions.first.text;
  document.getElementById("yesBtn1").textContent = config.questions.first.yesBtn;
  document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
  document.getElementById("secretAnswerBtn").textContent = config.questions.first.secretAnswer;

  // Q2
  document.getElementById("question2Text").textContent = config.questions.second.text;
  document.getElementById("startText").textContent = config.questions.second.startText;
  document.getElementById("nextBtn").textContent = config.questions.second.nextBtn;

  // Q3
  // Render question text and preserve explicit newlines as <br>
  const q3El = document.getElementById("question3Text");
  if (q3El) {
    q3El.innerHTML = (config.questions.third.text || "").replace(/\n/g, "<br />");
  }
  document.getElementById("yesBtn3").textContent = config.questions.third.yesBtn;
  document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

  createFloatingElements();
  setupMusicPlayer();
  setInitialPosition();
});

// Floating elements
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");

  config.floatingEmojis.hearts.forEach((heart) => {
    const div = document.createElement("div");
    div.className = "heart";
    div.innerHTML = heart;
    setRandomPosition(div);
    container.appendChild(div);
  });

  config.floatingEmojis.bears.forEach((bear) => {
    const div = document.createElement("div");
    div.className = "bear";
    div.innerHTML = bear;
    setRandomPosition(div);
    container.appendChild(div);
  });
}

function setRandomPosition(element) {
  element.style.left = Math.random() * 100 + "vw";
  element.style.animationDelay = Math.random() * 5 + "s";
  element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Navigation
function showNextQuestion(questionNumber) {
  document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
  document.getElementById(`question${questionNumber}`).classList.remove("hidden");
}

// Move button
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

// Love meter
function setInitialPosition() {
  const meter = document.getElementById("loveMeter");
  const value = document.getElementById("loveValue");
  const extra = document.getElementById("extraLove");
  if (!meter || !value || !extra) return;

  meter.value = 100;
  value.textContent = 100;
  meter.style.width = "100%";
}

document.addEventListener("input", (e) => {
  if (e.target && e.target.id === "loveMeter") {
    const value = parseInt(e.target.value);
    document.getElementById("loveValue").textContent = value;

    const extraLoveEl = document.getElementById("extraLove");
    const meter = document.getElementById("loveMeter");

    if (value > 100) {
      extraLoveEl.classList.remove("hidden");
      const overflowPercentage = (value - 100) / 9900;
      const extraWidth = overflowPercentage * window.innerWidth * 0.8;
      meter.style.width = `calc(100% + ${extraWidth}px)`;
      meter.style.transition = "width 0.3s";

      if (value >= 5000) {
        extraLoveEl.classList.add("super-love");
        extraLoveEl.textContent = config.loveMessages.extreme;
      } else if (value > 1000) {
        extraLoveEl.classList.remove("super-love");
        extraLoveEl.textContent = config.loveMessages.high;
      } else {
        extraLoveEl.classList.remove("super-love");
        extraLoveEl.textContent = config.loveMessages.normal;
      }
    } else {
      extraLoveEl.classList.add("hidden");
      extraLoveEl.classList.remove("super-love");
      meter.style.width = "100%";
    }
  }
});

// ✅ Celebration video setup
function setupCelebrationVideo() {
  const mediaWrap = document.getElementById("celebrationMedia");
  const video = document.getElementById("celebrationVideo");
  const caption = document.getElementById("celebrationVideoCaption");

  const videoCfg = config?.celebration?.video;

  if (!mediaWrap || !video || !videoCfg || !videoCfg.enabled) {
    if (mediaWrap) mediaWrap.classList.add("hidden");
    return;
  }

  mediaWrap.classList.remove("hidden");

  if (caption && videoCfg.caption) {
    caption.textContent = videoCfg.caption;
    caption.classList.remove("hidden");
  } else if (caption) {
    caption.classList.add("hidden");
  }

  // Set the image source for GIF/image
  video.src = videoCfg.src || "";
  video.alt = "Celebration";
}


// Celebrate
function celebrate() {
  document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");

  document.getElementById("celebrationTitle").textContent = config.celebration.title;
  document.getElementById("celebrationMessage").textContent = config.celebration.message;
  document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;

  setupCelebrationVideo();
  createHeartExplosion();
}

function createHeartExplosion() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    const randomHeart =
      config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
    heart.innerHTML = randomHeart;
    heart.className = "heart";
    document.querySelector(".floating-elements").appendChild(heart);
    setRandomPosition(heart);
  }
}

// Music
function setupMusicPlayer() {
  const musicControls = document.getElementById("musicControls");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicSource = document.getElementById("musicSource");

  if (!config.music.enabled) {
    musicControls.style.display = "none";
    return;
  }

  musicSource.src = config.music.musicUrl;
  bgMusic.volume = config.music.volume || 0.5;
  bgMusic.load();

  // Auto-play music on first user interaction (browser requirement)
  if (config.music.autoplay) {
    const autoplayAttempt = () => {
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            musicToggle.textContent = config.music.stopText;
            // Remove listeners after successful autoplay
            document.removeEventListener("click", autoplayAttempt);
            document.removeEventListener("keydown", autoplayAttempt);
            document.removeEventListener("touchstart", autoplayAttempt);
          })
          .catch(() => {
            // Autoplay failed, user will click button
          });
      }
    };

    // Trigger autoplay on first user interaction
    document.addEventListener("click", autoplayAttempt, { once: true });
    document.addEventListener("keydown", autoplayAttempt, { once: true });
    document.addEventListener("touchstart", autoplayAttempt, { once: true });
  }

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = config.music.stopText;
    } else {
      bgMusic.pause();
      musicToggle.textContent = config.music.startText;
    }
  });
}
