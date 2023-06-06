import fs from 'fs';

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getCarts() {
    try {
      const fileData = await fs.promises.readFile(this.filePath, 'utf-8');
      const carts = JSON.parse(fileData);
      return carts;
    } catch (error) {
      // Si ocurre un error al leer el archivo, se asume que no existen carritos aún
      // y se devuelve un array vacío
      return [];
    }
  }

  async saveCarts(carts) {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      throw new Error('Error al guardar los carritos.');
    }
  }

  async addCart(cart) {
    const carts = await this.getCarts();
    carts.push(cart);
    await this.saveCarts(carts);
  }

  async getCartCount() {
    const carts = await this.getCarts();
    return carts.length;
  }
}

