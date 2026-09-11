// ==========================================
// 1. ДИНАМИЧЕСКИЕ СТИЛИ ДЛЯ JOJO ВИЗУАЛЬНЫХ ЭФФЕКТОВ
// ==========================================
const eeStyle = document.createElement('style');
eeStyle.innerHTML = `
/* Линии скорости в стиле манги */
.manga-speed-lines {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: 999998;
    pointer-events: none;
    background: repeating-conic-gradient(
        from 0deg at 50% 50%,
        rgba(0, 0, 0, 0.75) 0deg 1.5deg,
        transparent 1.5deg 6deg
    );
    opacity: 0;
    animation: speedLinesIn 0.15s ease-out forwards;
}

@keyframes speedLinesIn {
    from { opacity: 0; transform: scale(1.3); }
    to { opacity: 1; transform: scale(1); }
}

/* Смена палитры цветов JoJo */
.jojo-palette-time-stop {
    filter: invert(1) hue-rotate(190deg) contrast(220%) saturate(150%) !important;
    transition: filter 0.1s cubic-bezier(0, 1, 0, 1);
}

.jojo-palette-dio {
    filter: invert(0.9) hue-rotate(290deg) contrast(250%) !important;
    transition: filter 0.1s ease;
}

.jojo-palette-requiem {
    filter: sepia(1) hue-rotate(5deg) saturate(500%) contrast(150%) !important;
    transition: filter 0.3s ease;
}

.jojo-palette-nigerundayo {
    filter: contrast(180%) saturate(200%) hue-rotate(80deg) !important;
}

/* Индивидуальные эффекты для персонажей (Easter Eggs) */
.effect-jotaro {
    filter: hue-rotate(200deg) contrast(190%) saturate(140%) !important;
    transition: filter 0.2s ease;
}

.effect-joseph {
    filter: sepia(0.8) hue-rotate(70deg) saturate(250%) contrast(150%) !important;
    transition: filter 0.2s ease;
}

.effect-giorno {
    filter: hue-rotate(50deg) saturate(300%) contrast(180%) brightness(110%) !important;
    transition: filter 0.3s ease;
}

.effect-jolyne {
    filter: hue-rotate(310deg) contrast(200%) saturate(220%) !important;
    transition: filter 0.2s ease;
}

/* Взрывное появление иероглифов */
.burst-kanji {
    position: fixed;
    z-index: 999999;
    font-family: 'Impact', sans-serif;
    font-size: 5rem;
    font-weight: 900;
    color: #ff0055;
    text-shadow: 3px 3px 0 #000, -2px -2px 0 #fff, 0 0 15px #ff0055;
    pointer-events: none;
    animation: kanjiPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes kanjiPop {
    0% { transform: scale(0) rotate(-20deg); opacity: 0; }
    50% { transform: scale(1.4) rotate(10deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
}

/* Тряска экрана */
.screen-shake-hard {
    animation: jojoShake 0.05s infinite;
}

@keyframes jojoShake {
    0% { transform: translate(8px, 8px) rotate(0deg); }
    25% { transform: translate(-8px, -10px) rotate(-1.5deg); }
    50% { transform: translate(-10px, 8px) rotate(1.5deg); }
    75% { transform: translate(10px, -4px) rotate(0deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
}

/* Эффект убегания Nigerundayo */
.nigerundayo-zoom {
    animation: zoomAwayBlur 2.8s ease-in-out forwards;
}

@keyframes zoomAwayBlur {
    0% { transform: scale(1); filter: blur(0px); }
    40% { transform: scale(0.6) rotate(3deg); filter: blur(3px); }
    80% { transform: scale(1.1) rotate(-1deg); filter: blur(0px); }
    100% { transform: scale(1) rotate(0deg); filter: blur(0px); }
}
`;
document.head.appendChild(eeStyle);

// Стили для кнопки реквиема и King Crimson
const reqStyle = document.createElement('style');
reqStyle.innerHTML = `
.king-crimson-active {
    filter: invert(1) hue-rotate(140deg) contrast(300%) !important;
    animation: timeEraseGlitch 0.4s steps(2, end) infinite;
    pointer-events: none;
}

@keyframes timeEraseGlitch {
    0% { transform: translate(0, 0) scale(1); }
    20% { transform: translate(-15px, 10px) skew(-5deg); }
    40% { transform: translate(15px, -15px) scale(1.02); }
    60% { transform: translate(-10px, -5px) skew(5deg); }
    80% { transform: translate(10px, 15px); }
    100% { transform: translate(0, 0) scale(1); }
}

/* Оверлей для видео Пуччи */
#pucci-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    z-index: 999999;
    display: none;
    justify-content: center;
    align-items: center;
}

#pucci-overlay.active {
    display: flex !important;
}

#pucci-overlay video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
`;
document.head.appendChild(reqStyle);

function getEffectTargets() {
    return [...document.body.children].filter((element) => {
        return !element.matches(
            '#bio-overlay, .bio-overlay, #pucci-overlay, .manga-speed-lines, .burst-kanji'
        );
    });
}

function addPageEffect(...classes) {
    getEffectTargets().forEach((element) => {
        element.classList.add(...classes);
    });
}

function removePageEffect(...classes) {
    getEffectTargets().forEach((element) => {
        element.classList.remove(...classes);
    });
}

// ==========================================
// 2. БАЗА ДАННЫХ ПЕРСОНАЖЕЙ
// ==========================================
const characterData = {
    jotaro: {
        name: "Jotaro Kujo",
        part: "PART 3: STARDUST CRUSADERS",
        img: "img/KujoAnime.webp",
        stand: "Star Platinum (Стар Платинум)",
        desc: "Молчаливый и суровый старшеклассник, внук Джозефа Джостара. Обладает невероятной выдержкой и аналитическим умом. Его Стенд — один из сильнейших в мире, обладающий сверхсветовой скоростью, сокрушительной силой и способностью останавливать время.",
        stats: [
            { name: "Сила", val: "A" },
            { name: "Скорость", val: "A" },
            { name: "Радиус", val: "C" },
            { name: "Прочность", val: "A" },
            { name: "Точность", val: "A" },
            { name: "Потенциал", val: "A" }
        ]
    },
    dio: {
        name: "DIO Brando",
        part: "PART 1 & 3: STARDUST CRUSADERS",
        img: "img/DIO_Normal_SC_Infobox_Anime.webp",
        stand: "The World (За Варудо)",
        desc: "Главный антагонист рода Джостаров. Столетний вампир, захвативший тело Джонатана Джостара. Харизматичный и жестокий властелин, стремящийся к абсолютному господству. Его Стенд The World способен подчинять себе само время.",
        stats: [
            { name: "Сила", val: "A" },
            { name: "Скорость", val: "A" },
            { name: "Радиус", val: "C" },
            { name: "Прочность", val: "A" },
            { name: "Точность", val: "B" },
            { name: "Потенциал", val: "B" }
        ]
    },
    joseph: {
        name: "Joseph Joestar",
        part: "PART 2: BATTLE TENDENCY",
        img: "img/Joseph_SC_Infobox_Anime.webp",
        stand: "Hermit Purple / Хамон",
        desc: "Внук Джонатана Джостара. Хитроумный и эпатажный тактический гений, способный предсказывать фразы врагов наперед. В молодости одолел древних Люди из Колонн с помощью Хамона, а позже пробудил Стенд в виде лоз.",
        stats: [
            { name: "Сила", val: "D" },
            { name: "Скорость", val: "C" },
            { name: "Радиус", val: "D" },
            { name: "Прочность", val: "A" },
            { name: "Точность", val: "D" },
            { name: "Потенциал", val: "E" }
        ]
    },
    giorno: {
        name: "Giorno Giovanna",
        part: "PART 5: VENTO AUREO",
        img: "img/Giorno_Giovanna_Infobox_Anime.webp",
        stand: "Gold Experience / Requiem",
        desc: "Сын ДИО (физиологически Джостара), мечтающий стать «Пассионе» Ганг-старом, чтобы очистить Неаполь от наркотиков. Его Стенд дарует жизнь неодушевленным предметам, а эволюционировавшая форма Requiem способна обнулять любые атаки.",
        stats: [
            { name: "Сила", val: "Infinite" },
            { name: "Скорость", val: "Infinite" },
            { name: "Радиус", val: "Infinite" },
            { name: "Прочность", val: "Infinite" },
            { name: "Точность", val: "Infinite" },
            { name: "Потенциал", val: "None" }
        ]
    },
    jolyne: {
        name: "Jolyne Cujoh",
        part: "PART 6: STONE OCEAN",
        img: "img/Jolyne_Cujoh_Infobox_Anime.webp",
        stand: "Stone Free (Стоун Фри)",
        desc: "Дочь Джотаро Куджо. Оказавшись в тюрьме строгого режима «Грин Долфин Стрит» по ложному обвинению, проявляет невероятную стойкость духа. Ее Стенд превращает её собственное тело в прочные нити для разведки и боя.",
        stats: [
            { name: "Сила", val: "A" },
            { name: "Скорость", val: "B" },
            { name: "Радиус", val: "C" },
            { name: "Прочность", val: "A" },
            { name: "Точность", val: "C" },
            { name: "Потенциал", val: "A" }
        ]
    }
};

// ==========================================
// 3. АНИМИРОВАННЫЙ RADAR CHART
// ==========================================
const statValuesMap = {
    'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'None': 0, 'Infinite': 5.5
};

let radarAnimId = null;

function renderStandRadarChart(stats) {
    const statsContainer = document.getElementById('modal-stats');
    if (!statsContainer) return;

    statsContainer.innerHTML = '<canvas id="stand-radar-canvas" width="360" height="300"></canvas>';
    const canvas = document.getElementById('stand-radar-canvas');
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 + 5;
    const radius = 80;
    const numAxes = 6;

    let progress = 0;
    if (radarAnimId) cancelAnimationFrame(radarAnimId);

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let level = 1; level <= 5; level++) {
            const r = (radius / 5) * level;
            ctx.beginPath();
            for (let i = 0; i < numAxes; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 2;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = level === 5 ? 'rgba(255, 0, 85, 0.6)' : 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = level === 5 ? 2 : 1;
            ctx.stroke();
        }

        for (let i = 0; i < numAxes; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();

            const stat = stats[i] || { name: '???', val: '?' };
            const labelRadius = radius + 32;
            const lx = centerX + labelRadius * Math.cos(angle);
            const ly = centerY + labelRadius * Math.sin(angle);

            ctx.font = '900 11px "Impact", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ff0055';
            ctx.fillText(`${stat.name.toUpperCase()}`, lx, ly - 8);

            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = stat.val === 'Infinite' ? '#00f0ff' : '#ffffff';
            ctx.fillText(`[${stat.val}]`, lx, ly + 7);
        }

        ctx.beginPath();
        stats.forEach((stat, i) => {
            const valNum = statValuesMap[stat.val] !== undefined ? statValuesMap[stat.val] : 2;
            const currentR = (radius / 5) * valNum * progress;
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = centerX + currentR * Math.cos(angle);
            const y = centerY + currentR * Math.sin(angle);

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();

        const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
        gradient.addColorStop(0, 'rgba(255, 0, 85, 0.75)');
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0.45)');

        ctx.fillStyle = gradient;
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        stats.forEach((stat, i) => {
            const valNum = statValuesMap[stat.val] !== undefined ? statValuesMap[stat.val] : 2;
            const currentR = (radius / 5) * valNum * progress;
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = centerX + currentR * Math.cos(angle);
            const y = centerY + currentR * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        if (progress < 1) {
            progress += 0.08;
            radarAnimId = requestAnimationFrame(draw);
        }
    }

    draw();
}

// ==========================================
// 4. ЗВУКОВОЕ СОПРОВОЖДЕНИЕ И ФОНОВАЯ МУЗЫКА
// ==========================================
const bgMusic = new Audio('sound/background music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.12;

let isMusicStarted = false;

const sounds = {
    dioWarudo: new Audio('sound/Za Warudo.mp3'),
    dioLaugh: new Audio('sound/Dio Laughing.mp3'),
    jotaro: new Audio('sound/yare-yare-daze_zAnWvX6 (1).mp3'),
    jotaroWorld: new Audio('sound/jotarotheworld.mp3'),
    joseph: new Audio('sound/oh-no-oh-my-god-mp3cut.mp3'),
    nigerundayo: new Audio('sound/nigerundayo.mp3'),
    giorno: new Audio('sound/kore-ga-requiem-da_p6o5Dkh.mp3'),
    jolyne: new Audio('sound/JOLYNE.mp3')
};

function stopAllAudio() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    isMusicStarted = false;
    
    Object.values(sounds).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    const allAudioElements = document.querySelectorAll('audio');
    allAudioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function resetEffects() {
    removePageEffect(
        'jojo-palette-time-stop',
        'jojo-palette-dio',
        'jojo-palette-requiem',
        'jojo-palette-nigerundayo',
        'effect-jotaro',
        'effect-joseph',
        'effect-giorno',
        'effect-jolyne',
        'screen-shake-hard',
        'nigerundayo-zoom',
        'barrage-active'
    );

    document.querySelectorAll(
        '.manga-speed-lines, .burst-kanji, .time-stop-wave'
    ).forEach((element) => element.remove());

    Object.values(sounds).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });

    if (isMusicStarted && !window.location.pathname.includes('universe.html')) {
        bgMusic.volume = 0.12;
        bgMusic.play().catch(() => {});
    }
}

function triggerDioTimeStop(event) {
    resetEffects();
    bgMusic.volume = 0.02;

    sounds.dioWarudo.currentTime = 0;
    sounds.dioWarudo.play().catch(() => {});

    const x = event && event.clientX ? event.clientX : window.innerWidth / 2;
    const y = event && event.clientY ? event.clientY : window.innerHeight / 2;

    const wave = document.createElement('div');
    wave.className = 'time-stop-wave';
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    document.body.appendChild(wave);

    addPageEffect('jojo-palette-time-stop', 'screen-shake-hard');

    setTimeout(() => {
        removePageEffect('screen-shake-hard');
    }, 400);

    setTimeout(() => {
        sounds.dioLaugh.currentTime = 0;
        sounds.dioLaugh.play().catch(() => {});
    }, 900);

    setTimeout(() => wave.remove(), 900);

    setTimeout(() => {
        resetEffects();
    }, 4000);
}

function playEasterEgg(key, event = null) {
    if (key === 'dio') {
        triggerDioTimeStop(event);
        return;
    }

    resetEffects();
    bgMusic.volume = 0.02;

    const soundMap = {
        jotaro: { effect: 'effect-jotaro', audio: sounds.jotaro, time: 2500 },
        joseph: { effect: 'effect-joseph', audio: sounds.joseph, time: 3200 },
        giorno: { effect: 'effect-giorno', audio: sounds.giorno, time: 4500 },
        jolyne: { effect: 'effect-jolyne', audio: sounds.jolyne, time: 2800 }
    };

    const item = soundMap[key];
    if (item) {
        addPageEffect(item.effect);
        item.audio.play().catch(() => {});
        setTimeout(() => resetEffects(), item.time);
    }
}

// ==========================================
// 5. ИЕРОГЛИФЫ И СУПЕР-ФИНИШЕРЫ
// ==========================================
function spawnMangaKanjiBurst(count = 12) {
    const kanjiSymbols = ['ゴ', 'ドドド', 'ズキュウウウン', 'オラオラ', '無駄無駄', 'ゴゴゴ'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const kanji = document.createElement('div');
            kanji.className = 'burst-kanji';
            kanji.textContent = kanjiSymbols[Math.floor(Math.random() * kanjiSymbols.length)];
            
            const x = Math.random() * (window.innerWidth - 150);
            const y = Math.random() * (window.innerHeight - 100);
            
            kanji.style.left = `${x}px`;
            kanji.style.top = `${y}px`;
            
            const colors = ['#ff0055', '#00e5ff', '#ffeb3b', '#a855f7', '#ffffff'];
            kanji.style.color = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(kanji);
            setTimeout(() => kanji.remove(), 700);
        }, i * 120);
    }
}

function triggerSuperFinisher(charKey) {
    resetEffects();
    bgMusic.volume = 0.01;

    const speedLines = document.createElement('div');
    speedLines.className = 'manga-speed-lines';
    document.body.appendChild(speedLines);

    spawnMangaKanjiBurst(14);

    if (charKey === 'jotaro') {
        sounds.jotaroWorld.currentTime = 0;
        sounds.jotaroWorld.play().catch(() => {});

        setTimeout(() => {
            addPageEffect('jojo-palette-time-stop', 'screen-shake-hard');
        }, 200);

        setTimeout(() => {
            removePageEffect('screen-shake-hard');
        }, 600);

        setTimeout(() => resetEffects(), 3800);

    } else if (charKey === 'dio') {
        sounds.dioWarudo.play().catch(() => {});
        addPageEffect('jojo-palette-dio', 'screen-shake-hard');

        setTimeout(() => sounds.dioLaugh.play().catch(() => {}), 600);
        setTimeout(() => resetEffects(), 3500);

    } else if (charKey === 'joseph') {
        sounds.nigerundayo.currentTime = 0;
        sounds.nigerundayo.play().catch(() => {});

        addPageEffect('jojo-palette-nigerundayo', 'nigerundayo-zoom');

        setTimeout(() => resetEffects(), 3200);

    } else if (charKey === 'giorno') {
        sounds.giorno.play().catch(() => {});
        addPageEffect('jojo-palette-requiem', 'screen-shake-hard');

        setTimeout(() => {
            removePageEffect('screen-shake-hard');
        }, 500);

        setTimeout(() => resetEffects(), 4500);

    } else {
        sounds.jolyne.play().catch(() => {});
        addPageEffect('jojo-palette-time-stop');

        setTimeout(() => resetEffects(), 3000);
    }
}

// ==========================================
// 6. ИНИЦИАЛИЗАЦИЯ И СНИППЕТ MADE IN HEAVEN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const modalOverlay = document.getElementById('bio-overlay');
    if (modalOverlay && modalOverlay.parentElement !== document.body) {
        document.body.appendChild(modalOverlay);
    }

    // --- ЕСЛИ МЫ НА СТРАНИЦЕ UNIVERSE.HTML ---
    const isUniversePage = window.location.pathname.includes('universe.html');

    if (isUniversePage) {
        stopAllAudio();

        const universeMusic = document.getElementById('universe-music');
        if (universeMusic) {
            universeMusic.currentTime = 0;
            universeMusic.play().catch(() => {});
        }

        if (typeof startAcceleratingOrbit === 'function') {
            startAcceleratingOrbit();
        }
    }

    // Включаем фоновую музыку по первому клику
    document.addEventListener('click', () => {
        if (!isUniversePage && !isMusicStarted) {
            bgMusic.play().then(() => {
                isMusicStarted = true;
            }).catch(() => {});
        }
    }, { once: true });

    // Прелоадер
    const preloader = document.getElementById("jojo-preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("fade-out");
        }, 1500); 
    }

    // --- ЛОГИКА MADE IN HEAVEN ---
    const pucciOverlay = document.getElementById('pucci-overlay');
    const pucciVideo = document.getElementById('pucci-video');
window.activatePucciAbility = function() {
    const pucciOverlay = document.getElementById('pucci-overlay');
    const pucciVideo = document.getElementById('pucci-video');

    if (!pucciOverlay || !pucciVideo) {
        console.error('Не найден оверлей #pucci-overlay или видео #pucci-video!');
        return;
    }

    // 1. Остановка фоновой музыки
    if (typeof stopAllAudio === 'function') {
        stopAllAudio();
    }

    // 2. Воспроизведение звука Made in Heaven (аудио или сразу видео)
    const mihSound = new Audio('sound/made-in-heaven.mp3');
    mihSound.play().catch(() => {});

    // 3. Мгновенная активация ускорения мира
    document.body.classList.add('made-in-heaven-active', 'mih-time-warp');
    
    if (typeof spawnMangaKanjiBurst === 'function') {
        spawnMangaKanjiBurst(30);
    }

    // Экспоненциальное ускорение времени с первой миллисекунды
    let speed = 1.0;
    const accelInterval = setInterval(() => {
        speed *= 1.15;
        document.body.style.setProperty('--mih-speed', `${speed}s`);
        
        // Спавн иероглифов в процессе ускорения
        if (typeof createMenacingKanji === 'function' && Math.random() > 0.4) {
            createMenacingKanji();
        }
    }, 50);

    // 4. Через 2.5 секунды безумного ускорения показываем видео Pucci
    setTimeout(() => {
        clearInterval(accelInterval);

        // Указываем путь к pucci-mih.mp4 из папки video
        pucciVideo.src = 'video/pucci-mih.mp4';
        pucciOverlay.classList.add('active');
        
        pucciVideo.currentTime = 0;
        pucciVideo.playbackRate = 1.5; // Ускоренное воспроизведение видео

        pucciVideo.play().catch(err => {
            console.warn("Автовоспроизведение видео заблокировано:", err);
        });

        // После завершения видео — переход в Новую Вселенную
        pucciVideo.onended = () => {
            window.location.href = 'universe.html';
        };
    }, 2500);
};
    // --- МОДАЛЬНЫЕ ОКНА И КАРТОЧКИ ---
    const modalClose = document.getElementById('bio-close');
    const modalPart = document.getElementById('modal-part');
    const modalName = document.getElementById('modal-name');
    const modalImg = document.getElementById('modal-img');
    const modalStand = document.getElementById('modal-stand');
    const modalDesc = document.getElementById('modal-desc');

    let currentActiveKey = null;

    function openBio(charKey) {
        const data = characterData[charKey];
        if (!data) return;

        currentActiveKey = charKey;
        if (modalPart) modalPart.textContent = data.part;
        if (modalName) modalName.textContent = data.name;
        if (modalImg) modalImg.src = data.img;
        if (modalStand) modalStand.textContent = data.stand;
        if (modalDesc) modalDesc.textContent = data.desc;

        if (data.stats) renderStandRadarChart(data.stats);

        if (modalOverlay) modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBio() {
        if (modalOverlay) modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeBio);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeBio();
        });
    }

    if (modalImg) {
        modalImg.style.cursor = 'pointer';
        modalImg.title = 'Нажмите, чтобы услышать реплику!';
        modalImg.addEventListener('click', (e) => {
            e.stopPropagation();

            if (currentActiveKey) {
                playEasterEgg(currentActiveKey, e);
            }
        });
    }

    // Настройка карточек
    const charCardsConfig = {
        'jotaro-card': { charKey: 'jotaro', barrageText: 'ORA!', barrageClass: 'barrage-ora', sound: new Audio('sound/ora.mp3') },
        'dio-card': { charKey: 'dio', barrageText: 'MUDA!', barrageClass: 'barrage-muda', sound: new Audio('sound/muda.mp3') },
        'joseph-card': { charKey: 'joseph' },
        'giorno-card': { charKey: 'giorno' },
        'jolyne-card': { charKey: 'jolyne' }
    };

    let clickCounts = {};
    let bioTimers = {};
    let stopBarrageTimers = {};

    Object.entries(charCardsConfig).forEach(([cardId, config]) => {
        const cardEl = document.getElementById(cardId);
        if (!cardEl) return;

        clickCounts[cardId] = 0;
        if (config.sound) config.sound.loop = true;

        cardEl.addEventListener('click', (e) => {
            clickCounts[cardId]++;
            clearTimeout(bioTimers[cardId]);

            if (clickCounts[cardId] >= 25) {
                if (config.sound) {
                    config.sound.pause();
                    config.sound.currentTime = 0;
                }
                document.body.classList.remove('barrage-active');
                clearTimeout(stopBarrageTimers[cardId]);

                triggerSuperFinisher(config.charKey);
                clickCounts[cardId] = 0;
                return;
            }

            if (clickCounts[cardId] === 1) {
                bioTimers[cardId] = setTimeout(() => {
                    openBio(config.charKey);
                    clickCounts[cardId] = 0;
                }, 250);
            } else {
                if (config.barrageText) {
                    document.body.classList.add('barrage-active');

                    if (config.sound && config.sound.paused) {
                        config.sound.currentTime = 0;
                        config.sound.volume = 0.8;
                        config.sound.play().catch(() => {});
                    }

                    const el = document.createElement('div');
                    el.className = `barrage-text ${config.barrageClass}`;
                    el.textContent = config.barrageText;

                    const x = e.clientX + (Math.random() - 0.5) * 120;
                    const y = e.clientY + (Math.random() - 0.5) * 120;

                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;

                    document.body.appendChild(el);
                    setTimeout(() => el.remove(), 450);
                }

                clearTimeout(stopBarrageTimers[cardId]);
                stopBarrageTimers[cardId] = setTimeout(() => {
                    if (config.sound) {
                        config.sound.pause();
                        config.sound.currentTime = 0;
                    }
                    document.body.classList.remove('barrage-active');
                    clickCounts[cardId] = 0;
                }, 400);
            }
        });
    });

    // Кнопка музыки
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play();
                isMusicStarted = true;
                musicBtn.textContent = '🎵 МУЗЫКА: ВКЛ';
                musicBtn.classList.add('playing');
            } else {
                bgMusic.pause();
                musicBtn.textContent = '🔇 МУЗЫКА: ВЫКЛ';
                musicBtn.classList.remove('playing');
            }
        });
    }

    const dioQuote = document.getElementById('dio-quote');
    if (dioQuote) {
        dioQuote.addEventListener('click', (e) => triggerDioTimeStop(e));
    }
});

// ==========================================
// 7. ИНТЕРАКТИВНЫЕ ЭФФЕКТЫ (ИЕРОГЛИФЫ, ИСКРЫ, TBC)
// ==========================================
const kanjiList = ['ゴ', 'ゴゴ', 'ゴゴゴ', 'ドドド'];

document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('#bio-close')) return;

    const kanji = document.createElement('div');
    kanji.className = 'menacing-kanji';
    kanji.textContent = kanjiList[Math.floor(Math.random() * kanjiList.length)];
    
    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;
    
    kanji.style.left = `${e.clientX + offsetX}px`;
    kanji.style.top = `${e.clientY + offsetY}px`;
    
    document.body.appendChild(kanji);
    setTimeout(() => kanji.remove(), 1200);
});

const cardThemes = {
    'jotaro-card': 'theme-jotaro',
    'dio-card': 'theme-dio',
    'joseph-card': 'theme-joseph',
    'giorno-card': 'theme-giorno',
    'jolyne-card': 'theme-jolyne'
};

Object.entries(cardThemes).forEach(([cardId, themeClass]) => {
    const cardEl = document.getElementById(cardId);
    if (cardEl) {
        cardEl.addEventListener('mouseenter', () => addPageEffect(themeClass));
        cardEl.addEventListener('mouseleave', () => removePageEffect(themeClass));
    }
});

document.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark-particle';
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;

        const angle = Math.random() * Math.PI * 2;
        const speed = 30 + Math.random() * 50;
        const dx = `${Math.cos(angle) * speed}px`;
        const dy = `${Math.sin(angle) * speed}px`;

        spark.style.setProperty('--dx', dx);
        spark.style.setProperty('--dy', dy);

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
    }
});

// Шлейф курсора
let lastArrowTrailTime = 0;
const trailKanjiSymbols = ['ゴ', 'ゴ', 'ドド', 'ズキュン'];

window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastArrowTrailTime < 45) return;
    lastArrowTrailTime = now;

    const particle = document.createElement('div');
    particle.className = 'stand-arrow-trail';

    const isHamonSpark = Math.random() < 0.35;
    if (isHamonSpark) {
        particle.classList.add('hamon-spark');
    } else {
        particle.textContent = trailKanjiSymbols[Math.floor(Math.random() * trailKanjiSymbols.length)];
    }

    const offsetX = (Math.random() - 0.5) * 14;
    const offsetY = (Math.random() - 0.5) * 14;

    particle.style.left = `${e.clientX + offsetX}px`;
    particle.style.top = `${e.clientY + offsetY}px`;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 700);
});

// Функция активации Made in Heaven
function activateMadeInHeaven() {
    const pucciOverlay = document.getElementById('pucci-overlay');
    const pucciVideo = document.getElementById('pucci-video');
    
    // 1. Показываем полноэкранный блок с видео
    pucciOverlay.style.display = 'flex';
    
    // 2. Запускаем видео с самого начала
    pucciVideo.currentTime = 0;
    pucciVideo.play().catch(error => {
        console.error("Ошибка автовоспроизведения видео:", error);
        alert("Пожалуйста, кликните по экрану для запуска анимации!");
    });

    // 3. Ждем окончания видео (событие onended)
    pucciVideo.onended = () => {
        // Резко прячем видео
        pucciOverlay.style.display = 'none';
        
        // 4. Запускаем вспышку и переход во Вселенную
        triggerUniverseTransition();
    };
}

function triggerUniverseTransition() {
    const flash = document.createElement('div');
    flash.className = 'white-flash-overlay flash-active';
    document.body.appendChild(flash);

    // Жестко переводим музыку на 0 секунду и запускаем
    const bgMusic = document.getElementById('universe-music');
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0; // Сброс на самое начало
        bgMusic.volume = 0.8;
        bgMusic.play().catch(err => console.log("Ошибка аудио:", err));
    }

    // Включаем космический стиль (если переход через классы)
    document.body.classList.add('cosmic-universe-active');

    // Запускаем бесконечное ускорение солнце и луны
    startAcceleratingOrbit();

    setTimeout(() => {
        flash.classList.remove('flash-active');
        setTimeout(() => flash.remove(), 1500);
    }, 200);
}

// Функция симуляции ускорения Made in Heaven
function startAcceleratingOrbit() {
    const sun = document.getElementById('sun');
    const moon = document.getElementById('moon');
    
    if (!sun || !moon) return;

    const startTime = performance.now();
    
    function updateOrbit(currentTime) {
        const elapsedSeconds = (currentTime - startTime) / 1000;
        
        // Экспоненциальное ускорение времени в стиле Made in Heaven:
        // коэффициент растет с каждой секундой, заставляя объекты вращаться всё быстрее и быстрее
        const accelerationFactor = Math.pow(1.2, elapsedSeconds);
        const currentAngle = (elapsedSeconds * 15 * accelerationFactor) % 360;
        
        sun.style.transform = `rotate(${currentAngle}deg)`;
        moon.style.transform = `rotate(${currentAngle + 180}deg)`;
        
        requestAnimationFrame(updateOrbit);
    }
    
    requestAnimationFrame(updateOrbit);
}

// Отслеживание ввода секретного кода "madeinheaven"
let secretCode = '';
const targetCode = 'madeinheaven';

document.addEventListener('keydown', (e) => {
    // Записываем нажатые клавиши
    secretCode += e.key.toLowerCase();
    
    // Проверяем, совпадает ли конец строки с нашим кодом
    if (secretCode.endsWith(targetCode)) {
        secretCode = ''; // Очищаем буфер
        activateMadeInHeaven(); // Запускаем ту самую функцию с видео и вспышкой
    }

    // Ограничиваем длину строки, чтобы не перегружать память
    if (secretCode.length > 20) {
        secretCode = secretCode.substring(secretCode.length - 15);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // База данных глав и картинок (замени пути на свои файлы в проекте)
    const mangaData = {
        ch1: [
            "img/manga/ch1_p1.jpg",
            "img/manga/ch1_p2.jpg",
            "img/manga/ch1_p3.jpg"
        ],
        ch2: [
            "img/manga/ch2_p1.jpg",
            "img/manga/ch2_p2.jpg"
        ]
    };

    let currentChapterKey = "ch1";
    let currentPageIndex = 0;
    let currentZoom = 1;

    const chapterSelect = document.getElementById("chapter-select");
    const mangaImage = document.getElementById("manga-image");
    const pageIndicator = document.getElementById("page-indicator");
    
    const prevBtn = document.getElementById("prev-page-btn");
    const nextBtn = document.getElementById("next-page-btn");
    
    const zoomInBtn = document.getElementById("zoom-in-btn");
    const zoomOutBtn = document.getElementById("zoom-out-btn");
    const zoomResetBtn = document.getElementById("zoom-reset-btn");

    function loadPage() {
        const pages = mangaData[currentChapterKey];
        if (!pages || pages.length === 0) return;

        mangaImage.src = pages[currentPageIndex];
        pageIndicator.textContent = `Страница ${currentPageIndex + 1} из ${pages.length}`;
    }

    // Классическая манга: кнопка «вперед» вправо листает назад по массиву (справа налево), 
    // но для удобства сделаем интуитивное переключение: 
    // Кнопка ❯ (справа) ведет к следующей странице, ❮ (слева) — к предыдущей.
    function nextPage() {
        const pages = mangaData[currentChapterKey];
        if (currentPageIndex < pages.length - 1) {
            currentPageIndex++;
            resetZoom();
            loadPage();
        }
    }

    function prevPage() {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            resetZoom();
            loadPage();
        }
    }

    function resetZoom() {
        currentZoom = 1;
        mangaImage.style.transform = `scale(${currentZoom})`;
    }

    // События
    chapterSelect.addEventListener("change", (e) => {
        currentChapterKey = e.target.value;
        currentPageIndex = 0;
        resetZoom();
        loadPage();
    });

    nextBtn.addEventListener("click", nextPage);
    prevBtn.addEventListener("click", prevPage);

    // Управление зумом
    zoomInBtn.addEventListener("click", () => {
        if (currentZoom < 2.5) {
            currentZoom += 0.25;
            mangaImage.style.transform = `scale(${currentZoom})`;
        }
    });

    zoomOutBtn.addEventListener("click", () => {
        if (currentZoom > 1) {
            currentZoom -= 0.25;
            mangaImage.style.transform = `scale(${currentZoom})`;
        }
    });

    zoomResetBtn.addEventListener("click", resetZoom);

    // Управление клавиатурой (стрелки влево/вправо)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            nextPage();
        } else if (e.key === "ArrowLeft") {
            prevPage();
        }
    });

    // Инициализация первой загрузки
    loadPage();
});

// ==========================================
// 10. СЕКРЕТНЫЕ КЛАВИАТУРНЫЕ ПАСХАЛКИ
// ==========================================

(function initSecretKeyboardEasterEggs() {

    let typedSequence = '';
    let sequenceTimer = null;

    const secretSequences = {

        // ORA
        'ora': () => {
            triggerSuperFinisher('jotaro');
        },

        // MUDA
        'muda': () => {
            triggerDioTimeStop({
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2
            });
        },

        // NIGERUNDAYO
        'nigerundayo': () => {
            resetEffects();
            bgMusic.volume = 0.01;

            sounds.nigerundayo.currentTime = 0;
            sounds.nigerundayo.play().catch(() => {});

            addPageEffect(
                'jojo-palette-nigerundayo',
                'nigerundayo-zoom'
            );

            spawnMangaKanjiBurst(8);

            setTimeout(() => {
                resetEffects();
            }, 3200);
        },

        // REQUIEM
        'requiem': () => {
            triggerSuperFinisher('giorno');
        },

        // YARE YARE
        'yareyare': () => {
            resetEffects();

            bgMusic.volume = 0.02;

            sounds.jotaro.currentTime = 0;
            sounds.jotaro.play().catch(() => {});

            addPageEffect('effect-jotaro');

            spawnMangaKanjiBurst(7);

            setTimeout(() => {
                resetEffects();
            }, 2600);
        }
    };


    document.addEventListener('keydown', (event) => {

        // Игнорируем ввод в поля
        if (
            event.target.tagName === 'INPUT' ||
            event.target.tagName === 'TEXTAREA'
        ) {
            return;
        }

        const key = event.key.toLowerCase();

        // Разрешаем только буквы
        if (!/^[a-z]$/.test(key)) {
            return;
        }

        typedSequence += key;

        // Ограничиваем длину буфера
        if (typedSequence.length > 15) {
            typedSequence = typedSequence.slice(-15);
        }

        clearTimeout(sequenceTimer);

        // Проверяем комбинации
        Object.entries(secretSequences).forEach(
            ([sequence, action]) => {

                if (typedSequence.endsWith(sequence)) {

                    action();

                    // визуальный отклик
                    showSecretMessage(sequence.toUpperCase());

                    typedSequence = '';
                }

            }
        );

        // Если игрок остановился надолго — сбрасываем ввод
        sequenceTimer = setTimeout(() => {
            typedSequence = '';
        }, 1800);

    });

})();


// ==========================================
// 11. СЕКРЕТНОЕ СООБЩЕНИЕ
// ==========================================

function showSecretMessage(text) {

    const message = document.createElement('div');

    message.textContent = text;

    message.style.position = 'fixed';
    message.style.left = '50%';
    message.style.top = '50%';

    message.style.transform =
        'translate(-50%, -50%) scale(0.7) rotate(-3deg)';

    message.style.zIndex = '999999';

    message.style.pointerEvents = 'none';

    message.style.fontFamily =
        "'Impact', 'Arial Black', sans-serif";

    message.style.fontSize =
        'clamp(3rem, 10vw, 8rem)';

    message.style.fontWeight = '900';

    message.style.letterSpacing = '5px';

    message.style.color = '#ffffff';

    message.style.textShadow = `
        5px 5px 0 #ff0055,
        -4px -4px 0 #00f0ff,
        0 0 25px rgba(255,255,255,0.8)
    `;

    message.style.opacity = '0';

    message.style.transition =
        'all 0.35s cubic-bezier(.175,.885,.32,1.275)';

    document.body.appendChild(message);


    requestAnimationFrame(() => {

        message.style.opacity = '1';

        message.style.transform =
            'translate(-50%, -50%) scale(1) rotate(-3deg)';

    });


    setTimeout(() => {

        message.style.opacity = '0';

        message.style.transform =
            'translate(-50%, -50%) scale(1.3) rotate(3deg)';

    }, 650);


    setTimeout(() => {
        message.remove();
    }, 1000);

}



// ==========================================
// 12. ПАСХАЛКА: ТРИ КЛИКА ПО ЛОГОТИПУ
// ==========================================

(function initLogoEasterEgg() {

    const logo = document.querySelector('.logo');

    if (!logo) return;

    let clickCount = 0;
    let clickTimer = null;


    logo.addEventListener('click', (event) => {

        /*
         * Не даём обычному переходу сработать
         * во время обнаружения пасхалки.
         */
        clickCount++;

        clearTimeout(clickTimer);

        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 600);


        // Три быстрых клика
        if (clickCount >= 3) {

            event.preventDefault();

            clickCount = 0;

            activateStandAwakening();

        }

    });

})();



// ==========================================
// 13. STAND AWAKENING
// ==========================================

function activateStandAwakening() {

    resetEffects();

    bgMusic.volume = 0.01;


    // Затемнение
    const overlay = document.createElement('div');

    overlay.style.position = 'fixed';
    overlay.style.inset = '0';

    overlay.style.zIndex = '999998';

    overlay.style.background =
        'radial-gradient(circle, rgba(168,85,247,.1), rgba(0,0,0,.97))';

    overlay.style.opacity = '0';

    overlay.style.transition = 'opacity .35s ease';

    overlay.style.pointerEvents = 'none';

    document.body.appendChild(overlay);


    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });


    // Большой GO
    const go = document.createElement('div');

    go.textContent = 'ゴゴゴゴ';

    go.style.position = 'fixed';
    go.style.left = '50%';
    go.style.top = '50%';

    go.style.transform =
        'translate(-50%, -50%) scale(.2)';

    go.style.zIndex = '999999';

    go.style.pointerEvents = 'none';

    go.style.fontFamily = 'Impact, sans-serif';

    go.style.fontSize =
        'clamp(4rem, 14vw, 12rem)';

    go.style.fontWeight = '900';

    go.style.letterSpacing = '-5px';

    go.style.color = '#a855f7';

    go.style.textShadow = `
        5px 5px 0 #000,
        0 0 30px #a855f7,
        0 0 60px rgba(168,85,247,.8)
    `;

    go.style.opacity = '0';

    go.style.transition =
        'all .6s cubic-bezier(.175,.885,.32,1.275)';

    document.body.appendChild(go);


    requestAnimationFrame(() => {

        go.style.opacity = '1';

        go.style.transform =
            'translate(-50%, -50%) scale(1)';

    });


    // Иероглифы
    spawnMangaKanjiBurst(20);


    // Тряска
    addPageEffect('screen-shake-hard');


    setTimeout(() => {

        removePageEffect('screen-shake-hard');

        go.style.transform =
            'translate(-50%, -50%) scale(1.25)';

        go.style.opacity = '0';

        overlay.style.opacity = '0';

    }, 850);


    setTimeout(() => {

        go.remove();
        overlay.remove();

        if (isMusicStarted) {
            bgMusic.volume = 0.12;
            bgMusic.play().catch(() => {});
        }

    }, 1300);

}