import fs from "fs";
import { resolve } from "path";

export enum DBField {
  CART = "cart",
  PRODUCTS = "products",
}

const basePath = resolve(); // __dirname

const filenames = {
  [DBField.CART]: resolve(basePath, "src/db/cart.json"),
  [DBField.PRODUCTS]: resolve(basePath, "src/db/products.json"),
};

export const readDB = (target: DBField) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], "utf-8")); // json 형태를 파싱하여 js 객체 변경
  } catch (err) {
    console.error(err);
  }
};

export const writeDB = (target: DBField, data: any) => {
  try {
    fs.writeFileSync(filenames[target], JSON.stringify(data, null, '  '));  // json을 문자로 치환하여 json형태로 변형
  } catch (err) {
    console.error(err);
  }
};
