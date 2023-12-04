import { atom, useRecoilValue, selector, selectorFamily } from "recoil";
import { CartType } from "../graphql/cart";

export const checkedCartState = atom<CartType[]>({
  key: "cartState",
  default: [],
});
