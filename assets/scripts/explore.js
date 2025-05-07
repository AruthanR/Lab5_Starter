window.addEventListener('DOMContentLoaded', init);

function init() {
  const textToSpeak = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = document.querySelector('button');
  const faceImage = document.querySelector('img');
  
  const smilingImage = 'assets/images/smiling.png';
  const openMouthImage = 'assets/images/smiling-open.png';
  
  const synth = window.speechSynthesis;
  let voices = [];
  
  function populateVoiceList() {
    voices = synth.getVoices();
    
    while (voiceSelect.options.length > 1) {
      voiceSelect.options.remove(1);
    }
    
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
    
    if (voiceSelect.options[0].disabled) {
      voiceSelect.options[0].selected = false;
      if (voiceSelect.options.length > 1) {
        voiceSelect.options[1].selected = true;
      }
    }
  }
  
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  populateVoiceList();
  
  function speak() {
    if (synth.speaking) {
      console.log('Speech is already in progress');
      return;
    }

    const text = textToSpeak.value;
    if (text === '') {
      console.log('No text to speak');
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceSelect.selectedIndex > 0) {
      const selectedVoice = voices.find(voice => voice.name === voiceSelect.options[voiceSelect.selectedIndex].getAttribute('data-name'));
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    utterance.onstart = function() {
      faceImage.src = openMouthImage;
    };
    
    utterance.onend = function() {
      faceImage.src = smilingImage;
    };
    
    synth.speak(utterance);
  }
  
  talkButton.addEventListener('click', speak);
}