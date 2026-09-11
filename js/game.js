document.addEventListener("DOMContentLoaded", () => {
    const GAME_TIME = 10;

    let score = 0;
    let timeLeft = GAME_TIME;
    let isPlaying = false;
    let timerId = null;

    const oraSound = new Audio('sound/ora.mp3');
    oraSound.volume = 0.8;

    const startScreen = document.getElementById("start-screen");
    const playingScreen = document.getElementById("playing-screen");
    const resultScreen = document.getElementById("result-screen");

    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const punchBtn = document.getElementById("punch-btn");

    const scoreDisplay = document.getElementById("score");
    const timeLeftDisplay = document.getElementById("time-left");
    const finalScoreDisplay = document.getElementById("final-score");
    const rankText = document.getElementById("rank-text");
    const gameArena = document.getElementById("game-arena");

    // Загружаем сохраненный рекорд из памяти браузера
    let highscore = localStorage.getItem('jojo_ora_highscore') || 0;

    function startGame() {
        score = 0;
        timeLeft = GAME_TIME;
        isPlaying = true;

        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;

        startScreen.classList.add("hidden");
        resultScreen.classList.add("hidden");
        playingScreen.classList.remove("hidden");

        timerId = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function punch() {
        if (!isPlaying) return;
        score++;
        scoreDisplay.textContent = score;

        // Звук без наложения
        if (oraSound.paused) {
            oraSound.currentTime = 0;
            oraSound.play().catch(e => console.log("Ошибка воспроизведения", e));
        }

        // Эффект тряски арены
        gameArena.classList.add("shake");
        setTimeout(() => gameArena.classList.remove("shake"), 120);

        // Спавн летящего текста "ОРА!"
        spawnOraText();
    }

    function spawnOraText() {
        const text = document.createElement("div");
        text.className = "floating-ora";
        text.textContent = "ОРА!";
        
        // Случайное смещение вокруг кнопки
        const randomX = (Math.random() - 0.5) * 120;
        const randomY = (Math.random() - 0.5) * 60;
        
        text.style.left = `calc(50% + ${randomX}px)`;
        text.style.top = `calc(50% + ${randomY}px)`;

        playingScreen.appendChild(text);
        setTimeout(() => text.remove(), 600);
    }

    function endGame() {
        isPlaying = false;
        clearInterval(timerId);

        playingScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");
        finalScoreDisplay.textContent = score;

        // Проверяем и сохраняем новый рекорд
        if (score > highscore) {
            highscore = score;
            localStorage.setItem('jojo_ora_highscore', highscore);
        }

        let rank = "";
        if (score < 40) {
            rank = `Ранг: Новичок | Рекорд: ${highscore}`;
        } else if (score < 70) {
            rank = `Ранг: Пользователь Стенда | Рекорд: ${highscore}`;
        } else if (score < 100) {
            rank = `Ранг: Star Platinum | Рекорд: ${highscore} 🌟`;
        } else {
            rank = `Ранг: Абсолютное Оружие | Рекорд: ${highscore} 🔥`;
        }
        rankText.textContent = rank;
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);
    punchBtn.addEventListener("click", punch);
});