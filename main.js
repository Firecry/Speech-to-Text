
var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new speechRecognition();
recognition.lang = 'pl-PL';
recognition.continuous = true;

function buttonSwitch(){
    var element = document.getElementById("switch");
    element.classList.toggle("down");

    var micRec = document.getElementById('micActive')
    var dialogue = document.getElementById('dialogue')

    recognition.onerror = (event) => {
        console.log(event.error)
    }

    recognition.onresult = function(event){
        var current = event.resultIndex
        var transcript = event.results[current][0].transcript
        dialogue.innerHTML += `<p>${transcript}</p>`
    }
    
    if(element.classList.contains('down')){
        micRec.style.animation = 'micRecorder .5s infinite alternate'
        recognition.start();
        recognition.onstart = function(){
            console.log("I'm listening. Try speaking into the microphone.");
        }
    }
    else{
        micRec.style.animation = '';
        recognition.stop();
        recognition.onspeechend = function(){
            console.log("I'm done listening.");
        }
    }
}