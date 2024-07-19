import React, { useEffect, useContext } from "react";
import useCartState from "../../hooks/cartHooks";
import "../../css/ordered.css";
import { RegionContext } from "../../context/RegionContext";

function Ordered() {
  const { ordered, getCarts } = useCartState();

  const { region } = useContext(RegionContext);

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div className="order-div">
      <h2>Completed Order</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Transaction status</th>
          </tr>
        </thead>
        <tbody>
          {ordered.ordered.map((ord) => (
            <tr key={ord.id}>
              <td>{ord.product_name}</td>
              <td>{region === "NG" ? ord.price_naira : ord.price_dollar}</td>
              <td>{ord.count}</td>
              <td>
                {region === "NG"
                  ? ord.price_naira * ord.count
                  : ord.price_dollar * ord.count}
              </td>
              <td>{ord.paid ? "paid" : "pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ordered;
