document.addEventListener('DOMContentLoaded', () => {
  // Cogemos elementos por ID
  var videoPlayer = document.getElementById('videoPlayer');
  const karaokeModeBtn = document.getElementById('karaokeMode');
  // Obtener el elemento <a> con la clase "change-video"
  const linkElement = document.querySelector('.change-video');
  //Obtener valores actuales
  const newVideoSrcNormal = linkElement.getAttribute('data-src-normal'); // Obtiene la fuente del video normal
  const newVideoSrcKaraoke = linkElement.getAttribute('data-src-karaoke'); //obtiene también el video karaoke

  karaokeModeBtn.addEventListener('click', () => {
    //Prints to debug
    console.log("Actual normal video: " + newVideoSrcNormal);
    console.log("Actual karaoke video: " + newVideoSrcKaraoke);

    // Verifica cuál es la fuente de video actual
    var videoSource = videoPlayer.getAttribute("src");
    const esModoKaraoke = videoPlayer.src.includes(videoPlayer.getAttribute('data-src-karaoke'));
    // Cambia el video
    changeVideo();
    // Load new changed videos
    videoPlayer.load(); // Carga el nuevo recurso de video
    videoPlayer.play(); // Reproduce el video
  });

  function changeVideo() {
    if (videoPlayer) {
      console.log("Videoplayer found");
      if (videoSource=newVideoSrcKaraoke) {
        //Debugging
        console.log("ES EL MODO KARAOKE");
        //videoPlayer.src = changeVideo.newVideoSrcNormal;
        karaokeModeBtn.textContent = "Cambiar a Modo Normal";
        console.log("Actual video: " + videoSource);
        // Cambiar de karaoke a normal
        videoPlayer.src = newVideoSrcKaraoke;
        console.log("New video: " + videoSource);

      } else if (videoSource=newVideoSrcNormal) {
        //Debugging
        console.log("ES EL MODO NORMAL");
        //videoPlayer.src = videoPlayer.getAttribute('data-src-karaoke');
        karaokeModeBtn.textContent = "Cambiar a Modo Karaoke";
        console.log("Actual video: " + videoSource);
        // Cambiar de normal a karaoke
        videoPlayer.src = newVideoSrcNormal;
        console.log("New video: " + videoSource);
      }

    } else {
      console.log("Videoplayer not found");
    }
  }
});