"use client";
import Button from '@/components/button';
import InputField from '@/components/inputField';
import { useRouter } from "next/navigation";
import Product from '@/classes/product';
import ProductCard from '@/components/cards/productCard';
import { useState } from 'react';

export default function ProductsPage() {

    const [products, setProducts] = useState([
        new Product("p1", "Product 1", 1000),
        new Product("p2", "Product 2", 2000),
    ]);

    const handleProductUpdated = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };

    const handleProductDeleted = (deletedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== deletedProduct.id)
        );
    };

    const createNewProduct = () => {
        const hasEmptyId = products.some((product) => isIDEmpty(product));
        if (!hasEmptyId) {
            setProducts((prevProducts) => [...prevProducts, new Product()]);
        }
    };

    const isIDEmpty = (product) => {
        return product.id === undefined || product.id === null || (typeof product.id === "string" && product.id.trim() === "");
    };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-l from-[#83C3EC] to-[#306AFF]">
        <div className="absolute top-0 left-0 p-4 flex items-center gap-4">
            <img src="/globe.svg" alt="Sample" className="w-16 h-16"/>
            <div className="flex flex-col">
                <p className="text-[16px] font-semibold text-black">Consumerlytics</p>
            </div>
        </div>
        <div className="flex flex-1 flex-col w-full p-32 overflow-y-scroll">
            <div className="grid grid-cols-2 gap-8 w-fit">
                {
                    products.map((product)=>(
                        <ProductCard
                            key={product.id}
                            initProduct={product}
                            initState={isIDEmpty(product) ? "new" : "show"}
                            onProductSaved={handleProductUpdated}
                            onProductDeleted={handleProductDeleted}
                        ></ProductCard>
                    ))
                }
                <div className="bg-[#25437c] rounded-md w-12 h-12 items-center justify-center flex" onClick={()=>{createNewProduct()}}>
                    <p className="text-black text-[40px]">
                        +
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};