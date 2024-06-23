document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.change-video').forEach(link => {
    link.addEventListener('click', function (e) {
      const videoPlayer = document.getElementById('videoPlayer'); // Encuentra el reproductor de video
      const audioPlayer = document.getElementById('audioPlayer'); //encuentra el reproductor de audio

      const newVideoSrc = this.getAttribute('data-src-normal');
      const newAudioNormal = this.getAttribute('data-audio-normal');
      const newAudioKaraoke = this.getAttribute('data-audio-karaoke');
      const video1080 = this.getAttribute('data-src-1080');
      const video720 = this.getAttribute('data-src-720');
      const video360 = this.getAttribute('data-src-360');
      const id = this.getAttribute('data-video-id')

      //metadata
      const dataQuizz = this.getAttribute('data-quizz');

      //Subtitulos
      const newVttSrc = this.getAttribute('data-vtt');
      const newVttSrcTrad = this.getAttribute('data-vtt-trad');
      const songLanguage = this.getAttribute('data-lang'); // Idioma de la canción
      let subtitleLang = null;

      if (videoPlayer) {
        // Asigna la fuente original de video
        videoPlayer.src = newVideoSrc;
        //Asigna la fuente normal del audio
        audioPlayer.src = newAudioNormal;

        //Guarda todos los elementos de #changevideo en el VideoPlayer para luego poder trabajar con ellos
        videoPlayer.setAttribute('src', newVideoSrc);
        videoPlayer.setAttribute('data-src-1080', video1080);
        videoPlayer.setAttribute('data-src-720', video720);
        videoPlayer.setAttribute('data-src-360', video360);
        videoPlayer.setAttribute('data-video-id', id);
        videoPlayer.setAttribute('data-quizz', dataQuizz);

        //Guarda los dos audios en el audioPlayer, para luego poder intercambiar entre pistas
        audioPlayer.setAttribute('data-audio-normal', newAudioNormal);
        audioPlayer.setAttribute('data-audio-karaoke', newAudioKaraoke);

        //subtitulos
        clearTracks(videoPlayer); // Limpia todos los tracks antes de añadir nuevos

        if (songLanguage == 'es') {
          subtitleLang = 'Español';

        } else if (songLanguage == 'en') {
          subtitleLang = 'Inglés';
        }

        // Añade la pista de subtítulos principal
        if (newVttSrc) {
          const track = document.createElement('track');
          track.kind = 'subtitles';
          track.label = subtitleLang; // Usa la etiqueta basada en el idioma de la canción
          track.srclang = songLanguage;
          track.src = newVttSrc;
          track.default = true;
          videoPlayer.appendChild(track);
          console.log(videoPlayer)
        }

        if (newVttSrcTrad) {
          const trackTrad = document.createElement('track');
          trackTrad.kind = 'subtitles';
          trackTrad.label = 'Español'; // Subtítulos en español para canciones en inglés
          trackTrad.srclang = 'es';
          trackTrad.src = newVttSrcTrad;
          videoPlayer.appendChild(trackTrad);
        }
      }

      // Añade los metadatos
      if (dataQuizz) {
        const track = document.createElement('track');
        track.kind = 'metadata';
        track.label = 'Metadata';
        track.src = dataQuizz;
        track.default = true;
        videoPlayer.appendChild(track);
      }
      videoPlayer.load(); // Carga el nuevo video
      audioPlayer.load(); // Carga el audio

      // Se resetea la interfaz de usuario
      resetUI();
    });
  });

  function clearTracks(videoElement) {
    let tracks = videoElement.getElementsByTagName('track');
    // Se usa un bucle hacia atrás porque la colección de tracks puede cambiar mientras se eliminan elementos
    for (let i = tracks.length - 1; i >= 0; i--) {
        if (tracks[i].kind === "subtitles" || tracks[i].kind === "metadata") {
            videoElement.removeChild(tracks[i]);
        }
    }
  }

  function resetUI() {
    const audioPlayer = document.getElementById('audioPlayer');
    const videoPlayer = document.getElementById('videoPlayer');
    var option1 = document.getElementById('option0');
    var option2 = document.getElementById('option1');
    var option3 = document.getElementById('option2');
    var option4 = document.getElementById('option3');
    const karaokeModeBtn = document.getElementById('karaokeMode');
    const quizzModeBtn = document.getElementById('quizzModeBtn');
    const questionTitle = document.getElementById('questionTitle');
    const questionText = document.getElementById('questionText');

    // Reajustar controles
    videoPlayer.currentTime = 0;
    audioPlayer.currentTime = 0;
    videoPlayer.pause();
    audioPlayer.pause();

    // Llamada a resetQuizzMode si existe
    if (window.resetQuizzMode) {
      window.resetQuizzMode();
    }

    // Resetear Botones y Textos de Opciones
    const options = [option1, option2, option3, option4];
    options.forEach((option, index) => {
      option.textContent = "Opción " + (index + 1);
      option.className = 'buttonOp' + (index + 1);
      option.disabled = false;
    });

    // Restablecer textos informativos y botones de modos
    questionTitle.textContent = "PlayQuizz";
    questionText.textContent = "Pulsa el botón del modo Quizz para comenzar a jugar";
    karaokeModeBtn.textContent = "ACTIVAR MODO KARAOKE";
    quizzModeBtn.textContent = "ACTIVAR MODO QUIZZ";
  }
});

