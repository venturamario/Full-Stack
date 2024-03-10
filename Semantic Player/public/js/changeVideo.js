/*document.addEventListener('DOMContentLoaded', () => {
    // Encuentra todos los enlaces que cambian el video
    document.querySelectorAll('.change-video').forEach(link => {
      link.addEventListener('click', function(e) {
        const newVideoSrcNormal = this.getAttribute('data-src-normal'); // Obtiene la fuente del video normal
        const newVideoSrcKaraoke = this.getAttribute('data-src-karaoke'); //obtiene también el video karaoke
        const videoPlayer = document.getElementById('videoPlayer'); // Encuentra el reproductor de video

        // Debugging
        console.log("new video source normal: "+ newVideoSrcNormal);
        console.log("new video source karaoke: "+ newVideoSrcKaraoke);
        
        // Cambia la fuente del video y reinicia la reproducción
        if (videoPlayer) {
          videoPlayer.src = newVideoSrcNormal; // Asigna la nueva fuente del video normal
          // Guarda ambos modos en el elemento para uso futuro
          videoPlayer.setAttribute('data-src-normal', newVideoSrcNormal);
          videoPlayer.setAttribute('data-src-karaoke', newVideoSrcKaraoke);

          videoPlayer.load(); // Carga el video
        } else {
          // Debugging
          console.log("Player not found (changeVideo.js)");
        }
      });
    });
  });*/

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.change-video').forEach(link => {
        link.addEventListener('click', function(e) {
            const newVideoSrcNormal = this.getAttribute('data-src-normal'); // Fuente del video normal
            console.log(newVideoSrcNormal);
            const newVideoSrcKaraoke = this.getAttribute('data-src-karaoke'); // Fuente del video de karaoke
            console.log(newVideoSrcKaraoke);
            const videoPlayer = document.getElementById('videoPlayer'); // Encuentra el reproductor de video

            if (videoPlayer) {
                // Asigna la fuente normal y guarda ambas fuentes en el elemento de video
                videoPlayer.src = newVideoSrcNormal;
                videoPlayer.setAttribute('data-src-normal', newVideoSrcNormal);
                videoPlayer.setAttribute('data-src-karaoke', newVideoSrcKaraoke);

                videoPlayer.load(); // Carga el nuevo video
            }
        });
    });
});

  