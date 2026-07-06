import { test, expect } from '@playwright/test'

test('blog page looks correct', async ({ page }) => {
  await page.goto('/en/blog')
  await expect(page).toHaveScreenshot('blog-en.png')
})
