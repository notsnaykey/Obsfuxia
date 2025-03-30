const WhitespaceObfuscation = {
    obfuscate: (text) => {
        const whitespaceChars = [' ', '\t', '\n', '\r', '\f', '\v'];
        return text.split('').map(char => {
            if (/\s/.test(char)) {
                return whitespaceChars[Math.floor(Math.random() * whitespaceChars.length)];
            }
            return char;
        }).join('');
    },
    deobfuscate: (text) => {
        return text.split(/\s+/).join(' ');
    }
};