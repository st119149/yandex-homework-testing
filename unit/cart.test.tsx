import React from "react";
import {
  act,
  fireEvent,
  getByTestId,
  getByText,
  queryByText,
  render,
} from "@testing-library/react";
import { ProviderWrapper, store } from "./render";
import { Cart } from "../../src/client/pages/Cart";
import { addToCart, clearCart } from "../../src/client/store";
import { Application } from "../../src/client/Application";

const product1 = {
  id: 0,
  name: "Intelligent kogtetochka",
  description: "Really Refined kogtetochka for Russian Blue",
  price: 787,
  color: "mint green",
  material: "Plastic",
};

const product2 = {
  id: 1,
  name: "Unbranded kogtetochka",
  description: "Really Tasty kogtetochka for British Shorthair",
  price: 917,
  color: "turquoise",
  material: "Concrete",
};

describe("Корзина", () => {
  it("В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product1));

    const { getByText } = render(<Application />, {
      wrapper: ProviderWrapper,
    });

    getByText("Cart (1)");

    act(() => store.dispatch(clearCart()));
  });

  it("В корзине должна отображаться таблица с добавленными в нее товарами", async () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));

    const { container } = render(<Cart />, {
      wrapper: ProviderWrapper,
    });

    getByTestId(container, product1.id.toString());
    getByTestId(container, product2.id.toString());

    act(() => store.dispatch(clearCart()));
  });

  it("Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа", async () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));
    store.dispatch(addToCart(product2));
    store.dispatch(addToCart(product2));

    const { container, getByTestId } = render(<Cart />, {
      wrapper: ProviderWrapper,
    });
    const product1Element = getByTestId(product1.id.toString());
    const product2Element = getByTestId(product2.id.toString());

    getByText(product1Element, product1.name);
    getByText(product1Element, "2");
    getByText(product1Element, `$${product1.price}`);
    getByText(product1Element, `$${product1.price * 2}`);

    getByText(product2Element, product2.name);
    getByText(product2Element, "3");
    getByText(product2Element, `$${product2.price}`);
    getByText(product2Element, `$${product2.price * 3}`);

    getByText(container, `$${product1.price * 2 + product2.price * 3}`);

    act(() => store.dispatch(clearCart()));
  });

  it('В корзине должна быть кнопка "Очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));

    const { container } = render(<Cart />, {
      wrapper: ProviderWrapper,
    });
    fireEvent.click(getByText(container, "Clear shopping cart"));

    const title1 = queryByText(container, product1.name);
    const title2 = queryByText(container, product2.name);

    expect(title1).toBeNull();
    expect(title2).toBeNull();
  });

  it("Если корзина пустая, должна отображаться ссылка на каталог товаров", async () => {
    const { container } = render(<Cart />, {
      wrapper: ProviderWrapper,
    });

    const link = getByText(container, "catalog");

    expect(link.getAttribute("href")).toBe("/catalog");
  });
});
