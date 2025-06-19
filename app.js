let recognizing = false;
let recognition;
let currentVoiceIndex = 0;
let voices = [];

function initSpeechRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-IN';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    handleVoiceCommand(transcript);
  };

  recognition.onend = () => {
    if (recognizing) recognition.start(); // Auto-restart
  };
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  if (voices.length > 0) utterance.voice = voices[currentVoiceIndex];
  window.speechSynthesis.speak(utterance);
}

function handleVoiceCommand(cmd) {
  document.getElementById('output').innerText = 'You said: ' + cmd;
  if (cmd.includes('hey pika') || cmd.includes('wake up pika')) {
    speak('Hello Ash. All systems are online.');
  } else if (cmd.startsWith('pika, learn this')) {
    const learned = cmd.replace('pika, learn this', '').trim();
    localStorage.setItem('custom_command', learned);
    speak('Learned: ' + learned);
  } else if (cmd === 'pika, forget this') {
    localStorage.removeItem('custom_command');
    speak('Forgotten.');
  } else if (cmd === 'pika, change voice') {
    currentVoiceIndex = (currentVoiceIndex + 1) % voices.length;
    speak('Voice changed.');
  } else if (cmd.startsWith('pika, tell the')) {
    const keyword = cmd.replace('pika, tell the', '').trim();
    speak('Showing commands related to ' + keyword);
  } else if (cmd.includes('power off')) {
    speak('Pika is offline now.');
    // Placeholder for native integration
  } else if (cmd.includes('open camera')) {
    speak('Launching camera...');
    // Placeholder for native integration
  } else {
    speak('Command not recognized.');
  }
}

document.getElementById('micButton').addEventListener('click', () => {
  if (!recognizing) {
    recognition.start();
    recognizing = true;
  } else {
    recognition.stop();
    recognizing = false;
  }
});

document.getElementById('toggleVoice').addEventListener('click', () => {
  currentVoiceIndex = (currentVoiceIndex + 1) % voices.length;
  speak('Switched voice');
});

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
};

initSpeechRecognition();
