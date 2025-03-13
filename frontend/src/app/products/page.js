"use client";
import Button from '@/components/button';
import { useRouter } from "next/navigation";
import Product from '@/classes/product';
import ProductCard from '@/components/cards/productCard';
import { useState } from 'react';
import { logout } from '@/lib/authAPI';
import Spinner from '@/components/spinner';

export default function ProductsPage() {
    
    //TODO: throw user to login page if not logged in

    const router = useRouter();

    //TODO: sync products with database
    const [products, setProducts] = useState([
        new Product("p1", "Product 1", 1000),
        new Product("p2", "Product 2", 2000),
    ]);

    const [analysisPopupActive, setAnalysisPopupActive] = useState(false);
    const [fullAnalysisPopupActive, setFullAnalysisPopupActive] = useState(false);

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

    const openAnalysisPopup = () => {
        setAnalysisPopupActive(true);
    };

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    async function handleLogout(){
        setIsLoggingOut(true);
        try{
            await logout();
            router.push("/");
        }
        catch(e){
            alert(e);
        }
        finally{
            setIsLoggingOut(false);
        }
    }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-l from-[#83C3EC] to-[#306AFF]">
        {/* Logo */}
        <div className="absolute top-0 left-0 p-4 flex items-center gap-4">
            <img src="/globe.svg" alt="Sample" className="w-16 h-16"/>
            <div className="flex flex-col">
                <p className="text-[16px] font-semibold text-black">Consumerlytics</p>
            </div>
        </div>
        {/* Logout */}
        <div className="absolute top-0 right-0 p-4 flex items-center">
            {isLoggingOut ? <Spinner/> : <Button onClick={()=>{handleLogout();}} text="Logout" w={100}></Button>}
        </div>
        {/* Content */}
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
                            onAnalyzeProduct={openAnalysisPopup} //TODO: setup brief analysis
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
        {/* Popups */}
        {
            analysisPopupActive &&
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md">
                <div className="bg-white rounded-2xl shadow-lg w-[500px]">
                    <div className="bg-gradient-to-r from-[#62BCD6] to-[#1ECEFF] text-white pt-4 pb-4 pl-8 pr-8 rounded-t-2xl flex justify-between items-center">
                        <span>AI Analysis</span>
                        <button onClick={
                            ()=>{setAnalysisPopupActive(false)}} className="text-white hover:text-gray-300">
                            X
                        </button>
                    </div>
                    <div className="pt-4 pb-4 pl-8 pr-8 text-gray-700 max-h-[300px] overflow-y-scroll">
                        <p>
                            Harga besi 1 kg saat ini tergolong tinggi. Disarankan untuk
                            menyesuaikan harga jual atau mencari pemasok dengan harga lebih
                            kompetitif. Permintaan pasar stabil, namun tren menunjukkan potensi
                            kenaikan dalam 3 bulan ke depan.
                        </p>
                    </div>
                    <div className="pt-4 pb-4 pl-8 pr-8 text-right text-sm font-medium text-gray-600">
                        <button className="hover:underline" onClick={
                            ()=>{
                                setAnalysisPopupActive(false);
                                setFullAnalysisPopupActive(true);
                                //TODO: setup full analysis popup
                            }}>Full Analysis...</button>
                    </div>
                </div>
            </div>
        }
        {
            fullAnalysisPopupActive &&
            <div className="absolute inset-0 flex items-center justify-center p-32">
                <div className="bg-white rounded-3xl w-full h-full">
                    <div className="flex flex-col gap-4 items-start justify-start pt-4 pb-4 pl-8 pr-8 text-gray-700 max-h-full overflow-y-scroll">
                        <img src="/globe.svg" alt="Sample" className="h-72 object fit"></img>
                        <p>
                            Harga besi 1 kg saat ini tergolong tinggi. Disarankan untuk
                            menyesuaikan harga jual atau mencari pemasok dengan harga lebih
                            kompetitif. Permintaan pasar stabil, namun tren menunjukkan potensi
                            kenaikan dalam 3 bulan ke depan.

                            Harga besi 1 kg saat ini tergolong tinggi. Disarankan untuk
                            menyesuaikan harga jual atau mencari pemasok dengan harga lebih
                            kompetitif. Permintaan pasar stabil, namun tren menunjukkan potensi
                            kenaikan dalam 3 bulan ke depan.

                            Harga besi 1 kg saat ini tergolong tinggi. Disarankan untuk
                            menyesuaikan harga jual atau mencari pemasok dengan harga lebih
                            kompetitif. Permintaan pasar stabil, namun tren menunjukkan potensi
                            kenaikan dalam 3 bulan ke depan.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 flex items-center">
                    <Button onClick={()=>{setFullAnalysisPopupActive(false)}} text="Back" w={100}></Button>
                </div>
            </div>
        }
    </div>
  );
};