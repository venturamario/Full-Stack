document.addEventListener('DOMContentLoaded', () => {
    // VARIABLES Y CONSTANTES
    const videoPlayer = document.getElementById('videoPlayer');                 // Reproductor de video
    videoPlayer.addEventListener('timeupdate',checkForQuestions);               // Evento asociado al reproductor
    const quizzModeBtn = document.getElementById('quizzModeBtn');               // Boton del modo quizz
    const continuePlayingBtn = document.getElementById('continuePlaying');      // Boton de seguir jugando
    continuePlayingBtn.addEventListener('click', () => continuePlaying());       // Evento asociado al botón
    var questionTitle = document.getElementById('questionTitle');               // Titulo de la pregunta que se hace
    var questionText = document.getElementById('questionText');                 // Pregunta que se hace
    var messageText = document.getElementById('messageText');                   // Mensaje al usuario
    var option1 = document.getElementById('option0');                           // Boton de opcion 1
    var option2 = document.getElementById('option1');                           // Boton de opcion 2
    var option3 = document.getElementById('option2');                           // Boton de opcion 3
    var option4 = document.getElementById('option3');                           // Boton de opcion 4
    option1.addEventListener('click', () => opcionSeleccionada('option0'));     // Evento para la opcion 1
    option2.addEventListener('click', () => opcionSeleccionada('option1'));     // Evento para la opcion 2
    option3.addEventListener('click', () => opcionSeleccionada('option2'));     // Evento para la opcion 3
    option4.addEventListener('click', () => opcionSeleccionada('option3'));     // Evento para la opcion 4
    var idPulsado;                                                              // Id del boton pulsado
    var puntosTotales = 0;                                                      // Puntos totales acumulados en el quizz
    var modoActual = 0;                                                         // Modos: 0 = normal, 1 = quizz
    var numPregunta = -1;                                                       // Numero de pregunta
    var idx = 0;                                                                // Auxiliar (temporal)
    var preguntasVideo;                                                         // Array de preguntas asociadas a cada video
    var stringVideo;                                                            // String que representará el video sobre el que se hará el quizz
    var question;                                                               // Pregunta del quizz en un momento dado
    var firstTime = true;                                                       // Primera vez que se hace el modo quizz
    var lastQuestionTime = -1;                                                  // Para gestionar alta frecuencia de comprobación del evento de tiempo

    // Estructura tipo hash con preguintas asociadas a cada video
    const videosData = {
        "video0": {
            source: "videos/BAD BUNNY - AMORFODA (Video Oficial).mp4",
            preguntas: [
                {
                    time: 10,
                    pregunta: "¿Cuál es el nombre real de 'Bad Bunny'?",
                    respuestas: ["Bonifacio Rodríguez", "Benito Antonio", "Sebastián Linares", "Thiago Alcántara"],
                    correcta: 1 // indice 1 para el segundo elemento del array
                },
                {
                    time:60,
                    pregunta: "¿En qué año se estrenó 'Amorfoda'?",
                    respuestas: ["2020", "2017", "2019", "2018"],
                    correcta: 3 // indice 3 para cuarto elemento del array
                },
                {
                    time: 120,
                    pregunta: "¿Cuántas reproducciones aproximadamente tiene el videoclip a día de hoy?",
                    respuestas: ["1100 millones", "660 millones", "1300 millones", "750 millones"],
                    correcta: 0 // indice 0 para el primer elemento del array
                }
            ]
        },
        "video1": {
            source: "videos/Sean Kingston - Beautiful Girls (Official HD Video).mp4",
            preguntas: [
                {
                    time:10,
                    pregunta: "¿Cuál es el nombre del artista?",
                    respuestas: ["Sean Kingston", "Lamine Yamal", "Robert Bryson", "Lewis Michael"],
                    correcta: 0
                },
                {
                    time:110,
                    pregunta: "¿Qué posición ocupó la canción en el MTV Asia top 100 Hits de 2007?",
                    respuestas: ["Puesto nº 1", "Puesto nº 42", "Puesto nº 86", "Puesto nº 100"],
                    correcta: 2
                },
                {
                    time:235,
                    pregunta: "¿Qué temática causó polémica por la letra de la canción?",
                    respuestas: ["El racismo", "El sexismo", "El suicidio", "El veganismo"],
                    correcta: 2
                }
            ]
        },
        "video2": {
            source: "videos/LA ÚLTIMA - Quevedo (Video Oficial).mp4",
            preguntas: [
                {
                    time: 25,
                    pregunta: "¿En qué año nació Quevedo?",
                    respuestas: ["2001", "2000", "2002", "1999"],
                    correcta: 0
                },
                {
                    time: 120,
                    pregunta: "¿Qué productor musical ha participado en la producción de la canción?",
                    respuestas: ["KIDDO Manteca", "Blasfem", "Dualy", "Sky Rompiendo"],
                    correcta: 0
                },
                {
                    
                    time: 200,
                    pregunta: "¿Qué artista no aparece en el videoclip de 'La Última'?",
                    respuestas: ["Myke Towers", "Ill Pekeño", "Saiko", "Yandel"],
                    correcta: 0
                }
            ]
        }
    };

    // Evento asociado al clock en el botón de cambio de modo
    quizzModeBtn.addEventListener('click', () => {
        resetVars();
        // Deshabilitar botones
        disableOptions();
        // Ir a quizz mode
        quizzMode();
    })

    function resetVars() {
        // Resetea los parametros necesarios para que el modo quizz se active y desactive sin problemas en puntuaciones u otras variables
        firstTime=true;
        messageText.textContent = "";
        document.getElementById('continuePlaying').style.display = "none";
        puntosTotales=0;
        lastQuestionTime = -1;
        idx=0;
        numPregunta = -1;
        document.getElementById('option0').className = "buttonOp1";
        document.getElementById('option1').className = "buttonOp2";
        document.getElementById('option2').className = "buttonOp3";
        document.getElementById('option3').className = "buttonOp4";
    }

    function quizzMode() {
        // ---> ES LA PRIMERA VEZ
        if (firstTime) {
            // Ya no sera la primera vez
            firstTime = false;
            // Reiniciar puntos totales
            puntosTotales = 0;
            // No es la primera pregunta, el jugador esta en la pregunta 2 o 3 del quizz
            stringVideo = "video";
            // Coger el video del id que corresponde
            const quizzVideoSrc = videoPlayer.getAttribute("data-src-normal");

            // Buscar el video que coincida con el src y obtener las preguntas del video actual (array)
            for (const videoId in videosData) {
                // Video auxiliar
                const video = videosData[videoId];
                // Si el source de la iteración actual coincide, se actualiza el string
                if (video.source == quizzVideoSrc) {
                    // Preguntas se hacen sobre la cancion en posicion isx
                    numPregunta = idx;
                    // Debugging
                    console.log("Número de video: " + numPregunta);
                    // Se crea el string concatenandole el valor de idx
                    stringVideo = stringVideo + idx;
                    // Debugging
                    console.log("video escogido:" + stringVideo);
                    // Se sale del for para evitar iteraciones innecesarias
                    break;
                }
                idx++;
            }
            // Si numPregunta sigue siendo -1 no se ha encontrado source
            if (numPregunta != -1) {
                // Se ha encontrado source, se debe detectar el modo actual (quizz = 1, normal = 0)
                if (modoActual == 0) {
                    // ---> ESTAMOS EN EL MODO NORMAL
                    // Debugging
                    console.log("Estamos en modo normal, se debe pasar a quizz");
                    // Desactivar controles del reproductor para que el usuario no adelante el video
                    videoPlayer.controls = false;
                    // Reproducir el video desde el inicio para que el usuario no se salte ninguna pregunta
                    videoPlayer.currentTime = 0;
                    // Reproducir video
                    videoPlayer.play();
                    // Se actualiza el valor del modo actual a 1 poprque se acaba de activar el modo quizz
                    modoActual = 1;
                    // Se obtiene el array de preguntas
                    preguntasVideo = videosData[stringVideo].preguntas;
                    // Debugging
                    console.log("Preguntas que se harán en el quizz del video " + preguntasVideo);
                    // Se cambia el texto del botón
                    quizzModeBtn.textContent = "ACTIVAR MODO NORMAL";
                    // Reproducir las preguntas a medida que se alcancen los tiempos pautados
                    checkForQuestions(stringVideo);

                } else {
                    // ---> ESTAMOS EN EL MODO QUIZZ
                    // Debugging
                    console.log("Estamos en modo quizz, se debe pasar a normal");
                    // Reajustar controles
                    videoPlayer.controls = true;
                    videoPlayer.currentTime = 0;
                    videoPlayer.pause();
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

            } else if (numPregunta == -1) {
                console.log("La iteracion no funciona o no se encuentra el source");
            } else {
                console.log("Error");
            }

            // ---> NO ES LA PRIMERA VEZ 
        } else {
                // Mostrar puntos totales
                messageText.textContent = "Puntos acumulados: "+puntosTotales;
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
                // Desactivar controles del reproductor para que el usuario no adelante el video
                videoPlayer.controls = false;
                // Reproducir video
                videoPlayer.play();
                // Se actualiza el valor del modo actual a 0 poprque se acaba de activar el modo normal
                modoActual = 1;
                // Se obtiene el array de preguntas
                preguntasVideo = videosData[stringVideo].preguntas;
                // Se cambia el texto del botón
                quizzModeBtn.textContent = "ACTIVAR MODO NORMAL";
                // Reproducir las preguntas a medida que se alcancen los tiempos pautados
                checkForQuestions();
        }
    }

    function checkForQuestions() {
        videoPlayer.ontimeupdate = () => {
            if (preguntasVideo != null) {
                // Obtener el tiempo actual de reproducción del video, redondeado al segundo más cercano
                var currentTime = Math.floor(videoPlayer.currentTime);
                // Buscar si hay una pregunta en el array de preguntas del video actual que coincida con el tiempo actual
                question = null;
                for (let j = 0; j < preguntasVideo.length; j++) {
                    // Se detecta que el current time coincide con el tiempo en el que deberia hacerse la pregunta
                    if (preguntasVideo[j].time === currentTime && lastQuestionTime!=currentTime) {
                        // Evitar que una misma pregunta se pregunte mas de una vez
                        lastQuestionTime = currentTime;
                        // Guardamos la pregunta que debería hacerse
                        question = preguntasVideo[j].pregunta;
                        // Evitar iteraciones innecesarias
                        break;
                    }
                }
                // Si se encuentra una pregunta en el tiempo actual, se llama a displayQuestion para reproducirla en los divs y botones
                if (question) {
                    // Pausar la reproducción del video
                    videoPlayer.pause();
                    // Mostrar la pregunta y manejar la respuesta utilizando la función displayQuestion
                    displayQuestion(preguntasVideo, question);
                }
            }
        };
    }

    // Funcion que reproduce una pregunta al usuario y pausa el video hasta que este responda a la pregunta.
    // Suma los puntos totales acumulados y muestra mensajes al usuario con la respuesta correcta
    function displayQuestion(preguntasVideo, question) {
        // Detectar el numero de pregunta
        numPregunta = getNumQuestion(preguntasVideo, question);
        console.log("NUMERO DE PREGUNTA ---> "+numPregunta);
        // Cambiar el numero de la pregunta
        questionTitle.textContent = "Pregunta #" + (numPregunta + 1);
        // Se establece el titulo de la pregunta
        questionText.textContent = question;
        // Se establecen las preguntas y respuestas de la pregunta
        option1.textContent = preguntasVideo[numPregunta].respuestas[0];
        option2.textContent = preguntasVideo[numPregunta].respuestas[1];
        option3.textContent = preguntasVideo[numPregunta].respuestas[2];
        option4.textContent = preguntasVideo[numPregunta].respuestas[3];
        // Habilitar respuestas
        enableOptions();
    }

    // Devuelve la posicion de una pregunta (string) en un array de preguntas(strings)
    function getNumQuestion(preguntasVideo, question) {
        // Pregunta
        var numQ = -1;
        // Detectar numero de pregunta
        for (let j = 0; j < preguntasVideo.length; j++) {
            // Se detecta que la pregunta coincide
            if (preguntasVideo[j].pregunta === question) {
                numQ = j;
                return numQ;
            }
        }
        return numQ;
    }

    function opcionSeleccionada(idOpcionSeleccionada) {
        // deshabilitamos las opciones
        disableOptions();
        // Establecer el id del pulsado
        idPulsado = idOpcionSeleccionada;
        // Guardamos el valor de la opcion correcta
        var correcta = preguntasVideo[numPregunta].correcta;
        // Generamos un string con el valor de la opcion correcta
        var idCorrecto = "option" + correcta;

        console.log("RESPUESTA CORRECTA: "+idCorrecto);
        console.log("RESPUESTA PULSADA: "+idPulsado);
        // Se comprueba si el pulsado y el correcto coinciden
        if (idPulsado == idCorrecto) {
            // Respuesta correcta
            puntosTotales += 100;
            // messageText con mensaje que avisa al usuario
            messageText.textContent = "¡Correcto! +100 puntos";
        } else {
            // messageText con mensaje que avisa al usuario
            messageText.textContent = "Has fallado...";
        }

        // Boton para continuar jugando ahora se muestra
        if(modoActual == 1) {
            // Solo debe de mostrarse si estamos en modo quizz
            document.getElementById('continuePlaying').style.display = "inline-block";
        }

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

    // Funcion para continuar
    function continuePlaying() {
        // Modificar el valor de ciertas variables
        idPulsado = null;
        numPregunta++;
        // Ocultar botón de nuevo
        document.getElementById('continuePlaying').style.display = "none";
        // Seguir jugando
        quizzMode();
    }
});