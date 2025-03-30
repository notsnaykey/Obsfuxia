const UTF8Obfuscation = {
    obfuscate: (text) => {
        return Array.from(text).map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    },
    deobfuscate: (text) => {
        return text.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    }
};