import { test, expect } from "@playwright/test";
test("cinematic hero and reversible transformation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("button", { name: "SKIP INTRO" })).toBeVisible();
  await page.getByRole("button", { name: "SKIP INTRO" }).click();
  await expect(
    page.getByRole("heading", { name: "SPIDER-MAN", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /UNLEASH YOUR POWER/ }).click();
  await expect(
    page.getByRole("img", {
      name: "Fully transformed black and red Spider-Man",
    }),
  ).toBeVisible({ timeout: 6000 });
  await page.getByRole("button", { name: /BACK TO HUMAN/ }).click();
  await expect(
    page.getByRole("img", { name: "Businessman looking at his raised hand" }),
  ).toBeVisible({ timeout: 6000 });
  await page.getByRole("button", { name: "GAMES", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Meet your new hero" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "PRE-ORDER NOW" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "independent fan concept",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Play launch trailer" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie/,
  );
  await page.keyboard.press("Escape");
  await page.screenshot({ path: "/tmp/spiderman-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});
test("mobile layout, navigation and manual transformation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "SKIP INTRO" }).click();
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.getByRole("button", { name: "GAMES", exact: true }).click();
  await page.getByRole("link", { name: "Meet your new hero" }).click();
  await expect(
    page.getByRole("button", { name: "Toggle navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  const slider = page.getByRole("slider", { name: "Transformation progress" });
  await slider.fill("55");
  await expect(slider).toHaveValue("55");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "/tmp/spiderman-mobile.png", fullPage: true });
});
