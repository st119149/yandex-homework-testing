import React from "react";
import { render } from "@testing-library/react";
import { ProviderWrapper } from "./render";
import { Home } from "../../src/client/pages/Home";
import { Catalog } from "../../src/client/pages/Catalog";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";

describe("Страницы", () => {
  it('В магазине должна быть страница "Главная", которая имеет статическое содержимое', () => {
    const { getByText } = render(<Home />, {
      wrapper: ProviderWrapper,
    });
    getByText("Welcome to Kogtetochka store!");
  });

  it('В магазине должна быть страница "Каталог", которая имеет статическое содержимое', () => {
    const { getByText } = render(<Catalog />, {
      wrapper: ProviderWrapper,
    });
    getByText("Catalog");
  });

  it('В магазине должна быть страница "Доставка", которая имеет статическое содержимое', () => {
    const { getByText } = render(<Delivery />, {
      wrapper: ProviderWrapper,
    });
    getByText("Delivery");
  });

  it('В магазине должна быть страница "Контакты", которая имеет статическое содержимое', () => {
    const { getByText } = render(<Contacts />, {
      wrapper: ProviderWrapper,
    });
    getByText("Contacts");
  });
});
