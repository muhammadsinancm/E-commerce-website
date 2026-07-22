import React, { useContext } from "react";
import Title from "./Title";
import { ShopeContext } from "../context/ShopeContext";

function CartTotal() {
  const { currency, deleveryFee, getCartAmout } = useContext(ShopeContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency} {getCartAmout()}.00
            </p>
          </div>

          <hr />

          <div className="flex justify-between">
           <p>Shipping Fee</p>
           <p>{currency} {deleveryFee}.00</p>
          </div>

          <hr />

          <div className="flex justify-between">
              <b>Total</b>
              <b>{currency} {getCartAmout() === 0 ? 0: getCartAmout() + deleveryFee}.00</b>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartTotal;
