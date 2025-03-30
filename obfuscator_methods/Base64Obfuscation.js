const Base64Obfuscation = {
    obfuscate: (text) => {
        return btoa(text);
    },
    deobfuscate: (text) => {
        return atob(text);
    }
};