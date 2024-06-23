/*document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('videoPlayer');

  document.querySelectorAll('.change-video').forEach(link => {
    link.addEventListener('click', function (e) {
      clearTracks(video); // Limpia todos los tracks antes de añadir nuevos

      const newVttSrc = this.getAttribute('data-vtt');
      const newVttSrcTrad = this.getAttribute('data-vtt-trad');
      const songLanguage = this.getAttribute('data-lang'); // Idioma de la canción
      let subtitleLang = null;

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
        video.appendChild(track);
        console.log(video)
      }

      if (newVttSrcTrad) {
        const trackTrad = document.createElement('track');
        trackTrad.kind = 'subtitles';
        trackTrad.label = 'Español'; // Subtítulos en español para canciones en inglés
        trackTrad.srclang = 'es';
        trackTrad.src = newVttSrcTrad;
        video.appendChild(trackTrad);
      }
      video.load(); // Carga el nuevo recurso
    });
  });

  function clearTracks(video) {
    // Obtén todas las pistas del elemento de video
    const tracks = video.textTracks;

    // Recorre las pistas para encontrar las pistas de subtítulos
    for (let i = tracks.length - 1; i >= 0; i--) {
      if (tracks[i].kind === "subtitles") { // Asegúrate de que solo las pistas de subtítulos sean removidas
        video.removeChild(tracks[i]); // Elimina la pista de subtítulos
      }
    }
  }
});*/