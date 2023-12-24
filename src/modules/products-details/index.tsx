// components/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./products-details.css";
import axios from "axios";
import StarRating from "./star-rating";

interface IProduct {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
  image: string;
}

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      const fetchData = async () => {
        try {
          const data = await fetchProductDetails();
          setProduct(data);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [productId]);

  const fetchProductDetails = () => {
    return axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching product", error.message);
        throw error;
      });
  };

  const handleAddToCart = () => {
    return axios
      .post(`https://fakestoreapi.com/carts/`, {
        userId: 7,
        date: new Date().toLocaleDateString(),
        products: [{
            productId:product?.id,
            quantity: quantity
        }]
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error while adding to card, please try again", error.message);
        throw error;
      });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <div className="title-rating-container">
            <h2>{product.title}</h2>
            <StarRating rating={product.rating.rate} maxRating={5} userCount={product.rating.count} />
          </div>
          <p>${product.price}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
        </div>
        <div className="quantity-section">
          <div>
            <label className="quantity-label">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value, 10)))
              }
              className="quantity-input"
            />
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
