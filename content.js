// Mapping for English to Russian transcription
const transcriptionMap = {
    'A': 'А', 'a': 'а',
    'B': 'Б', 'b': 'б',
    'V': 'В', 'v': 'в',
    'G': 'Г', 'g': 'г',
    'D': 'Д', 'd': 'д',
    'E': 'Е', 'e': 'е',
    'Yo': 'Ё', 'yo': 'ё',
    'Zh': 'Ж', 'zh': 'ж',
    'Z': 'З', 'z': 'з',
    'I': 'И', 'i': 'и',
    'Y': 'Й', 'y': 'й',
    'K': 'К', 'k': 'к',
    'L': 'Л', 'l': 'л',
    'M': 'М', 'm': 'м',
    'N': 'Н', 'n': 'н',
    'O': 'О', 'o': 'о',
    'P': 'П', 'p': 'п',
    'R': 'Р', 'r': 'р',
    'S': 'С', 's': 'с',
    'T': 'Т', 't': 'т',
    'U': 'У', 'u': 'у',
    'F': 'Ф', 'f': 'ф',
    'Kh': 'Х', 'kh': 'х',
    'Ts': 'Ц', 'ts': 'ц',
    'Ch': 'Ч', 'ch': 'ч',
    'Sh': 'Ш', 'sh': 'ш',
    'Shch': 'Щ', 'shch': 'щ',
    '"': 'Ъ', '`': 'ъ',
    'Y': 'Ы', 'y': 'ы',
    '\'': 'Ь', '`': 'ь',
    'Eh': 'Э', 'eh': 'э', 
    'Yu': 'Ю', 'yu': 'ю',
    'Ya': 'Я', 'ya': 'я',
};

let transcriptionActive = false;
let buffer = ''; // Buffer to store characters for multi-character transcription

// Function to transcribe text in real time, considering multi-character mappings
function transcribeText(element, key, isBackspace = false) {
    if (isBackspace) {
        // When backspace is pressed, remove the last character from buffer
        buffer = buffer.slice(0, -1);
    } else {
        buffer += key.toLowerCase(); // Add new input to buffer
    }
    
    let newValue = '';
    let i = 0;
    
    while (i < buffer.length) {
        let matchFound = false;
        // Sort keys by length descending to match longer sequences first
        const sortedKeys = Object.keys(transcriptionMap).sort((a, b) => b.length - a.length);
        
        for (let transKey of sortedKeys) {
            if (buffer.slice(i, i + transKey.length) === transKey.toLowerCase()) {
                newValue += transcriptionMap[transKey];
                i += transKey.length;
                matchFound = true;
                break;
            }
        }
        if (!matchFound) {
            newValue += buffer[i];
            i++;
        }
    }
    
    element.value = newValue;
    // Reset buffer for next input but keep the last few characters for context
    buffer = newValue.split('').map(char => {
        for (let key in transcriptionMap) {
            if (transcriptionMap[key] === char) return key.toLowerCase();
        }
        return char;
    }).join(''); // Keep entire buffer instead of just last few characters
}

// Event listener for real-time transcription
function startTranscription() {
    document.body.addEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
            if (event.inputType === 'deleteContentBackward') {
                transcribeText(event.target, '', true);
            } else {
                transcribeText(event.target, event.data || '');
            }
        }
    });
}

// Stop transcription by removing the event listener
function stopTranscription() {
    document.body.removeEventListener('input', function(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
            transcribeText(event.target, event.data || '');
        }
    });
}

// Listen for messages from the popup to toggle transcription
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleTranscription") {
        transcriptionActive = request.value;
        if (transcriptionActive) {
            startTranscription();
        } else {
            stopTranscription();
        }
    }
});

// Initially check if transcription should be active
chrome.storage.local.get(['transcriptionActive'], function(result) {
    if (result.transcriptionActive) {
        transcriptionActive = true;
        startTranscription();
    }
});