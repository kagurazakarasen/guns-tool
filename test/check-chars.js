// Check character codes
const chars = ['」', '『', '）', '〕', '】', '〉', '》', '!', '！', '?', '？'];
console.log('Character codes:');
chars.forEach(ch => {
    console.log(`'${ch}' = U+${ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`);
});

console.log('\n\nTesting character presence in lookahead:\n');

const testStrings = [
    { str: '！', char: '！', name: 'full-width exclamation' },
    { str: '』', char: '』', name: 'full-width close quote' },
    { str: '！続く', char: '！', name: 'in longer string' },
];

// Try different character class approaches
const lookaheads = [
    { pattern: '[」『）〕】〉》!！?？]', desc: 'character class' },
    { pattern: '(?![」『）〕【〉》!！?？])', desc: 'negative lookahead' },
];

testStrings.forEach(({ str, char, name }) => {
    console.log(`Testing: ${name} - "${str}"`);
    const charCode = str.charCodeAt(str.indexOf(char));
    console.log(`  Char '${char}' = U+${charCode.toString(16).toUpperCase().padStart(4, '0')}`);
    
    // Test if character is in our lookahead class
    const testRegex1 = /[」『）〕】〉》!！?？]/.test(str);
    console.log(`  In character class: ${testRegex1}`);
    
    const testRegex2 = /(?![」『）〕【〉》!！?？])/.test(str);
    console.log(`  Negative lookahead matches: ${testRegex2}`);
    
    console.log();
});
