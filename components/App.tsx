'use client';
import { useState } from 'react';
import Products from './Products';
import ToCart from './ToCart';
import ConfirmedOrder from './ConfirmedOrder';
import ProductsData from '../ProductsData.json';

interface Product {
  id: number;
  name: string;
  price: number;
  count: number;
  image: {
    thumbnail: string;
    
    desktop: string;
  };
  category: string;
}

export default function App() {
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(ProductsData);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState<boolean>(false);

  function AddToCart(productId: number) {
    setProducts((prevProducts) =>
      prevProducts.map((e) =>
        e.id === productId && e.count === 0 ? { ...e, count: 1 } : e
      )
    );

    const targetProduct = products.find((e) => e.id === productId);
    const isAlreadyInCart = productsInCart.some((item) => item.id === productId);

    if (isAlreadyInCart) {
      setProductsInCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, count: item.count + 1 } : item
        )
      );
    } else if (targetProduct) {
      setProductsInCart((prevCart) => [
        ...prevCart,
        { ...targetProduct, count: 1 },
      ]);
    }
  }

  function minesCount(productId: number) {
    setProducts((prevProducts) =>
      prevProducts.map((e) =>
        e.id === productId && e.count > 0 ? { ...e, count: e.count - 1 } : e
      )
    );

    setProductsInCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  }

  function PlusCount(productId: number) {
    setProducts((prevProducts) =>
      prevProducts.map((e) =>
        e.id === productId ? { ...e, count: e.count + 1 } : e
      )
    );

    setProductsInCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      )
    );
  }

  function DeletItems(itemsId: number) {
    setProductsInCart((prevCart) =>
      prevCart.filter((item) => itemsId !== item.id)
    );

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        itemsId === item.id ? { ...item, count: 0 } : item
      )
    );
  }

  function startNewOrder() {
    setIsOrderConfirmed(false);
    setProductsInCart([]);
    setProducts(ProductsData.map((item) => ({ ...item, count: 0 })));
  }

  return (
    <div className='flex flex-col items-center lg:items-start w-full lg:flex-row justify-between'>
      <div>
        <h1 className="text-4xl font-bold mb-3">Desserts</h1>
        <div>
          <Products
            PlusCount={PlusCount}
            AddToCart={AddToCart}
            products={products}
            minesCount={minesCount}
          />
        </div>
      </div>
      <ToCart
        setIsOrderConfirmed={setIsOrderConfirmed}
        DeletItems={DeletItems}
        productsInCart={productsInCart}
      />
      <ConfirmedOrder
        startNewOrder={startNewOrder}
        isOrderConfirmed={isOrderConfirmed}
        productsInCart={productsInCart}
      />
    </div>
  );
}
