document.addEventListener("DOMContentLoaded", (function () {
    iniciarApp()
}
));

function iniciarApp() {
    setupProgressBar(),
        setupPlayPauseToggle(),
        setupVolumeControl(),
        setupFastForwardRewind(),
        setUpControlBar(),
        setUpSettingsControl(),
        switchqualityVideo(),
        sepeedVideoManagment()
}


function setupProgressBar() {
    const video = document.getElementById("videoPlayer");
    const audio = document.getElementById("audioPlayer")
    const progressBarFill = document.getElementById("progress-bar-fill");
    const totalTime = document.querySelector(".totalTime");
    const currentTime = document.querySelector(".current_time");
    const progressBar = document.getElementById("progress-bar");

    video.addEventListener("loadedmetadata", (() => totalTime.textContent = formatTime(video.duration)));
    video.addEventListener("timeupdate", (function () {
        let progress = video.currentTime / video.duration * 100;
        progressBarFill.style.width = progress + "%";
        currentTime.textContent = formatTime(video.currentTime);
    }
    ));
    progressBar.addEventListener("click", (function (event) {
        var rect = progressBar.getBoundingClientRect();
        var progress = (event.clientX - rect.left) / rect.width * video.duration;
        video.currentTime = progress;
        audio.currentTime = progress;
    }
    ))
}

function formatTime(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60)
    var seconds = Math.floor(timeInSeconds % 60);
    return minutes + ":" + (seconds = seconds < 10 ? "0" + seconds : seconds)
}

function setupPlayPauseToggle() {
    const video = document.getElementById("videoPlayer");
    const audio = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("play-pause-button");
    const playPauseIcon = document.getElementById("play-pause")
    playPauseButton.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            audio.play();
        } else {
            video.pause();
            audio.pause();
        }
    });
    video.addEventListener("ended", (function () {
        playPauseButton.style.display = "block",
            playPauseButton.className = "fas fa-play"
    }
    ));
    audio.addEventListener("ended", (function () {
        playPauseButton.style.display = "block",
            playPauseButton.className = "fas fa-play"
    }
    ));
    video.addEventListener("click", (function () {
        video.paused ? (playPauseButton.style.display = "none",
            playPauseIcon.className = "fas fa-pause",
            video.play()) : (playPauseButton.style.display = "block",
                playPauseButton.className = "fas fa-play",
                playPauseIcon.className = "fas fa-play",
                video.pause(),
                audio.pause())
    }
    ));
    video.addEventListener("play", (function () {
        audio.play();
        playPauseButton.style.display = "none",
            playPauseIcon.className = "fas fa-pause"
    }
    ));
    playPauseIcon.addEventListener("click", function () {
        if (video.paused) {
            playPauseIcon.className = "fas fa-pause"
            video.play();
            audio.play();
        } else {
            playPauseIcon.className = "fas fa-play"
            audio.pause();
            video.pause();
        }
    });
}

function setupVolumeControl() {
    var audio = document.getElementById("audioPlayer")
    var volumeSlider = document.getElementById("volume-slider")
    var volumeIcon = document.getElementById("volume-icon");
    audio.volume = .5;
    volumeSlider.value = .5;

    updateVolumeIcon(audioPlayer.volume, volumeIcon);
    updateBarVolume(audioPlayer.volume, volumeSlider);

    volumeSlider.addEventListener("input", (function () {
        const volume = volumeSlider.value;
        audio.volume = volume;
        updateVolumeIcon(volume, volumeIcon);
        updateBarVolume(volume, volumeSlider);
    }
    )),
        volumeIcon.addEventListener("click", (function () {
            volumeSlider.value = 0,
                audio.volume = 0,
                updateVolumeIcon(0, volumeIcon),
                updateBarVolume(0, volumeSlider)
        }
        ))
}

function updateVolumeIcon(volume, volumeIcon) {
    volumeIcon.className = volume <= .05 ? "fas fa-volume-mute" : volume > .05 && volume <= .5 ? "fas fa-volume-down" : "fas fa-volume-up"
}

function updateBarVolume(volume, volumeSlider) {
    const color = 0 == volume ? "#aaa" : `rgb(${255 * (1 - volume)}, ${255 * volume}, 0)`;
    volumeSlider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${100 * volume}%, #fff ${100 * volume}%, #fff 100%)`
}

function setupFastForwardRewind() {
    const video = document.getElementById("videoPlayer");
    const audio = document.getElementById("audioPlayer");
    const forwardButton = document.getElementById("forward-button");
    const rewindButton = document.getElementById("rewind-button");

    forwardButton.addEventListener("click", (() => video.currentTime += 5));
    forwardButton.addEventListener("click", (() => audio.currentTime += 5));
    rewindButton.addEventListener("click", (() => video.currentTime -= 5));
    rewindButton.addEventListener("click", (() => audio.currentTime -= 5));
}

function setUpControlBar() {
    const video = document.getElementById("videoPlayer")
        , divFather = document.getElementById("custom-controls")
        , divControl = document.querySelector(".controls-container");
    let hideTimer;
    divFather.addEventListener("mouseover", (function () {
        clearTimeout(hideTimer),
            divControl.classList.remove("hidden")
    }
    )),
        divFather.addEventListener("mouseout", (function () {
            video.paused || (hideTimer = setTimeout((function () {
                divControl.classList.add("hidden")
            }
            ), 1e3))
        }
        ))
}

function setUpSettingsControl() {
    const settingsIcon = document.getElementById("setting_icon")
        , popContainer = document.querySelector(".popover_container")
        , popOverOptions = document.querySelectorAll(".popover_options")
        , arrowsLeft = document.querySelectorAll(".fa-arrow-left");
    settingsIcon.addEventListener("click", (function () {
        popContainer.classList.contains("hidden") && isOpenSelectorPopover() ? document.querySelectorAll(".popover_selector_container").forEach((container => {
            container.classList.add("hidden")
        }
        )) : popContainer.classList.contains("hidden") ? popContainer.classList.remove("hidden") : popContainer.classList.add("hidden")
    }
    )),
        popOverOptions.forEach((option => {
            option.addEventListener("click", (function () {
                popContainer.classList.add("hidden"),
                    document.getElementById(this.getAttribute("data-target")).classList.remove("hidden")
            }
            ))
        }
        )),
        arrowsLeft.forEach((arrowLeft => {
            arrowLeft.addEventListener("click", (function () {
                document.getElementById(this.getAttribute("data-target")).classList.add("hidden"),
                    popContainer.classList.remove("hidden")
            }
            ))
        }
        ))
    const video = document.getElementById("videoPlayer");
    //const subtitleButton = document.getElementById("options_lenguage"); // Asegúrate de que este sea el ID correcto para tu botón de subtítulos.
    //const subtitleTracks = video.textTracks; // Esto obtiene las pistas de subtítulos del video.
    
    const englishBtn = document.getElementById('button-en');
    const spanishBtn = document.getElementById('button-es');

    // Función para desactivar todos los subtítulos
    function hideAllSubtitles() {
        const tracks = video.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].mode = 'hidden';
        }
    }

    // Función para activar un track específico por idioma
    function showSubtitleTrack(language) {
        hideAllSubtitles(); // Primero ocultamos todos los subtítulos
        const tracks = video.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].language === language) {
                tracks[i].mode = 'showing';
            }
        }
    }

    englishBtn.addEventListener('click', () => {
        showSubtitleTrack('en');
    });

    spanishBtn.addEventListener('click', () => {
        showSubtitleTrack('es');
    });

    /*subtitleButton.addEventListener("click", () => {
        // Esta es la lógica para alternar la visibilidad de los subtítulos.
        for (let i = 0; i < subtitleTracks.length; i++) {
            subtitleTracks[i].mode = subtitleTracks[i].mode === 'showing' ? 'hidden' : 'showing';
        }
    });*/
}

function isOpenSelectorPopover() {
    return Array.from(document.querySelectorAll(".popover_selector_container")).some((container => !container.classList.contains("hidden")))
}

function switchqualityVideo() {
    const video = document.getElementById('videoPlayer');
    const buttonsQuality = document.querySelectorAll('.button-quality');
    var a = $("#videoPlayer").attr("src");
    buttonsQuality.forEach(button => {
        button.addEventListener('click', function () {
            event.preventDefault();

            buttonsQuality.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            let _time = video.currentTime;
            console.log("HA ENTRADO");
            console.log(button);
            switch (button.id) {
                case "1080p":
                    resetPlayers();
                    video.src = '';
                    video.src = video.getAttribute('data-src-1080');
                    video.play();
                    break;
                case "720p":
                    resetPlayers();
                    video.src = '';
                    video.src = video.getAttribute('data-src-720');
                    video.play();
                    break;
                case "360p":
                    resetPlayers();
                    video.src = '';
                    video.src = video.getAttribute('data-src-360');
                    video.play();
                    break;
                case "DASH":
                    switchToDASH(_time);
                    break;
                case "HLS":
                    switchToHLS();
                    break;
            }
            video.currentTime = _time;
        });
    });
}

function switchToDASH(_time) {
    if (window.hlsPlayer) {
        window.hlsPlayer.destroy();
    }
    initializeDASH(_time);
}

function switchToHLS() {
    if (window.dashPlayer) {
        window.dashPlayer.reset();
    }
    initializeHLS();
}

function resetPlayers() {     
    if (window.dashPlayer) {         
        window.dashPlayer.reset();     
    }     
    if (window.hlsPlayer) {         
        window.hlsPlayer.destroy();     
    } 
}

function initializeHLS() {
    var video = document.getElementById('videoPlayer');
    var audio = document.getElementById('audioPlayer');
    console.log(video);
    var a = video.getAttribute('data-video-id');
    console.log(a);
    video.src = ''; // Limpiar la fuente
    if (Hls.isSupported()) {
        var hls = new Hls();
        window.hlsPlayer = hls; // Guardar la instancia de HLS para referencia futura
        if (a == "video0") {
            hls.loadSource('https://gdie2408.ltim.uib.es/videos/Amorfoda/master.m3u8');
            console.log("HLS DE Amorfoda");
        } else if (a == "video1") {
            hls.loadSource('https://gdie2408.ltim.uib.es/videos/BeautifulGirls/master.m3u8');
            console.log("HLS DE BeautifulGirls");
        } else if (a == "video2") {
            hls.loadSource('https://gdie2408.ltim.uib.es/videos/LaUltima/master.m3u8');
            console.log("HLS DE LaUltima");
        } else {
            console.log ("NO SE HA DETECTADO EL VIDEO ACTUAL");
        }
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.currentTime = 0;
            audio.currentTime = 0;
            video.play();
            audio.play();
        })
    };
}

function initializeDASH(_time) {
    var video = document.getElementById('videoPlayer');
    var a = video.getAttribute('data-video-id');
    video.src = ''; // Limpiar la fuente
    var player = dashjs.MediaPlayer().create();
    if (a == "video0") {
        player.initialize(video, 'https://gdie2408.ltim.uib.es/videos/Amorfoda/masterAmorfoda.mpd', true);
        console.log("DASH DE AMORFODA");
    } else if (a == "video1") {
        player.initialize(video, 'https://gdie2408.ltim.uib.es/videos/BeautifulGirls/masterBG.mpd', true);
        console.log("DASH DE BeatifulGirls");
    } else if (a == "video2") {
        player.initialize(video, 'https://gdie2408.ltim.uib.es/videos/LaUltima/masterLU.mpd', true);
        console.log("DASH DE LaUltima");
    } else {
        console.log ("NO SE HA DETECTADO EL VIDEO ACTUAL");
    }
    window.dashPlayer = player; // Guardar la instancia de DASH para referencia futura
    let change = false;
    player.on(dashjs.MediaPlayer.events.CAN_PLAY, function () {
        if (!change) {
            change = true;
            video.currentTime = _time;
        }
    });
}

function sepeedVideoManagment() {
    const buttons_speed = document.querySelectorAll(".button-speed")
        , video = document.getElementById("videoPlayer")
        , audio = document.getElementById("audioPlayer")
    buttons_speed.forEach((button => {
        button.addEventListener("click", (function () {
            buttons_speed.forEach((btn => btn.classList.remove("active"))),
                video.playbackRate = parseFloat(button.value),
                audio.playbackRate = parseFloat(button.value)
            button.classList.add("active")
        }
        ))
    }
    ))
}