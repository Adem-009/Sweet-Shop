'use client';
import Image from 'next/image';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  count: number;
  category: string;
  image: {
    desktop: string;
  };
}

interface ProductsProps {
  PlusCount: (itemsId: number) => void;
  AddToCart: (itemsId: number) => void;
  minesCount: (itemsId: number) => void;
  products: ProductItem[];
}

export default function Products({
  products,
  AddToCart,
  minesCount,
  PlusCount,
}: ProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="flex flex-col items-center rounded-lg overflow-hidden relative pb-4"
          >
            <div className="relative w-full h-[240px]">
              <Image
                alt={product.name}
                src={product.image.desktop}
                fill
                className="rounded-lg object-cover"
              />

              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[160px]">
                {product.count === 0 ? (
                  <button
                    onClick={() => AddToCart(product.id)}
                    className="flex items-center justify-center gap-2 bg-white border border-[#c1121f] text-[#260f0d] font-semibold rounded-full py-2.5 px-4 w-full shadow-md cursor-pointer animate-pop-in transition-all duration-150 hover:bg-gray-50 active:scale-95"
                  >
                    <Image
                      alt="Add Icon"
                      src={'/icon-add-to-cart.svg'}
                      width={20}
                      height={20}
                    />
                    <span className="text-sm">Add To Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-[#c73a0f] text-white font-semibold rounded-full py-2 px-4 w-full shadow-md animate-pop-in">
                    <button
                      className="cursor-pointer p-1 rounded-full border border-white hover:bg-white/20 transition-colors flex items-center justify-center w-6 h-6"
                      onClick={() => minesCount(product.id)}
                    >
                      <Image
                        width={10}
                        height={10}
                        src={'/icon-decrement-quantity.svg'}
                        alt="decrement"
                      />
                    </button>
                    <span className="text-sm">{product.count}</span>
                    <button
                      className="cursor-pointer p-1 rounded-full border border-white hover:bg-white/20 transition-colors flex items-center justify-center w-6 h-6"
                      onClick={() => PlusCount(product.id)}
                    >
                      <Image
                        width={10}
                        height={10}
                        src={'/icon-increment-quantity.svg'}
                        alt="increment"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 w-full px-2">
              <p className="text-[#6c757d] text-sm">{product.category}</p>
              <h2 className="font-bold text-lg text-[#260f0d]">
                {product.name}
              </h2>
              <p className="font-bold text-lg text-[#c73a0f]">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
