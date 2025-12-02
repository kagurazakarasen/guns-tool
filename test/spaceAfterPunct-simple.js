// Simple test runner for spaceAfterPunct regex - no external dependencies
// Run with: node test/spaceAfterPunct-simple.js

const regex = /([!！?？])(?![」『）〕】〉》)}\]!！?？])([^\s\u3000\n\r])/gu;

function applySpaceAfterPunct(input) {
    return input.replace(regex, '$1　$2');
}

function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✓ PASS: ${testName}`);
        return true;
    } else {
        console.log(`✗ FAIL: ${testName}`);
        console.log(`  Expected: ${expected}`);
        console.log(`  Actual:   ${actual}`);
        return false;
    }
}

// Run tests
console.log('=== spaceAfterPunct Regex Tests ===\n');

let passed = 0;
let failed = 0;

if (assertEqual(
    applySpaceAfterPunct('彼は叫んだ！世界へ行く。'),
    '彼は叫んだ！　世界へ行く。',
    'adds space after exclamation before normal text'
)) passed++; else failed++;

if (assertEqual(
    applySpaceAfterPunct('彼は叫んだ！』'),
    '彼は叫んだ！』',
    'does not add space when followed by closing Japanese quote'
)) passed++; else failed++;

if (assertEqual(
    applySpaceAfterPunct('本当に驚いた！？』'),
    '本当に驚いた！？』',
    'does not add space when followed by closing Japanese bracket'
)) passed++; else failed++;

if (assertEqual(
    applySpaceAfterPunct('おお！　続く'),
    'おお！　続く',
    'does not change when fullwidth space already present'
)) passed++; else failed++;

if (assertEqual(
    applySpaceAfterPunct('驚いた！次へ。驚いた？終わり。'),
    '驚いた！　次へ。驚いた？　終わり。',
    'handles multiple occurrences in a line'
)) passed++; else failed++;

if (assertEqual(
    applySpaceAfterPunct('あれ？！続く'),
    'あれ？！続く',
    'does not insert space between adjacent punctuation like ？！'
)) passed++; else failed++;

console.log(`\n=== Tests Complete: ${passed} passed, ${failed} failed ===`);
process.exit(failed > 0 ? 1 : 0);
