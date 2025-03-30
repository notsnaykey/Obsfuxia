const CaesarCipherObfuscation = {
    obfuscate: (text, shift = 3) => {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const asciiOffset = char === char.toUpperCase() ? 65 : 97;
                return String.fromCharCode(((char.charCodeAt(0) - asciiOffset + shift) % 26) + asciiOffset);
            }
            return char;
        }).join('');
    },
    deobfuscate: (text, shift = 3) => {
        return CaesarCipherObfuscation.obfuscate(text, -shift);
    }
};