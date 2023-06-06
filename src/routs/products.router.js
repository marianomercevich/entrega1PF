import { Router } from 'express';
import { CartManager } from "../controllers/CartManager.js";

const router = Router();

const cartManager = new CartManager("./src/assets/carts.json");

router.post("/", async (req, res) => {
  try {
    // Agregamos un nuevo carrito utilizando el método 'addCart' del 'cartManager'
    await cartManager.addCart();
    res.json({ message: "Producto agregado al carrito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    // Obtenemos el ID del carrito y del producto
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    // Verificar si el producto es válido
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ error: "Producto no válido" });
    }

    // Agregamos el producto al carrito
    const cart = await cartManager.addProductsToCart(cartId, productId);

    if (!cart) {
      return res
        .status(404)
        .json({ error: `El carrito con el id ${cartId} no existe` });
    }

    res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    // Obtenemos el Id del carrito
    const cartId = parseInt(req.params.cid);

    // Obtenemos el carrito por ID
    const cart = await cartManager.getCartsById(cartId);

    if (!cart) {
      return res
        .status(404)
        .json({ error: `El carrito con el id ${cartId} no existe` });
    }

    res.send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;