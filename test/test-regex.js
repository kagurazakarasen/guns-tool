// Debug: test specific regex pattern
const testCases = [
    { input: '彼は叫んだ！世界へ行く。', expected: '彼は叫んだ！　世界へ行く。', desc: 'normal text after !' },
    { input: '彼は叫んだ！』', expected: '彼は叫んだ！』', desc: 'closing quote 』 after !' },
    { input: 'あれ？！続く', expected: 'あれ？！続く', desc: 'another punct ! after ?' },
];

console.log('Testing regex with negative lookahead:\n');

// This pattern should:
// - Match ! or ！ or ? or ？ when followed by non-space
// - Skip when next char is closing bracket/quote: 」U+300D 』U+300F ）U+FF09 〕U+3015 【U+3011 〉U+3009 》U+300B
// - OR when next char is another punctuation: ! ! ? ?
const regex = /([!！?？])(?![」』）〕【〉》!！?？])([^\s\u3000\n\r])/gu;

testCases.forEach(({ input, expected, desc }) => {
    const result = input.replace(regex, '$1　$2');
    const pass = result === expected;
    console.log(`${pass ? '✓' : '✗'} ${desc}`);
    console.log(`  Input:    "${input}"`);
    console.log(`  Expected: "${expected}"`);
    console.log(`  Actual:   "${result}"`);
    console.log();
});
