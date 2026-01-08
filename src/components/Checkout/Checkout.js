import React, { useState, useContext } from "react";
import "./Checkout.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

export default function Checkout(props) {
  const cartcxt = useContext(CartContext);

  const [userInput, setuserInput] = useState({
    name: "",
    number: "",
    address: "",
  });

  const userData = { items: [...cartcxt.items], ...userInput };

  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [paymentFlag, setpaymentFlag] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    seterror(false);
    setuserInput((val) => ({ ...val, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (userInput.name === "") {
      seterror(true);
      seterrorMessage("Name cannot be empty");
      return;
    } else if (userInput.number === "") {
      seterror(true);
      seterrorMessage("Number cannot be empty");
      return;
    } else if (userInput.number.length !== 10) {
      seterror(true);
      seterrorMessage("Number should be 10 digits");
      return;
    } else if (userInput.address === "") {
      seterror(true);
      seterrorMessage("Address cannot be empty");
      return;
    }

    const response = await fetch(
      "https://react-foodapp-71ad4-default-rtdb.firebaseio.com/orders.json",
      {
        method: "post",
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    setpaymentFlag(false);
  }

  const handleClick = () => {
    props.onClose();
    cartcxt.clearCart();
  };
  return (
    <Modal onClose={props.onClose}>
      {paymentFlag ? (
        <form onSubmit={handleSubmit} className="ac">
          <div className="label">
            <label>Name:</label>
          </div>
          <div>
            <input type="text" name="name" onChange={handleChange} />
          </div>
          <div className="label">
            <label>Phone number:</label>
          </div>
          <div>
            <input type="number" name="number" onChange={handleChange} />
          </div>
          <div className="label">
            <label>Address:</label>
          </div>
          <div>
            <textarea name="address" onChange={handleChange} />
          </div>
          <div className="error-text">{error && <p>{errorMessage}</p>}</div>
          <button type="submit" className="buttons">
            Continue
          </button>
        </form>
      ) : (
        <>
          <h2 className="order-text">Thanks for ordering!</h2>
          <button className="buttons" onClick={handleClick}>
            Close
          </button>
        </>
      )}
    </Modal>
  );
}
