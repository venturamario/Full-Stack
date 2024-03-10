document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoPlayer');
  
    document.querySelectorAll('.change-video').forEach(link => {
      link.addEventListener('click', function(e) {
        const newVideoSrc = this.getAttribute('data-src-normal'); // Nueva fuente de video
        const newVttSrc = this.getAttribute('data-vtt'); // Nueva fuente de subtítulos
  
        // Cambia el video
        video.src = newVideoSrc;
  
        // Elimina cualquier pista existente
        while (video.hasChildNodes()) {
          video.removeChild(video.firstChild);
        }
  
        // Añade la nueva pista de subtítulos
        const track = document.createElement('track');
        track.kind = 'subtitles';
        track.label = 'Español';
        track.srclang = 'es';
        track.src = newVttSrc;
        video.appendChild(track);
  
        video.load(); // Carga el nuevo recurso
      });
    });
  });