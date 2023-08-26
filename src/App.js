import { useState, useContext } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Checkout from "./components/Checkout/Checkout";
import CartContext from "./store/cart-context";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const cartcxt = useContext(CartContext);
  console.log(CartContext.items, cartcxt.items);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCheckout = () => {
    setCheckout(true);
    setCartIsShown(false);
  };

  const hideCheckout = () => {
    setCheckout(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onClick={showCheckout} />}
      {checkout && <Checkout onClose={hideCheckout} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
