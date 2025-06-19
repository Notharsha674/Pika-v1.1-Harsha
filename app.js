let recognition;
function startListening() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    document.getElementById("status").textContent = "Status: Listening...";
  };

  recognition.onresult = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.trim();
    handleCommand(command.toLowerCase());
  };

  recognition.onend = () => {
    document.getElementById("status").textContent = "Status: Offline";
  };

  recognition.start();
}

function stopListening() {
  if (recognition) recognition.stop();
}

function handleCommand(cmd) {
  if (cmd.includes("hello pika")) {
    speak("Hello Ash, Pika is ready.");
  } else if (cmd.includes("go offline")) {
    speak("Pika is offline now.");
    stopListening();
  } else {
    speak("Sorry, I didn’t catch that.");
  }
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  synth.speak(utterance);
}
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  synth.speak(utterance);
}
