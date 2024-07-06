import React, { PropsWithChildren } from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const basename = "/hw/store";

const api = new ExampleApi(basename);
const cart = new CartApi();
export const store = initStore(api, cart);

export const ProviderWrapper = ({ children }: PropsWithChildren) => (
  <MemoryRouter>
    <Provider store={store}>{children}</Provider>
  </MemoryRouter>
);
