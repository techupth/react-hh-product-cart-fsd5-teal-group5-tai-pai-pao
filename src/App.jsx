import "./App.css";
import products from "./data/products";
import { useState } from "react";

function App() {
  const [inCartItem, setInCartItem] = useState([]);

  //add Item from Product page to cart
  function addItem(item) {
    const newInCartItem = [...inCartItem];

    //Check dupilcated item in cart
    const checkDuplicate = newInCartItem.reduce(
      (accumulator, newItem, index) => {
        if (item.id === newItem.id)
          accumulator = { status: true, index: index };

        return accumulator;
      },
      { status: false, index: -1 }
    );

    //add object if there's no duplicate, else update the quantity in object
    if (checkDuplicate.status == false) {
      newInCartItem.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    } else {
      newInCartItem[checkDuplicate.index].quantity += 1;
    }

    //return state
    setInCartItem(newInCartItem);
  }

  //Delete item from class
  function deleteItem(index) {
    const newInCartItem = [...inCartItem];
    newInCartItem.splice(index, 1);
    setInCartItem(newInCartItem);
  }

  //reduce item number
  function reduceItem(index) {
    const newInCartItem = [...inCartItem];
    newInCartItem[index].quantity -= 1;

    if (newInCartItem[index].quantity <= 0) {
      newInCartItem.splice(index, 1);
    }

    setInCartItem(newInCartItem);
  }

  //sum total
  function sumTotal() {
    return inCartItem.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
  }

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((item) => {
            return (
              <div className="product">
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button onClick={() => addItem(item)}>Add to cart</button>
              </div>
            );
          })}
        </div>
      </section>

      <hr />

      <section className="cart">
        <h1 className="cart-heading">Cart Total Price {sumTotal()}</h1>
        <div className="cart-item-list">
          {inCartItem.map((item, index) => {
            return (
              <div className="cart-item">
                <h1>Item name: {item.name}</h1>
                <h2>Price: {item.price} Baht</h2>
                <h2>Quantity: {item.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => deleteItem(index)}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => addItem(item)}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => reduceItem(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
