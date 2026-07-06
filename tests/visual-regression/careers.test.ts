import { test, expect } from '@playwright/test'

test('careers page looks correct', async ({ page }) => {
  await page.goto('/en/careers')
  await expect(page).toHaveScreenshot('careers-en.png')
})
