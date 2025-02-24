import { execSync } from 'child_process';
import { describe, it } from 'node:test';
import { deepEqual, strictEqual } from 'node:assert/strict';

describe('RiyalScript Test', () => {
    it('should assert 1 === 1', () => {
        deepEqual(1, 1);
    });
});

describe('RiyalScript Hello Test', () => {
    it('this will print: "Hellooo, RiyalScript!"', () => {
        const output = execSync('node src/RiyalScript.js', { encoding: 'utf8' }).trim();
        strictEqual(output, "Hellooo, RiyalScript!");
    });
});

