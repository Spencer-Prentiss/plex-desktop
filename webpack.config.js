const path = require('path');
const NodeExternals = require('webpack-node-externals');
const Obfuscator = require('webpack-obfuscator');

module.exports = {
	context: __dirname,
	mode: 'production',
	target: 'electron-main',
	entry: {
		main: path.resolve('./src/main.js'),
	},
	node: {
		__dirname: true,
		global: true,
	},
	output: {
		path: path.resolve('./.dist/webpack'),
		filename: '[name].js',
	},
	externals: [NodeExternals({ modulesFromFile: true })],
	plugins: [
		new Obfuscator({
			compact: true,
			controlFlowFlattening: true,
			controlFlowFlatteningThreshold: 0.25,
			deadCodeInjection: true,
			deadCodeInjectionThreshold: 0.1,
			debugProtection: false,
			disableConsoleOutput: false,
			identifierNamesGenerator: 'hexadecimal',
			log: false,
			numbersToExpressions: true,
			renameGlobals: false,
			rotateStringArray: true,
			rotateUnicodeArray: true,
			selfDefending: true,
			shuffleStringArray: true,
			simplify: true,
			splitStrings: true,
			splitStringsChunkLength: 3,
			stringArray: true,
			stringArrayEncoding: ['base64'],
			stringArrayWrappersCount: 2,
			stringArrayWrappersChainedCalls: true,
			stringArrayWrappersType: 'variable',
			stringArrayThreshold: 0.75,
			unicodeEscapeSequence: false,
			exclude: ['electron'],
		}),
	],
};
