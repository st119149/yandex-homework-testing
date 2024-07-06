import React, { act } from "react";
import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ProviderWrapper, store } from "./render";
import { Home } from "../../src/client/pages/Home";
import { Catalog } from "../../src/client/pages/Catalog";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";
import { ProductItem } from "../../src/client/components/ProductItem";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { addToCart, clearCart } from "../../src/client/store";
import { Cart } from "../../src/client/pages/Cart";

const productDetails = {
  id: 0,
  name: "Intelligent kogtetochka",
  description: "Really Refined kogtetochka for Russian Blue",
  price: 787,
  color: "mint green",
  material: "Plastic",
};

const product = {
  id: 0,
  name: "Intelligent kogtetochka",
  price: 787,
};

describe("Каталог", () => {
  it("Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре", async () => {
    const { getByText } = render(<ProductItem product={product} />, {
      wrapper: ProviderWrapper,
    });

    const title = getByText("Intelligent kogtetochka");
    const price = getByText("$787");
    const link = getByText("Details");
  });

  it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "Добавить в корзину"', async () => {
    const { getByText } = render(<ProductDetails product={productDetails} />, {
      wrapper: ProviderWrapper,
    });

    getByText(productDetails.name);
    getByText(productDetails.description);
    getByText(`$${productDetails.price}`);
    getByText(productDetails.color);
    getByText(productDetails.material);
    getByText("Add to Cart");
  });

  it("Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом", async () => {
    store.dispatch(addToCart(productDetails));

    const { getByText } = render(<ProductDetails product={productDetails} />, {
      wrapper: ProviderWrapper,
    });

    getByText("Item in cart");

    act(() => store.dispatch(clearCart()));
  });

  it('Если товар уже добавлен в корзину, повторное нажатие кнопки "Добавить в корзину" должно увеличивать его количество', async () => {
    store.dispatch(addToCart(productDetails));
    store.dispatch(addToCart(productDetails));

    const { container } = render(
      <>
        <ProductDetails product={productDetails} />
        <Cart />
      </>,
      { wrapper: ProviderWrapper }
    );

    const cartInfo = getByTestId(container, productDetails.id.toString());

    getByText(cartInfo, "2");
    fireEvent.click(getByText(container, "Add to Cart"));
    getByText(cartInfo, "3");

    act(() => store.dispatch(clearCart()));
  });

  it("Содержимое корзины должно сохраняться между перезагрузками страницы", async () => {
    store.dispatch(addToCart(productDetails));
    store.dispatch(addToCart(productDetails));

    const { container } = render(<Cart />, { wrapper: ProviderWrapper });

    const cartInfo = getByTestId(container, productDetails.id.toString());

    getByText(cartInfo, "2");
    getByText(cartInfo, productDetails.name);
    getByText(cartInfo, `$${productDetails.price}`);

    act(() => window.location.reload());

    getByText(cartInfo, "2");
    getByText(cartInfo, productDetails.name);
    getByText(cartInfo, `$${productDetails.price}`);

    act(() => store.dispatch(clearCart()));
  });
});
