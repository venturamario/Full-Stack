document.addEventListener('DOMContentLoaded', () => {
    // VARIABLES Y CONSTANTES
    const videoPlayer = document.getElementById('videoPlayer');                 // Reproductor de video
    const audioPlayer = document.getElementById('audioPlayer');
    const quizzModeBtn = document.getElementById('quizzModeBtn');               // Boton del modo quizz
    var questionTitle = document.getElementById('questionTitle');               // Titulo de la pregunta que se hace
    var questionText = document.getElementById('questionText');                 // Pregunta que se hace
    var messageText = document.getElementById('messageText');                   // Mensaje al usuario
    var option1 = document.getElementById('option0');                           // Boton de opcion 1
    var option2 = document.getElementById('option1');                           // Boton de opcion 2
    var option3 = document.getElementById('option2');                           // Boton de opcion 3
    var option4 = document.getElementById('option3');                           // Boton de opcion 4
    var puntosTotales = 0;                                                      // Puntos totales acumulados en el quizz
    var modoActual = 0;                                                         // Modos: 0 = normal, 1 = quizz
    var numPregunta = -1;                                                       // Numero de pregunta
    var idx = 0;                                                                // Auxiliar (temporal)
    var preguntasVideo;                                                         // Array de preguntas asociadas a cada video
    var stringVideo;                                                            // String que representará el video sobre el que se hará el quizz
    var firstTime = true;                                                       // Primera vez que se hace el modo quizz

    // Evento asociado al click en el botón de cambio de modo
    quizzModeBtn.addEventListener('click', () => {
        resetVars();
        // Deshabilitar botones
        disableOptions();
        // Ir a quizz mode
        quizzMode();
    })


    function resetVars() {
        // Resetea los parametros necesarios para que el modo quizz se active y desactive sin problemas en puntuaciones u otras variables
        firstTime = true;
        messageText.textContent = "";
        document.getElementById('continuePlaying').style.display = "none";
        puntosTotales = 0;
        lastQuestionTime = -1;
        idx = 0;
        numPregunta = -1;
        document.getElementById('option0').className = "buttonOp1";
        document.getElementById('option1').className = "buttonOp2";
        document.getElementById('option2').className = "buttonOp3";
        document.getElementById('option3').className = "buttonOp4";
        videoPlayer.currentTime = 0;
        audioPlayer.currentTime = 0;
    }

    function quizzMode() {
        // ---> ES LA PRIMERA VEZ
        if (firstTime) {
            // Ya no sera la primera vez
            firstTime = false;
                if (modoActual == 0) {
                    // ---> ESTAMOS EN EL MODO NORMAL
                    // Debugging
                    console.log("Estamos en modo quizz, se debe pasar a normal");
                    // Desactivar controles del reproductor para que el usuario no adelante el video
                    // Reproducir el video desde el inicio para que el usuario no se salte ninguna pregunta
                    videoPlayer.currentTime = 0;
                    // Reproducir video
                    videoPlayer.play();
                    // Se actualiza el valor del modo actual a 1 poprque se acaba de activar el modo quizz
                    modoActual = 1;
                    //Se cambia el texto que sale antes de hacer la pregunta
                    questionText.textContent = "Mira el vídeo hasta que aparezca la siguiente pregunta";
                    // Se cambia el texto del botón
                    quizzModeBtn.textContent = "SALIR DEL MODO QUIZZ";
                    // Reproducir las preguntas a medida que se alcancen los tiempos pautados
                    checkForQuestions();

                } else {
                    // ---> ESTAMOS EN EL MODO QUIZZ
                    // Debugging
                    console.log("Estamos en modo normal, se debe pasar a quizz");
                    // Reajustar controles
                    videoPlayer.currentTime = 0;
                    audioPlayer.currentTime = 0;
                    audioPlayer.play();
                    videoPlayer.play();
                    // Se actualiza el valor del modo actual a 0 poprque se acaba de activar el modo normal
                    modoActual = 0;
                    // Se cambia el texto de todos los componentes al valor inicial que aparecía en index.html
                    quizzModeBtn.textContent = "ACTIVAR MODO QUIZZ"
                    questionTitle.textContent = "PlayQuizz";
                    questionText.textContent = "Pulsa el botón del modo Quizz para comenzar a jugar";
                    option1.textContent = "Opción 1";
                    option2.textContent = "Opción 2";
                    option3.textContent = "Opción 3";
                    option4.textContent = "Opción 4";
                }

            // ---> NO ES LA PRIMERA VEZ 
        } else {
            // Cambiar colores de los botones otra vez
            document.getElementById('option0').className = "buttonOp1";
            document.getElementById('option1').className = "buttonOp2";
            document.getElementById('option2').className = "buttonOp3";
            document.getElementById('option3').className = "buttonOp4";
            // Cambiar texto
            questionTitle.textContent = "Modo Quizz";
            questionText.textContent = "Mira el vídeo hasta que aparezca la siguiente pregunta";
            option1.textContent = "Opción 1";
            option2.textContent = "Opción 2";
            option3.textContent = "Opción 3";
            option4.textContent = "Opción 4";
            // Reproducir video
            videoPlayer.play();
            audioPlayer.play();
            // Se actualiza el valor del modo actual a 0 poprque se acaba de activar el modo normal
            modoActual = 1;
            // Se cambia el texto del botón
            quizzModeBtn.textContent = "SALIR DEL MODO QUIZZ";
            // Reproducir las preguntas a medida que se alcancen los tiempos pautados
            checkForQuestions();
        }
    }

    function checkForQuestions() {
        let numPregunta = 0;
        var quizzTrack = null;
        const tracks = videoPlayer.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].kind === 'metadata') {
                tracks[i].mode = 'hidden';
                quizzTrack = tracks[i];
            }
        }
        quizzTrack.addEventListener('cuechange', function () {
            // Se establece el titulo de la pregunta
            enableOptions();
            let cue = this.activeCues[0];
            console.log(cue);
            if (cue){
                videoPlayer.pause();
                audioPlayer.pause();
                questionTitle.textContent = "Pregunta:";
                preguntasVideo = JSON.parse(cue.text);
                questionText.textContent = preguntasVideo.pregunta;
                option1.textContent = preguntasVideo.respuestas[0];
                option2.textContent = preguntasVideo.respuestas[1];
                option3.textContent = preguntasVideo.respuestas[2];
                option4.textContent = preguntasVideo.respuestas[3];
                option1.addEventListener('click', () => opcionSeleccionada(0, preguntasVideo.correcta));     // Evento para la opcion 1
                option2.addEventListener('click', () => opcionSeleccionada(1, preguntasVideo.correcta));     // Evento para la opcion 2
                option3.addEventListener('click', () => opcionSeleccionada(2, preguntasVideo.correcta));     // Evento para la opcion 3
                option4.addEventListener('click', () => opcionSeleccionada(3, preguntasVideo.correcta));     // Evento para la opcion 4
            }
        });
    };


    function opcionSeleccionada(idOpcionSeleccionada, correcta) {
        // deshabilitamos las opciones
        disableOptions();
        // Generamos un string con el valor de la opcion correcta
        var idCorrecto = "option" + correcta;
        // Se comprueba si el pulsado y el correcto coinciden
        if (idOpcionSeleccionada == correcta) {
            // messageText con mensaje que avisa al usuario
            messageText.textContent = "¡Correcto!";
        } else {
            // messageText con mensaje que avisa al usuario
            messageText.textContent = "Has fallado...";
        }

        // Esperar 3 segundos antes de reanudar el vídeo y mostrar la siguiente pregunta
        setTimeout(() => {
            actualizarInterfaz();
            videoPlayer.play(); // Reanudar el vídeo
            audioPlayer.play();
        }, 3000); 

        // Cambiar colores de los botones según si es correcto o incorrecto
        document.getElementById(idCorrecto).classList.add("correctStyle");
        // Los botones incorrectos aparecerán de color rojo
        for (let i = 0; i < 4; i++) {
            var idBoton = "option" + i;
            // Verificar si el botón actual no es el correcto
            if (idBoton !== idCorrecto) {
                // Marcar el botón actual como incorrecto
                document.getElementById(idBoton).classList.add("wrongStyle");
            }
        }
    }

    function actualizarInterfaz() {
        // Restablecer el título de la pregunta y el texto de la pregunta para la siguiente visualización
        questionTitle.textContent = "PlayQuizz";
        questionText.textContent = "Mira el vídeo hasta que aparezca la siguiente pregunta";
        option1.textContent = "Opción 1";
        option2.textContent = "Opción 2";
        option3.textContent = "Opción 3";
        option4.textContent = "Opción 4";
        document.getElementById('option0').className = "buttonOp1";
        document.getElementById('option1').className = "buttonOp2";
        document.getElementById('option2').className = "buttonOp3";
        document.getElementById('option3').className = "buttonOp4";
        messageText.textContent = "";
    }

    // Inhabilita las funciones de los botones de opciones de respuesta
    function disableOptions() {
        var options = [option1, option2, option3, option4];
        options.forEach(option => {
            option.disabled = true;
        });
    }

    // Habilita las funciones de los botones de opciones de respuesta
    function enableOptions() {
        var options = [option1, option2, option3, option4];
        options.forEach(option => {
            option.disabled = false;
        });
    }

    // quizzMode.js
    window.resetQuizzMode = function () {
        if (modoActual === 1) { // Si estamos en modo quizz
            quizzModeBtn.click(); // Simula un clic en el botón para volver al modo normal
        }
        // Aquí puedes agregar cualquier otra lógica de limpieza que necesites
    };
});