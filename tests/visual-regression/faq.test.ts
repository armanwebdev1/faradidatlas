import { test, expect } from '@playwright/test'

test('FAQ page looks correct', async ({ page }) => {
  await page.goto('/en/faq')
  await expect(page).toHaveScreenshot('faq-en.png')
})
