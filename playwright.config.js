const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './tests', // Убедитесь, что папка tests существует и содержит тесты
	reporter: 'list',
});
