import React from "react";
import {
  screen,
  render,
  getAllByTestId,
  getByTestId,
  getByText,
  getByRole,
  queryByText,
  fireEvent,
  act,
} from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { ProviderWrapper } from "./render";

describe("Общий функционал", () => {
  it("В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
    const { container } = render(<Application />, {
      wrapper: ProviderWrapper,
    });
    const linkElements = getAllByTestId(container, "link");
    const textLinks = linkElements.map((el) => [
      el.textContent,
      el.getAttribute("href"),
    ]);

    expect(textLinks).toContainEqual(["Catalog", "/catalog"]);
    expect(textLinks).toContainEqual(["Delivery", "/delivery"]);
    expect(textLinks).toContainEqual(["Contacts", "/contacts"]);
    expect(textLinks).toContainEqual(["Cart", "/cart"]);
  });

  it("Название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const { container } = render(<Application />, {
      wrapper: ProviderWrapper,
    });
    const logo = getByText(container, "Kogtetochka store");

    expect(logo.getAttribute("href")).toBe("/");
  });

  // it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', () => {
  //   act(() => {
  //     window.innerWidth = 500;
  //   });

  //   fireEvent(window, new Event("resize"));

  //   const { container } = render(<Application />, {
  //     wrapper: ProviderWrapper,
  //   });

  //   const contacts = queryByText(container, "Contacts");
  //   const burger = getByRole(container, "button", {
  //     name: "Toggle navigation",
  //   });

  //   expect(contacts).toBeNull();
  //   expect(burger.style.display).toBe("inline-block");
  // });
});
