/* global describe it expect */

const Tools = require('../src/tools.js');

describe('Tools', () => {
	describe('logMessage', () => {
		it('should log a given message of an existing log type', () => {
			// Given
			const log = Tools.logMessage('success', 'msg');
			// Then
			expect(log.logColor).toEqual('\x1b[32m%s\x1b[0m');
			expect(log.logMsg).toEqual('HTML-Creator >> msg');
		});
		it('should set the log type to default if none or an invalid type was provided', () => {
			// Given
			const log1 = Tools.logMessage(null, 'msg');
			const log2 = Tools.logMessage('invalidType', 'msg');
			// Then
			expect(log1.logColor).toEqual('\x1b[37m%s\x1b[0m');
			expect(log2.logColor).toEqual('\x1b[37m%s\x1b[0m');
		});
	});
});
