import fs from "fs";

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.format = "utf-8";
  }

  async getCarts() {
    try {
      const content = await fs.promises.readFile(this.filePath, this.format);
      return JSON.parse(content);
    } catch (error) {
      console.log("Error: Archivo no encontrado");
      return [];
    }
  }

  async getCartsById(id) {
    const carts = await this.getCarts();
    const cart = carts.find((prod) => prod.id === id);
    return cart || null;
  }

  async generateId() {
    const carts = await this.getCarts();
    return carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
  }

  async saveCarts(carts) {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(carts, null, 2),
        this.format
      );
    } catch (error) {
      throw new Error("Error al guardar los carritos.");
    }
  }

  async addCart(cart) {
    const carts = await this.getCarts();
    cart.id = await this.generateId();
    carts.push(cart);
    await this.saveCarts(carts);
  }

  async getCartCount() {
    const carts = await this.getCarts();
    return carts.length;
  }

  async addProductsToCart(cartId, productId) {
    let carts = await this.getCarts();
    const cartIndex = carts.findIndex((item) => item.id === cartId);

    if (cartIndex === -1) {
      return null;
    }

    const cart = carts[cartIndex];
    const existingProduct = cart.products.find(
      (item) => item.product === productId
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1,
      });
    }

    carts[cartIndex] = cart;
    await this.saveCarts(carts);

    return cart;
  }
}