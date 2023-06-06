import { Router } from 'express';
import { CartManager } from "../controllers/CartManager.js";
import { ProductManager } from '../controllers/ProductManager.js';

const router = Router();

const cartManager = new CartManager("./src/assets/carts.json");

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  const cartId = await generateCartId(); // Generar un ID único para el carrito
  const newCart = {
    id: cartId,
    products: []
  };

  await cartManager.addCart(newCart);
  res.json({ message: 'Carrito creado exitosamente!', cartId });
});

// Función para generar un ID único para el carrito
async function generateCartId() {
  // Implementa aquí la lógica para generar un ID único
  // Puedes utilizar un UUID o cualquier otra estrategia que prefieras
  // Asegúrate de que el ID no se duplique en los carritos existentes
  // y que se genere de manera automática
  // Por simplicidad, aquí se utilizará un número incremental
  return cartManager.getCartCount() + 1;
}

export default router;