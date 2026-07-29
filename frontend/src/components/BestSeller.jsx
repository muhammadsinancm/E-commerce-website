import React, { useContext, useEffect, useState } from "react";
import { ShopeContext } from "../context/ShopeContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function BestSeller() {
  const { products } = useContext(ShopeContext);

  const [bestSeller, setBestSeller] = useState([]);
  
  useEffect(() => {
    const BestProduct = products?.filter((items) => items.bestseller);
    setBestSeller(BestProduct.slice(0, 5));
  }, [products]);
console.log(bestSeller);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text:sm md:text-base text-gray-600">
          {" "}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((items, index) => (
          <ProductItem
            key={index}
            id={items._id}
            image={items.image}
            name={items.name}
            price={items.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
