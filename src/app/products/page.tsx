"use client";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
type Product = {
  id:string,
  thumbnail:string,
  title:string,
  category:string,
  price:number,
}
export default function page() {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const priceRange = searchParams.get("pricerange") || "0-1000";
    const page = Number(searchParams.get("page") || "1");
    const [products, setProducts] = useState<Product[]>([]);
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    const limit=20;
    useEffect(() => {
      const getProducts = async () => {
        try {
          let res;
          if(category==="all") {
            res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`);
          }
          else {
            res = await fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`);
          }
          if(res.ok) {
            const data = await res.json();
            const filteredProducts = data.products.filter((product:Product) => {
              const matchSearch = product.title.toLowerCase().includes(search.toLowerCase());
              const matchPrice =product.price >= minPrice && product.price <= maxPrice;
              return matchSearch && matchPrice;
            }); 
            setProducts(filteredProducts);  
          }
          else {
            alert("Error in fetching");
          }
        } 
        catch (error) {
          console.error('Error:', error);
        }
      };
      getProducts();
    }, [search,category,priceRange,page]);
    return (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <h1 className='col-span-3 text-5xl font-bold'>Product Listing</h1>
            {products.length === 0 ? (<>No Products</>):(
              <>
                {products.map((product) => (
                  <div key={product.id} className='bg-white m-10'>
                    <img src={product.thumbnail} width="100%" />
                    <h3 className='font-bold'>{product.title}</h3>
                    <p>${product.price}</p>
                    <button className="bg-[#005EB8] hover:bg-[#004a91] text-white w-full py-2 rounded-lg transition">
                      Add to Cart
                    </button>
                  </div>  
                ))}
              </>
            )}
          </div>
        </>
    )
}
