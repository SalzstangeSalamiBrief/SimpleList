const { off } = require('process');

module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'eslint-config-airbnb-base',
	],
	rules: {

		indent: ['error', 'tab'],
		'linebreak-style': [0, 'error', 'windows'],
		'no-tabs': 0,
		'no-extra-semi': 'off',
		'class-methods-use-this': 0,
		'no-underscore-dangle': 0,
		// add multiple rules to fix eslint tslint conflicterrors
		'@typescript-eslint/no-extra-semi': ['error'],
		'explicit-function-return-type': [0, 'warning'],
		'import/extensions': 'off',
		'no-mixed-spaces-and-tabs': 0,
		'no-shadow': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['*'],
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
