
import React, { useEffect, useState } from "react";
import "./cart.css";
import axios, { AxiosResponse } from "axios";

interface ICartData {
  data: Date;
  id: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  userId: number;
}

interface IProduct {
    id: number;
    title: string;
    price: string;
    category: string;
    quantity: number
    description: string;
    rating: { rate: number; count: number };
    image: string;
  }


const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState<ICartData>()
  const [cartData, setCardData] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ICartData = await fetchCartData();
        setCartDetails(data)
        fetchAllProductDetails(data.products);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCartData = () => {
    return axios
      .get(`https://fakestoreapi.com/carts/user/2`)
      .then((response) => {
        return response.data[0];
      })
      .catch((error) => {
        console.error("Error fetching product", error.message);
        throw error;
      });
  };

  const fetchAllProductDetails = async (productList: {
    productId: number;
    quantity: number;
  }[]) => {
    try {
      const promises = productList.map((res) =>
        axios.get<IProduct>(`https://fakestoreapi.com/products/${res.productId}`)
      );
      const response = await Promise.all<AxiosResponse<IProduct>>(promises);
        let cartsMockData: IProduct[] = []
        console.log(cartDetails);
        
      response.forEach((response, index) => {
        const data = response.data;
        const quantity = productList.find(res => res.productId === data.id)?.quantity || 1

        cartsMockData.push({...data, quantity: quantity})
      })
      setCardData([...cartsMockData])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          <ul>
            {cartData.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-product-img"/>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.title}</h3>
                  <p className="cart-item-price">${item.price} - Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
