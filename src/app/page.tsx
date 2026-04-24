"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id:string,
  thumbnail:string,
  title:string,
  category:string,
  price:number,
}
const categories = ["all","smartphones", "groceries", "fragrances"] as const;
type Category = typeof categories[number];
export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category,setCategory] = useState<Category>("smartphones");
  const [price,setPrice] = useState<number>(1000);
  const [debouncedPrice, setDebouncedPrice] = useState(price);
  const [isLoading,setIsLoading] = useState<Boolean>(false);
  const page = 1;
  const limit = 6;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPrice(price);
    }, 500);
    return () => clearTimeout(timer);
  }, [price]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        let res;
        if(category==="all") {
          res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
        }
        else {
          res = await fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`);
        }
        if(res.ok) {
          const data = await res.json();
          const filteredProducts = data.products.filter((product:Product) => product.price <= debouncedPrice);
          setProducts(filteredProducts);  
        }
        else {
          alert("Error in fetching");
        }
      } 
      catch (error) {
        console.error('Error:', error);
      }
      finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [category,debouncedPrice]);
  const addTOCart = (product:Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // check if product already exists
    const existingIndex = cart.findIndex(
      (item: any) => item.id === product.id
    );
    if(existingIndex !== -1) {
      // already exists → increase quantity
      cart[existingIndex].quantity += 1;
    } 
    else {
      // new product → add with quantity
      cart.push({ ...product, quantity: 1 });
    }
    alert("Added to cart");
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return (
    <>
      <div className="bg-[#F9FBFF] px-4 md:px-10 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64">
            <div className="bg-[#0758A8] p-4 rounded-xl shadow-lg text-white sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              {/* Category */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Category</h3>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
              {/* Price */}
              <div>
                <h3 className="font-medium mb-2">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>0</span>
                  <span>{price}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Products */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">
              Product Listing
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {!isLoading? (
                <>
                  {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                        <h3 className="font-semibold text-lg mb-1">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 mb-3">${product.price}</p>
                        <button onClick={() => addTOCart(product)} className="bg-[#005EB8] hover:bg-[#004a91] hover:cursor-pointer text-white w-full py-2 rounded-lg transition">
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  ))}
                </>
              ):(
                <>Loading</>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}