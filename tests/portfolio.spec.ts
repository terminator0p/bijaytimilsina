import { test, expect } from "@playwright/test";
const endpoint = "**/v1/forms/*/submissions";
test("home, route navigation, filters, and live Three.js canvas", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "TIMILSINA.",
  );
  await expect(page.locator(".orbital-canvas canvas")).toBeVisible();
  await expect(page.locator(".spider-intro")).toHaveCount(0);
  await page.screenshot({ path: "/tmp/bijay-desktop.png" });
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await expect(
    page.getByRole("button", { name: "Play 3D animation" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Play 3D animation" }).click();
  await page.getByRole("link", { name: "Explore my world" }).click();
  await expect(page).toHaveURL(/\/projects\//);
  await page.getByRole("button", { name: "Creative", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Beyond the screen" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Development", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  for (const route of ["about", "services", "skills", "contact"]) {
    const response = await page.goto(`/${route}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});
test("mobile navigation and layout stay within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("navigation")).toBeHidden();
  await expect(page.locator(".spider-intro")).toHaveCount(0);
  await page.screenshot({ path: "/tmp/bijay-mobile.png" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/\/contact\//);
  await expect(page.getByRole("navigation")).toBeHidden();
  for (const path of [
    "/",
    "/about/",
    "/services/",
    "/skills/",
    "/projects/",
    "/contact/",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("form submits its existing API contract and recovers from errors", async ({
  page,
}) => {
  await page.goto("/contact/");
  let payload: unknown;
  await page.route(endpoint, async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.getByLabel("Your name").fill("  Test Person  ");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What are you thinking?").fill("  A test message.  ");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("has been sent");
  expect(payload).toEqual({
    name: "Test Person",
    email: "test@example.com",
    message: "A test message.",
  });
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await page.unroute(endpoint);
  await page.route(endpoint, (route) =>
    route.fulfill({ status: 429, body: "{}" }),
  );
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What are you thinking?").fill("Retry message");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Too many messages",
  );
  await expect(page.getByLabel("What are you thinking?")).toHaveValue(
    "Retry message",
  );
  await expect(
    page.getByRole("button", { name: "Send message" }),
  ).toBeEnabled();
  await page.unroute(endpoint);
  await page.route(endpoint, (route) => route.abort());
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Unable to connect",
  );
});
test("reduced motion and WebGL failure keep the portfolio usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Play 3D animation" }),
  ).toBeVisible();
  await expect(page.locator(".hero")).toBeVisible();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl" || type === "webgl2") return null;
      return original.call(this, type as "2d", ...args);
    } as typeof original;
  });
  await page.reload();
  await expect(page.locator(".orbital-fallback")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my world" }),
  ).toBeVisible();
});

test("scroll reveals content once and updates the hero and reading progress", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.locator(".service-card").first();
  await expect(card).toHaveCSS("opacity", "0");
  await page.evaluate(() => window.scrollTo({ top: 420, behavior: "instant" }));
  await expect
    .poll(() =>
      page
        .locator(".hero")
        .evaluate((el) =>
          parseFloat(
            (el as HTMLElement).style.getPropertyValue("--hero-drift"),
          ),
        ),
    )
    .toBeGreaterThan(0);
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS("opacity", "1");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(card).toHaveCSS("opacity", "1");
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await expect
    .poll(() =>
      page
        .locator(".scroll-progress")
        .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a),
    )
    .toBeGreaterThan(0.99);
  await expect(page.locator(".contact-form")).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-art")).toHaveCSS("translate", "none");
  await expect(page.locator(".skill-row").first()).toHaveCSS("opacity", "1");
});

test("keyboard focus reveals offscreen controls and no-JS content stays readable", async ({
  page,
  browser,
}) => {
  await page.goto("/");
  await page.getByLabel("Your name").focus();
  await expect(page.locator(".contact-form")).toHaveCSS("opacity", "1");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  await expect(staticPage.locator(".service-card").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(
    staticPage.getByRole("heading", {
      name: "Many interests. One curious mind.",
    }),
  ).toBeVisible();
  await context.close();
});

test("spider intro dismisses, stays dismissed, and portrait responds to the pointer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".spider-intro")).toBeVisible();
  await page.screenshot({ path: "/tmp/bijay-spider-intro.png" });
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator(".spider-intro")).toHaveCount(0);
  const portrait = page.locator(".hero-portrait-stage");
  await portrait.hover({ position: { x: 20, y: 50 } });
  await expect
    .poll(() =>
      page
        .locator(".hero-portrait")
        .evaluate((el) =>
          (el as HTMLElement).style.getPropertyValue("--portrait-x"),
        ),
    )
    .not.toBe("");
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      page
        .locator(".hero-portrait")
        .evaluate((el) =>
          (el as HTMLElement).style.getPropertyValue("--portrait-x"),
        ),
    )
    .toBe("0deg");
  await page.reload();
  await expect(page.locator(".hero-portrait img")).toBeVisible();
  await expect(page.locator(".spider-intro")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await portrait.hover({ position: { x: 20, y: 50 } });
  await expect(page.locator(".hero-portrait")).toHaveCSS("transform", "none");
});
