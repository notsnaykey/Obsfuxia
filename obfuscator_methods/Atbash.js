const AtbashObfuscation = {
    obfuscate: (text) => {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(start + 25 - (char.charCodeAt(0) - start));
            }
            return char;
        }).join('');
    },
    deobfuscate: (text) => {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char)) {
                const start = char <= 'Z' ? 65 : 97;
                return String.fromCharCode(start + 25 - (char.charCodeAt(0) - start));
            }
            return char;
        }).join('');
    }
};