// components/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products-list.css";
import { useHistory } from "react-router-dom";

interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

const ProductsList = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([])
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } finally {
        setLoading(false)
      }
    };

    fetchData()
  }, [])

  const fetchProducts = () => {
    return axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message)
        throw error
      })
  }

  const handleProductClick = (id: number) => {
    history.push(`/product-details/${id}`);
  }

  return (
    <div className="dashboard-container">
      <h2>Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products.map((product: IProduct) => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
