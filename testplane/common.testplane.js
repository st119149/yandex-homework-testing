describe("Каталог", function () {
  it("В каталоге должны отображаться товары, список которых приходит с сервера", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");

    await expect(browser.$("h5").toHaveText("Intelligent kogtetochka"));
  });

  it("Скриншотный тест домашней страницы", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/");

    const catalog = await browser.$(".Welcome");

    await catalog.waitForDisplayed();

    await catalog.assertView("welcome");
  });

  it("Скриншотный тест каталога", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");

    const catalog = await browser.$(".Catalog");

    await catalog.waitForDisplayed();

    await catalog.assertView("catalog");
  });

  it("Скриншотный тест продукта", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog/0");

    const catalog = await browser.$(".Product");

    await catalog.waitForDisplayed();

    await catalog.assertView("product");
  });

  it("Скриншотный тест доставки", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/delivery");

    const catalog = await browser.$(".Delivery");

    await catalog.waitForDisplayed();

    await catalog.assertView("delivery");
  });

  it("Скриншотный тест контактов", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/contacts");

    const catalog = await browser.$(".Contacts");

    await catalog.waitForDisplayed();

    await catalog.assertView("contacts");
  });

  it("Скриншотный тест корзины", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/cart");

    const catalog = await browser.$(".Cart");

    await catalog.waitForDisplayed();

    await catalog.assertView("cart");
  });
});
