document.addEventListener('DOMContentLoaded', () => {
  // Cogemos los elementos videoPlayer y el botón del modo Karaoke por su id
  const videoPlayer = document.getElementById('videoPlayer');
  const audioPlayer = document.getElementById('audioPlayer');
  const karaokeModeBtn = document.getElementById('karaokeMode');

  // Evento asociado al clock en el botón de cambio de modo
  karaokeModeBtn.addEventListener('click', () => {
    // Se obtienen las sources normales y karaoke
    const newVideoSrcNormal = videoPlayer.getAttribute('data-src-normal');
    const audioSrcKaraoke = audioPlayer.getAttribute('data-audio-karaoke');
    const audioSrcNormal = audioPlayer.getAttribute('data-audio-normal')
    // Verificamos la fuente de video actual
    const audioSource = audioPlayer.getAttribute('src');
    
    // Cambia el video bajo previa comprobación de que se detecte el reproductor
    if (audioPlayer) {
      // Reproductor encontrado
      console.log("AudioPlayer found");
      // Detectar si es cambio de normal a karaoke o viceversa
      if (audioSource == audioSrcKaraoke) {
        //Debugging
        console.log("ES EL MODO KARAOKE");
        // Cambiamos el contenido del texto del boton
        karaokeModeBtn.textContent = "CAMBIAR A MODO KARAOKE";
        // Imprimimos fuente actual de video a modo de debugging
        console.log("Actual video: " + audioSource);
        // Cambiar de karaoke a normal
        audioPlayer.src = audioSrcNormal;
        // Print para conmprobar si el cambio se hace bien
        console.log("New video: " + audioSource);

      } else if (audioSource == audioSrcNormal) {
        //Debugging
        console.log("ES EL MODO NORMAL");
        // Cambiamos el contenido del texto del boton
        karaokeModeBtn.textContent = "CAMBIAR A MODO NORMAL";
        // Imprimimos fuente actual de video a modo de debugging
        console.log("Actual video: " + audioSource);
        // Cambiar de normal a karaoke
        audioPlayer.src = audioSrcKaraoke;
        // Print para conmprobar si el cambio se hace bien
        console.log("New video: " + audioSource);
      }

    } else {
      // Reproductor no encontrado
      console.log("Videoplayer not found");
    }
    audioPlayer.load();
    // Carga el nuevo recurso de video
    videoPlayer.load();
    // Reproduce el video
    videoPlayer.play();
    audioPlayer.play();
  })
});