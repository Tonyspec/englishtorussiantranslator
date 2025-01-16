const translationMap = {
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
    'E': 'Э', 'e': 'э',
    'Yu': 'Ю', 'yu': 'ю',
    'Ya': 'Я', 'ya': 'я',
    'Q': 'Я', 'q': 'я', // Q is often used for Я on transliteration
    'W': 'В', 'w': 'в', // W can be mapped to В in some transliterations
    'X': 'Кс', 'x': 'кс', // X doesn't have a direct counterpart; typically transliterated as KS
    'J': 'Ж', 'j': 'ж'  // J can also be mapped to Ж in some contexts
};

document.addEventListener('keydown', function(event) {
    if (event.key in translationMap) {
        event.preventDefault();
        const input = event.target;
        if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
            const start = input.selectionStart;
            const end = input.selectionEnd;
            input.value = input.value.substring(0, start) + translationMap[event.key] + input.value.substring(end);
            input.selectionStart = input.selectionEnd = start + 1;
        }
    }
});