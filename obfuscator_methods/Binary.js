const BinaryObfuscation = {
    obfuscate: (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    },
    deobfuscate: (text) => {
        return text.split(' ').map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
    }
};