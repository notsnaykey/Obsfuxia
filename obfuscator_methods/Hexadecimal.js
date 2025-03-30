const HexadecimalObfuscation = {
    obfuscate: (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(16)).join('');
    },
    deobfuscate: (text) => {
        return text.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    }
};