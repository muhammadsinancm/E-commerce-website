import React, { useContext, useEffect, useState } from "react";
import { ShopeContext } from "../context/ShopeContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function RelatedProduct({ category, subCategory }) {
  const { products } = useContext(ShopeContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter((items) => category === items.category);
      productCopy = productCopy.filter(
        (items) => subCategory === items.subCategory
      );
      setRelated(productCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"REALTED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((items, index) => (
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

export default RelatedProduct;
