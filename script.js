document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('obfuscateButton').addEventListener('click', obfuscate);
    document.getElementById('deobfuscateButton').addEventListener('click', deobfuscate);
});

function obfuscate() {
    const method = document.getElementById('method').value;
    const text = document.getElementById('text').value;
    let obfuscatedText;

    switch (method) {
        case 'Base64':
            obfuscatedText = Base64Obfuscation.obfuscate(text);
            break;
        case 'CaesarCipher':
            obfuscatedText = CaesarCipherObfuscation.obfuscate(text);
            break;
        case 'Reverse':
            obfuscatedText = ReverseObfuscation.obfuscate(text);
            break;
        case 'Whitespace':
            obfuscatedText = WhitespaceObfuscation.obfuscate(text);
            break;
        case 'UTF8':
            obfuscatedText = UTF8Obfuscation.obfuscate(text);
            break;
        case 'Hexadecimal':
            obfuscatedText = HexadecimalObfuscation.obfuscate(text);
            break;
        case 'Binary':
            obfuscatedText = BinaryObfuscation.obfuscate(text);
            break;
        case 'ROT13':
            obfuscatedText = ROT13Obfuscation.obfuscate(text);
            break;
        case 'Atbash':
            obfuscatedText = AtbashObfuscation.obfuscate(text);
            break;
        case 'VigenereCipher':
            obfuscatedText = VigenereCipherObfuscation.obfuscate(text);
            break;
        default:
            obfuscatedText = 'Invalid obfuscation method';
    }

    document.getElementById('result').innerText = obfuscatedText;
}

function deobfuscate() {
    const method = document.getElementById('method').value;
    const text = document.getElementById('text').value;
    let deobfuscatedText;

    switch (method) {
        case 'Base64':
            deobfuscatedText = Base64Obfuscation.deobfuscate(text);
            break;
        case 'CaesarCipher':
            deobfuscatedText = CaesarCipherObfuscation.deobfuscate(text);
            break;
        case 'Reverse':
            deobfuscatedText = ReverseObfuscation.deobfuscate(text);
            break;
        case 'Whitespace':
            deobfuscatedText = WhitespaceObfuscation.deobfuscate(text);
            break;
        case 'UTF8':
            deobfuscatedText = UTF8Obfuscation.deobfuscate(text);
            break;
        case 'Hexadecimal':
            deobfuscatedText = HexadecimalObfuscation.deobfuscate(text);
            break;
        case 'Binary':
            deobfuscatedText = BinaryObfuscation.deobfuscate(text);
            break;
        case 'ROT13':
            deobfuscatedText = ROT13Obfuscation.deobfuscate(text);
            break;
        case 'Atbash':
            deobfuscatedText = AtbashObfuscation.deobfuscate(text);
            break;
        case 'VigenereCipher':
            deobfuscatedText = VigenereCipherObfuscation.deobfuscate(text);
            break;
        default:
            deobfuscatedText = 'Invalid deobfuscation method';
    }

    document.getElementById('result').innerText = deobfuscatedText;
}