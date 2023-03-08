import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Discover' }).click();
  await page.locator('div:nth-child(28) > .music-list-item-component_buttons_swipe__SuSSA > .controller-component_controller__Vlzl0 > .controller-component_button__JWbDP').click();
  await page.locator('div:nth-child(28) > .music-list-item-component_buttons_swipe__SuSSA > .controller-component_controller__Vlzl0 > .controller-component_button__JWbDP').click();
  await page.locator('div:nth-child(28) > .music-list-item-component_buttons_swipe__SuSSA > button').first().click();
  await page.locator('div:nth-child(27) > .music-list-item-component_buttons_swipe__SuSSA > .controller-component_controller__Vlzl0 > .controller-component_button__JWbDP').click();
  await page.locator('div:nth-child(27) > .music-list-item-component_buttons_swipe__SuSSA > button:nth-child(3)').click();
  await page.locator('div:nth-child(26) > .music-list-item-component_buttons_swipe__SuSSA > .controller-component_controller__Vlzl0 > .controller-component_button__JWbDP').click();
  await page.getByRole('link', { name: '' }).first().click();
  await page.getByRole('link', { name: 'Top 10' }).click();
  await page.locator('div:nth-child(2) > div > .carousel--like-music-component_card_artist___XYOr > .carousel--like-music-component_card_image_circle__2z588 > a').click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByText('Luni - Topic').nth(1).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: 'Luni - Topic Luni - Topic 17 u Added by Unknown' }).getByRole('link').click();
  const page1 = await page1Promise;
  await page.getByRole('link', { name: 'Top 10' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('main').getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('main').getByRole('link', { name: 'Register' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});