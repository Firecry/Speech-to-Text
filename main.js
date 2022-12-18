
var speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new speechRecognition();
recognition.lang = 'pl-PL';
recognition.continuous = true;

function buttonSwitch(){
    var element = document.getElementById("switch");
    element.classList.toggle("down");

    var micRec = document.getElementById('micActive')

    recognition.onerror = (event) => {
        console.log(event.error)
    }

    recognition.onresult = function(event){
        var dialogue = document.getElementById('dialogue')
        var current = event.resultIndex
        var transcript = event.results[current][0].transcript
        dialogue.innerHTML += `<li><span id="transcriptContent">${transcript}</span></li>`
    }
    
    if(element.classList.contains('down')){
        micRec.style.animation = 'micRecorder .5s infinite alternate'
        recognition.start();
        recognition.onstart = function(){
            console.log("Started");
        }
    }
    else{
        micRec.style.animation = '';
        recognition.stop();
        recognition.onspeechend = function(){
            console.log("Stopped");
        }
    }
}

const textTranscript = document.querySelectorAll('#transcriptContent')

const lektor = new SpeechSynthesisUtterance();
lektor.volume = 1
lektor.rate = 1
lektor.pitch = 1.2

var voices = window.speechSynthesis.getVoices();

lektor.voiceURI = "Microsoft Paulina - Polish (Poland)";
lektor.lang = "pl-PL";

function speaker(){
    lektor.text = dialogue.innerText
    speechSynthesis.speak(lektor)
}