document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.change-video').forEach(link => {
    link.addEventListener('click', function (e) {
      const newVideoSrcNormal = this.getAttribute('data-src-normal'); // Fuente del video normal
      //console.log(newVideoSrcNormal);
      const newVideoSrcKaraoke = this.getAttribute('data-src-karaoke'); // Fuente del video de karaoke
      //console.log(newVideoSrcKaraoke);
      const videoPlayer = document.getElementById('videoPlayer'); // Encuentra el reproductor de video

      if (videoPlayer) {
        // Asigna la fuente normal y guarda ambas fuentes en el elemento de video
        videoPlayer.src = newVideoSrcNormal;
        videoPlayer.setAttribute('src', newVideoSrcNormal);
        videoPlayer.setAttribute('data-src-normal', newVideoSrcNormal);
        videoPlayer.setAttribute('data-src-karaoke', newVideoSrcKaraoke);
        videoPlayer.load(); // Carga el nuevo video
      }
      // Se resetea la interfaz de usuario
      resetUI();
    });
  });
});

function resetUI() {
  const videoPlayer = document.getElementById('videoPlayer'); // Encuentra el reproductor de video
  var option1 = document.getElementById('option0'); // Boton de opcion 1
  var option2 = document.getElementById('option1'); // Boton de opcion 2
  var option3 = document.getElementById('option2'); // Boton de opcion 3
  var option4 = document.getElementById('option3'); // Boton de opcion 4

  // Reiniciar el Reproductor de Video
  videoPlayer.controls = true;
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoPlayer.load();

  // 3. Restablecer Botones y Textos de Opciones
  const options = [option1, option2, option3, option4];
  var idx = 1;
  options.forEach(option => {
      option.textContent = "Opción "+idx;     // Texto por defecto o vacío
      option.className = 'buttonOp'+(idx);  // Eliminar clases para restablecer estilos
      option.disabled = false;                // Re-habilitar los botones por si estaban deshabilitados
      idx++;                                  // Indice aumenta
  });

  // Restablecer textos informativos
  questionTitle.textContent = "PlayQuizz";
  questionText.textContent = "Pulsa el botón del modo Quizz para comenzar a jugar";
  messageText.textContent = "";
  quizzModeBtn.textContent = "ACTIVAR MODO QUIZZ";
}
