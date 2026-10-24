'use client';
import Image from 'next/image';

interface ProductsInCartProps {
  id: number;
  name: string;
  price: number;
  count: number;
}

interface ToCartProps {
  setIsOrderConfirmed: (value: boolean) => void;
  DeletItems: (itemsId: number) => void;
  productsInCart: ProductsInCartProps[];
}

export default function ToCart({
  productsInCart,
  DeletItems,
  setIsOrderConfirmed,
}: ToCartProps) {
  const totalItems = productsInCart.reduce(
    (total, product) => total + product.count,
    0,
  );

  const priceTotal = productsInCart.reduce(
    (total, product) => total + product.price * product.count,
    0,
  );

  return (
    <div className="bg-white h-full w-[95%] lg:w-[30%] p-5 flex flex-col items-center gap-5 border-2 border-[#c73a0f] rounded-2xl shadow-md">
      <h1 className="text-2xl text-[#c73a0f] font-bold">
        Your Cart ({totalItems})
      </h1>

      {productsInCart.length === 0 ? (
        <div className="w-full flex flex-col items-center py-6">
          <Image
            alt="Empty cart illustration"
            width={130}
            height={130}
            src={'/illustration-empty-cart.svg'}
          />
          <p className="font-semibold text-[#6c757d] mt-4">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col divide-y divide-gray-100 max-h-[350px] overflow-y-auto pr-1">
          {productsInCart.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-full justify-between py-3 items-center animate-fade-in"
              >
                <div>
                  <h2 className="font-bold text-[15px] text-[#260f0d]">
                    {item.name}
                  </h2>
                  <p className="flex gap-3 text-sm mt-1">
                    <span className="font-semibold text-[#c73a0f]">
                      {item.count}x
                    </span>
                    <span className="flex gap-1 items-center text-[#ad8985]">
                      <span className="text-xs">@</span>
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-[#87635a] font-semibold">
                      ${(item.price * item.count).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => DeletItems(item.id)}
                  className="border border-[#87635a] rounded-full w-5 h-5 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <Image
                    alt="delete item"
                    src={'/icon-remove-item.svg'}
                    width={10}
                    height={10}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {productsInCart.length > 0 && (
        <div className="w-full flex flex-col items-center gap-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between w-full items-center px-2">
            <span className="text-sm font-medium text-gray-500">Order Total</span>
            <span className="text-2xl font-bold text-[#c73a0f]">
              ${priceTotal.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => setIsOrderConfirmed(true)}
            className="bg-[#c73a0f] hover:bg-[#a12e0b] text-white font-bold transition-colors w-full py-3 rounded-full cursor-pointer shadow-sm active:scale-95 transition-all"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}