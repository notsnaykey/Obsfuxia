const VigenereCipherObfuscation = {
    _extendKey: (text, key) => {
        return key.repeat(Math.ceil(text.length / key.length)).substring(0, text.length);
    },
    obfuscate: (text, key = "SECRET") => {
        const extendedKey = VigenereCipherObfuscation._extendKey(text, key);
        return text.split('').map((char, i) => {
            if (/[a-zA-Z]/.test(char)) {
                const asciiOffset = char === char.toUpperCase() ? 65 : 97;
                const keyShift = extendedKey[i].toUpperCase().charCodeAt(0) - 65;
                return String.fromCharCode(((char.charCodeAt(0) - asciiOffset + keyShift) % 26) + asciiOffset);
            }
            return char;
        }).join('');
    },
    deobfuscate: (text, key = "SECRET") => {
        const extendedKey = VigenereCipherObfuscation._extendKey(text, key);
        return text.split('').map((char, i) => {
            if (/[a-zA-Z]/.test(char)) {
                const asciiOffset = char === char.toUpperCase() ? 65 : 97;
                const keyShift = extendedKey[i].toUpperCase().charCodeAt(0) - 65;
                return String.fromCharCode(((char.charCodeAt(0) - asciiOffset - keyShift + 26) % 26) + asciiOffset);
            }
            return char;
        }).join('');
    }
};