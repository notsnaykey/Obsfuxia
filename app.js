// Obfuscation methods implementation
const obfuscationMethods = {
    // Encoding methods
    Base64: {
        obfuscate: function(text) {
            try {
                const utf8 = unescape(encodeURIComponent(text));
                return btoa(utf8);
            } catch (e) {
                throw new Error("Invalid input for Base64 encoding");
            }
        },
        deobfuscate: function(text) {
            try {
                const cleaned = text.replace(/[^A-Za-z0-9+/=]/g, '');
                const padded = cleaned + '='.repeat((4 - cleaned.length % 4) % 4);
                return decodeURIComponent(escape(atob(padded)));
            } catch (e) {
                throw new Error("Invalid Base64 input");
            }
        }
    },
    Hexadecimal: {
        obfuscate: function(text) {
            return Array.from(text)
                .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
                .join('');
        },
        deobfuscate: function(text) {
            const cleaned = text.replace(/[^0-9a-fA-F]/g, '');
            if (cleaned.length % 2 !== 0) throw new Error("Invalid hexadecimal input");
            try { // Add try-catch for potential errors during map
                return cleaned.match(/.{1,2}/g)
                    .map(hex => String.fromCharCode(parseInt(hex, 16)))
                    .join('');
            } catch (e) {
                throw new Error("Invalid hexadecimal sequence");
            }
        }
    },
    Binary: {
        obfuscate: function(text) {
            return Array.from(text)
                .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
                .join('');
        },
        deobfuscate: function(text) {
            const cleaned = text.replace(/[^01]/g, '');
            if (cleaned.length % 8 !== 0) throw new Error("Invalid binary input");
             try { // Add try-catch for potential errors during map
                return cleaned.match(/.{1,8}/g)
                    .map(bin => String.fromCharCode(parseInt(bin, 2)))
                    .join('');
             } catch (e) {
                throw new Error("Invalid binary sequence");
            }
        }
    },

    // Substitution methods
    Caesar: {
        obfuscate: function(text, shift = 3) {
            return text.replace(/[a-zA-Z]/g, char => {
                const code = char.charCodeAt(0);
                const base = code >= 97 ? 97 : 65; // Handle lowercase and uppercase
                return String.fromCharCode(((code - base + shift) % 26) + base);
            });
        },
        deobfuscate: function(text, shift = 3) {
            // Ensure shift is positive before calculating reverse shift
            const effectiveShift = shift % 26;
            const reverseShift = (26 - effectiveShift) % 26;
            return this.obfuscate(text, reverseShift); // Use obfuscate with reverse shift
        }
    },
    Vigenere: {
        obfuscate: function(text, key) {
            if (!key) throw new Error("Vigenère key is required");
            key = key.toUpperCase().replace(/[^A-Z]/g, ''); // Clean the key
            if (key.length === 0) throw new Error("Vigenère key must contain letters");
            let result = "";
            let keyIndex = 0;
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                if (charCode >= 65 && charCode <= 90) { // Uppercase
                    const textChar = charCode - 65;
                    const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65;
                    const encryptedChar = ((textChar + keyChar) % 26) + 65;
                    result += String.fromCharCode(encryptedChar);
                    keyIndex++;
                } else if (charCode >= 97 && charCode <= 122) { // Lowercase
                    const textChar = charCode - 97;
                    const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65; // Key is always uppercase
                    const encryptedChar = ((textChar + keyChar) % 26) + 97;
                    result += String.fromCharCode(encryptedChar);
                    keyIndex++;
                } else {
                    result += text[i]; // Keep non-letters as is
                }
            }
            return result;
        },
        deobfuscate: function(text, key) {
            if (!key) throw new Error("Vigenère key is required");
            key = key.toUpperCase().replace(/[^A-Z]/g, ''); // Clean the key
            if (key.length === 0) throw new Error("Vigenère key must contain letters");
            let result = "";
            let keyIndex = 0;
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                 if (charCode >= 65 && charCode <= 90) { // Uppercase
                    const textChar = charCode - 65;
                    const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65;
                    const decryptedChar = ((textChar - keyChar + 26) % 26) + 65;
                    result += String.fromCharCode(decryptedChar);
                    keyIndex++;
                } else if (charCode >= 97 && charCode <= 122) { // Lowercase
                     const textChar = charCode - 97;
                    const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65; // Key is always uppercase
                    const decryptedChar = ((textChar - keyChar + 26) % 26) + 97;
                    result += String.fromCharCode(decryptedChar);
                    keyIndex++;
                } else {
                    result += text[i]; // Keep non-letters as is
                }
            }
            return result;
        }
    },
    ROT13: {
        process: function(text) {
            return text.replace(/[a-zA-Z]/g, char => {
                const code = char.charCodeAt(0);
                const base = code >= 97 ? 97 : 65;
                return String.fromCharCode((code - base + 13) % 26 + base);
            });
        },
        obfuscate: function(text) {
            return this.process(text);
        },
        deobfuscate: function(text) {
            return this.process(text);
        }
    },
    Atbash: {
        process: function(text) {
            return text.replace(/[a-zA-Z]/g, char => {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) { // Uppercase
                    return String.fromCharCode(90 - (code - 65));
                } else if (code >= 97 && code <= 122) { // Lowercase
                    return String.fromCharCode(122 - (code - 97));
                } else {
                    return char; // Should not happen with regex but safe fallback
                }
            });
        },
        obfuscate: function(text) {
            return this.process(text);
        },
        deobfuscate: function(text) {
            return this.process(text);
        }
    },

    // Transform methods
    Reverse: {
        obfuscate: function(text) {
            // Handle Unicode characters correctly
            return Array.from(text).reverse().join('');
        },
        deobfuscate: function(text) {
            // Handle Unicode characters correctly
            return Array.from(text).reverse().join('');
        }
    }
};

// App state
let obfuscationChain = [];
let processInReverseOrder = false; // Whether to process methods in reverse order
const modalOverlay = document.getElementById('modalOverlay');

/**
 * Updates the datetime displayed in the header
 * (Removed as it wasn't present in the original HTML)
 */
// function updateDateTime() {
//     const now = new Date();
//     const formatted = now.toISOString().replace('T', ' ').slice(0, 19);
//     document.getElementById('datetime').textContent = formatted + ' UTC';
// }

/**
 * Updates the chain display with the current obfuscation methods
 */
function updateChainDisplay() {
    const chainDisplay = document.getElementById('chainDisplay');

    // Clear the chain display
    chainDisplay.innerHTML = '';

    // Add content based on chain state
    if (obfuscationChain.length === 0) {
        chainDisplay.innerHTML = '<span class="placeholder-text">Select methods to build chain...</span>';
    } else {
        chainDisplay.innerHTML = obfuscationChain.map((method, index) => {
            let methodText;
            if (typeof method === 'object') {
                if (method.method === 'Caesar') {
                    methodText = `Caesar(${method.shift})`;
                } else if (method.method === 'Vigenere') {
                    // Limit displayed key length for UI
                    const displayKey = method.key.length > 10 ? method.key.substring(0, 7) + '...' : method.key;
                    methodText = `Vigenère("${displayKey}")`;
                } else {
                    methodText = 'Unknown Custom Method'; // Fallback
                }
            } else {
                methodText = method;
            }

            return `
                <div class="chain-item" data-index="${index}">
                    ${methodText}
                    <span class="chain-item-remove" title="Remove this step">×</span>
                </div>
                ${index < obfuscationChain.length - 1 ? '<span class="chain-arrow">→</span>' : ''}
            `;
        }).join('');

        // Add click handlers to remove buttons inside chain items
        chainDisplay.querySelectorAll('.chain-item-remove').forEach(removeBtn => {
            removeBtn.onclick = (e) => {
                e.stopPropagation(); // Prevent triggering click on the whole item
                const itemDiv = removeBtn.closest('.chain-item');
                if (itemDiv) {
                    const index = parseInt(itemDiv.dataset.index);
                    if (!isNaN(index) && index >= 0 && index < obfuscationChain.length) {
                        obfuscationChain.splice(index, 1);
                        updateChainDisplay();
                        // Re-process if needed
                        triggerProcessing();
                    }
                }
            };
        });

         // Optional: Allow clicking the whole item to remove it (alternative UX)
        /*
        chainDisplay.querySelectorAll('.chain-item').forEach(item => {
            item.onclick = (e) => {
                 // Ensure not clicking the remove button itself if it exists separately
                if (e.target.classList.contains('chain-item-remove')) return;

                const index = parseInt(item.dataset.index);
                 if (!isNaN(index) && index >= 0 && index < obfuscationChain.length) {
                    obfuscationChain.splice(index, 1);
                    updateChainDisplay();
                    triggerProcessing(); // Re-process if needed
                }
            };
        });
        */

    }
}


/**
 * Processes text through the obfuscation chain
 * @param {boolean} isObfuscating - Whether to obfuscate or deobfuscate
 */
function processText(isObfuscating) {
    const input = document.getElementById('text').value;
    const result = document.getElementById('result');

    if (!input) {
        result.textContent = ''; // Clear result if input is empty
        return;
    }
     if (obfuscationChain.length === 0) {
        result.textContent = 'Please select at least one method.';
        return;
    }

    let processedText = input;

    // Determine processing order based on user selection and operation
    let methodsToProcess;
    if (isObfuscating) {
        // For obfuscation, respect the user's chosen order (Sequential or Reverse)
        methodsToProcess = processInReverseOrder ? [...obfuscationChain].reverse() : obfuscationChain;
    } else {
        // For deobfuscation, always apply the *reverse* of the obfuscation chain sequence.
        // If they obfuscated A->B->C, deobfuscation must be C->B->A.
        // The 'processInReverseOrder' switch controls the *obfuscation* direction.
        // Deobfuscation order is the inverse of the chain's current visual order.
        methodsToProcess = [...obfuscationChain].reverse();
    }

    let currentStep = 1;

    try {
        for (const method of methodsToProcess) { // Use for...of for clarity
            const methodConfig = typeof method === 'object' ? method : { method: method };
            const processor = obfuscationMethods[methodConfig.method];

            if (!processor) {
                 throw new Error(`Step ${currentStep}: Unknown method "${methodConfig.method}"`);
            }

            try {
                let stepResult;
                if (isObfuscating) {
                    if (!processor.obfuscate) throw new Error(`Method "${methodConfig.method}" does not support obfuscation.`);
                     stepResult = processor.obfuscate(processedText, methodConfig.shift || methodConfig.key); // Pass potential args
                } else {
                     if (!processor.deobfuscate) throw new Error(`Method "${methodConfig.method}" does not support deobfuscation.`);
                    stepResult = processor.deobfuscate(processedText, methodConfig.shift || methodConfig.key); // Pass potential args
                }
                processedText = stepResult;
                currentStep++;
            } catch (e) {
                // Improve error message to indicate which method failed
                let methodIdentifier = typeof method === 'object' ? `${method.method}(${method.shift || method.key || ''})` : method;
                throw new Error(`Step ${currentStep} (${methodIdentifier}): ${e.message}`);
            }
        }
        result.textContent = processedText;
    } catch (error) {
        console.error("Processing Error:", error); // Log the full error for debugging
        result.textContent = `Error: ${error.message}`;
    }
}

/** Helper function to trigger processing based on current mode */
function triggerProcessing() {
    const isObfuscating = document.getElementById('obfuscateButton').classList.contains('active');
    processText(isObfuscating);
}

// Initialize the app
function initializeApp() {
    // Update datetime and start interval (Removed as element wasn't in HTML)
    // updateDateTime();
    // setInterval(updateDateTime, 1000);

    // Set up category toggles
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            category.classList.toggle('collapsed');

            // Update arrow
            const arrow = header.querySelector('span');
            // Ensure the arrow element exists before trying to change it
            if (arrow) {
                if (category.classList.contains('collapsed')) {
                    arrow.textContent = arrow.textContent.replace('▼', '▶');
                } else {
                     arrow.textContent = arrow.textContent.replace('▶', '▼');
                }
            }
        });
        // Initialize categories as expanded
        const arrow = header.querySelector('span');
        if(arrow) {
             arrow.textContent = arrow.textContent.replace('▶', '▼');
        }
        header.parentElement.classList.remove('collapsed');
    });


    // Method selection handlers
    document.querySelectorAll('.method-box').forEach(box => {
        box.addEventListener('click', (e) => {
            // Don't add method if clicking on info icon or its pseudo-element
            if (e.target.classList.contains('info-icon') || window.getComputedStyle(e.target, '::before').content !== 'none') {
                 return;
            }

            const method = box.dataset.method;
            const isCustomizable = box.dataset.customizable === 'true';

            if (isCustomizable) {
                modalOverlay.classList.add('active');

                if (method === 'Caesar') {
                    const modal = document.getElementById('caesarModal');
                    const shiftInput = document.getElementById('caesarShift');
                    shiftInput.value = '3'; // Reset to default
                    modal.classList.add('active');
                    shiftInput.focus(); // Focus the input

                    // Use named function for easier removal later if needed
                    const handleCaesarConfirm = () => {
                        const shift = parseInt(shiftInput.value);
                        // Basic validation
                         if (isNaN(shift) || shift < 1 || shift > 25) {
                            alert("Please enter a valid shift amount between 1 and 25.");
                            return;
                        }
                        obfuscationChain.push({ method: 'Caesar', shift: shift });
                        updateChainDisplay();
                        closeModals();
                        triggerProcessing(); // Process after adding
                        // Clean up listener (optional but good practice)
                        document.getElementById('caesarConfirm').removeEventListener('click', handleCaesarConfirm);
                    };
                    document.getElementById('caesarConfirm').addEventListener('click', handleCaesarConfirm, { once: true }); // Use once to auto-remove


                } else if (method === 'Vigenere') {
                    const modal = document.getElementById('vigenereModal');
                    const keyInput = document.getElementById('vigenereKey');
                    keyInput.value = ''; // Clear previous key
                    modal.classList.add('active');
                    keyInput.focus(); // Focus the input

                    const handleVigenereConfirm = () => {
                        const key = keyInput.value.trim();
                        const cleanedKey = key.toUpperCase().replace(/[^A-Z]/g, '');

                        if (!key || cleanedKey.length === 0) {
                             alert("Please enter a Vigenère key containing at least one letter (A-Z).");
                            return;
                        }
                        obfuscationChain.push({ method: 'Vigenere', key: key }); // Store original key input
                        updateChainDisplay();
                        closeModals();
                        triggerProcessing(); // Process after adding
                         // Clean up listener
                        document.getElementById('vigenereConfirm').removeEventListener('click', handleVigenereConfirm);
                    };
                     document.getElementById('vigenereConfirm').addEventListener('click', handleVigenereConfirm, { once: true });

                }
            } else {
                obfuscationChain.push(method);
                updateChainDisplay();
                 triggerProcessing(); // Process after adding
            }
        });
    });

    // Function to close all modals
    const closeModals = () => {
        document.querySelectorAll('.method-modal').forEach(modal => {
            modal.classList.remove('active');
        });
        modalOverlay.classList.remove('active');
         // Remove specific confirm listeners if modals are closed prematurely
        // (Requires storing listener references or using flags - simpler to just use {once: true} on confirm)
    };

    // Modal handling
    document.querySelectorAll('.modal-cancel').forEach(button => {
        button.onclick = closeModals;
    });

    modalOverlay.onclick = closeModals;

    // Add Esc key listener to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModals();
        }
    });


    // --- Chain Control Button Event Handlers (Now work correctly) ---
    document.getElementById('reverseChainButton').addEventListener('click', () => {
        // No need for stopPropagation anymore as it's outside the updating div
        if (obfuscationChain.length > 1) { // Only reverse if there's something to reverse
             obfuscationChain.reverse();
             updateChainDisplay();
             triggerProcessing(); // Re-process with new order
        }
    });

    document.getElementById('clearChainButton').addEventListener('click', () => {
         if (obfuscationChain.length > 0) { // Only clear if not already empty
            obfuscationChain = [];
            updateChainDisplay();
             triggerProcessing(); // Re-process (will likely show error or clear output)
        }
    });

    // Process mode toggle (sequential vs reverse OBFS)
    document.getElementById('sequentialMode').addEventListener('click', () => {
        document.getElementById('sequentialMode').classList.add('active');
        document.getElementById('reverseMode').classList.remove('active');
        processInReverseOrder = false;
        triggerProcessing(); // Re-process if settings changed
    });

    document.getElementById('reverseMode').addEventListener('click', () => {
        document.getElementById('reverseMode').classList.add('active');
        document.getElementById('sequentialMode').classList.remove('active');
        processInReverseOrder = true;
        triggerProcessing(); // Re-process if settings changed
    });

    // Direction toggle buttons
    document.getElementById('obfuscateButton').addEventListener('click', () => {
        document.getElementById('obfuscateButton').classList.add('active');
        document.getElementById('deobfuscateButton').classList.remove('active');
        processText(true); // Explicitly call with true
    });

    document.getElementById('deobfuscateButton').addEventListener('click', () => {
        document.getElementById('deobfuscateButton').classList.add('active');
        document.getElementById('obfuscateButton').classList.remove('active');
        processText(false); // Explicitly call with false
    });

    // Process on input change (more responsive than just Enter)
    document.getElementById('text').addEventListener('input', () => {
        triggerProcessing();
    });

    // Keep Enter key functionality if desired (optional)
    document.getElementById('text').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline
            triggerProcessing(); // Process on Enter
        }
    });

    // Initialize the chain display on load
    updateChainDisplay();

    // Set default active states visually
    document.getElementById('sequentialMode').classList.add('active');
    document.getElementById('obfuscateButton').classList.add('active');

}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);