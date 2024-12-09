const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	expect(await page.title()).toBe(
		'Fast and reliable end-to-end testing for modern web apps | Playwright'
	);
});
