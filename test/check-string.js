// Check what character is actually in the test string
const str = '彼は叫んだ！』';
const indices = [];
for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    indices.push(`${str[i]} = U+${code.toString(16).toUpperCase().padStart(4, '0')}`);
}
console.log('Character codes in test string: "彼は叫んだ！』"');
console.log(indices.join(', '));
