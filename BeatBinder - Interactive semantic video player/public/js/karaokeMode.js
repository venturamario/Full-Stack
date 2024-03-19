document.addEventListener('DOMContentLoaded', () => {
  // Cogemos los elementos videoPlayer y el botón del modo Karaoke por su id
  const videoPlayer = document.getElementById('videoPlayer');
  const karaokeModeBtn = document.getElementById('karaokeMode');

  // Evento asociado al clock en el botón de cambio de modo
  karaokeModeBtn.addEventListener('click', () => {
    // Se obtienen las sources normales y karaoke
    const newVideoSrcNormal = videoPlayer.getAttribute('data-src-normal');
    const newVideoSrcKaraoke = videoPlayer.getAttribute('data-src-karaoke');
    // Verificamos la fuente de video actual
    const videoSource = videoPlayer.getAttribute('src');
    
    // Cambia el video bajo previa comprobación de que se detecte el reproductor
    if (videoPlayer) {
      // Reproductor encontrado
      console.log("Videoplayer found");
      // Detectar si es cambio de normal a karaoke o viceversa
      if (videoSource == newVideoSrcKaraoke) {
        //Debugging
        console.log("ES EL MODO KARAOKE");
        // Cambiamos el contenido del texto del boton
        karaokeModeBtn.textContent = "CAMBIAR A MODO KARAOKE";
        // Imprimimos fuente actual de video a modo de debugging
        console.log("Actual video: " + videoSource);
        // Cambiar de karaoke a normal
        videoPlayer.src = newVideoSrcNormal;
        // Print para conmprobar si el cambio se hace bien
        console.log("New video: " + videoSource);

      } else if (videoSource == newVideoSrcNormal) {
        //Debugging
        console.log("ES EL MODO NORMAL");
        // Cambiamos el contenido del texto del boton
        karaokeModeBtn.textContent = "CAMBIAR A MODO NORMAL";
        // Imprimimos fuente actual de video a modo de debugging
        console.log("Actual video: " + videoSource);
        // Cambiar de normal a karaoke
        videoPlayer.src = newVideoSrcKaraoke;
        // Print para conmprobar si el cambio se hace bien
        console.log("New video: " + videoSource);
      }

    } else {
      // Reproductor no encontrado
      console.log("Videoplayer not found");
    }

    // Carga el nuevo recurso de video
    videoPlayer.load();
    // Reproduce el video
    videoPlayer.play();
  })
});