import { useState } from "react";
import Button from "../button";
import {Product} from "@/classes/product";
import { v4 as uuidv4 } from 'uuid';
import { checkProductExists, generateID } from "@/lib/productAPI";
import Spinner from '@/components/spinner';
import { createNewProduct, updateProduct, deleteProduct as deleteProductAPI } from "@/lib/productAPI";

export default function ProductCard({ onProductSaved=(product, oldID)=>{}, onProductDeleted = (product) => {}, onAnalyzeProduct = (product)=>{}, initProduct = new Product(), initState="show" }) {

    //TODO: implement CRUD with API

    const State = {
        NEW: "new",
        SHOW: "show",
        EDIT: "edit"
      };

    const [state, setState] = useState(initState);
    const [product, setProduct] = useState(initProduct);

    const [nameInput, setNameInput] = useState(product.name);
    const [costInput, setCostInput] = useState(product.cost);

    const handleNameInput = (event)=>{
        setNameInput(event.target.value);
    }
    const handleCostInput = (event)=>{
        let rawValue = event.target.value.replace(/\D/g, "");
        let newValue = parseInt(rawValue || "0", 10);
        setCostInput(newValue);
    }

    const formatCurrency = (num) => {
        return "Rp." + new Intl.NumberFormat("id-ID").format(num);
    };

    const [isAdding, setIsAdding] = useState(false);
    async function addProduct(){
        setIsAdding(true);
        try {
            product.id = "";
            product.name = nameInput;
            product.cost = costInput;
            setProduct(product);

            await createNewProduct(product);

            onProductSaved(product, "");
        }
        catch (e){
            return {ok: false, error: e};
        }
        finally{
            setIsAdding(false);
        }

        return {ok: true};
    }

    const [isUpdating, setIsUpdating] = useState(false);
    async function saveProduct(){
        setIsUpdating(true);
        try{
            product.name = nameInput;
            product.cost = costInput;
            setProduct(product);
    
            await updateProduct(product);
    
            onProductSaved(product);
        }
        catch (e){
            console.error(e);
            alert(e);
            return {ok: false, error: e};
        }
        finally{
            setIsUpdating(false);
        }
        return {ok: true};
    }

    const [isDeleting, setIsDeleting] = useState(false);
    async function deleteProduct(){
        setIsDeleting(true);
        try {
            if (product.id && product.id !== null && product.id !== ""){
                await deleteProductAPI(product.id);
            }
            onProductDeleted(product);
        }
        catch (e){
            alert(e);
        }
        finally{
            setIsDeleting(false);
        }
    }

    return (
        <div className="w-120 flex flex-col items-start justify-start gap-2 bg-gradient-to-r from-[#42EFFC] to-[#3CAEFF] rounded-3xl pt-4 pb-4 pl-8 pr-8">
            <p className="text-black">
                {
                    state === State.SHOW ? "Product" :
                    state === State.NEW ? "Adding Product" :
                    state === State.EDIT ? "Editing Product" : "Product"
                }
            </p>
            <input
                type="text"
                value={state === State.SHOW ? product.name : nameInput}
                disabled={state === State.SHOW ? true : false}
                onChange={handleNameInput}
                placeholder={"Product Name"}
                className="pt-2 pb-2 pl-4 pr-4 rounded-full bg-white text-black focus:outline-none"
                style={{
                    width: "300px",
                    height: "auto",
                }}
            />
            <input
                type="text"
                value={formatCurrency(state === State.SHOW ? product.cost : costInput)}
                disabled={state === State.SHOW ? true : false}
                onChange={handleCostInput}
                placeholder={"Production Cost (Rp)"}
                className="pt-2 pb-2 pl-4 pr-4 rounded-full bg-white text-black focus:outline-none"
                style={{
                    width: "300px",
                    height: "auto",
                }}
            />
            {state === State.NEW &&
                <div className="flex flex-row items-start justify-center gap-2">
                    {isAdding && <Spinner/>}
                    {!isAdding && <Button text="Cancel" onClick={() => {deleteProduct();}} variant="bright" w={100}/>}
                    {!isAdding && <Button text="Add" onClick={
                        async () => {
                            const result = await addProduct();
                            if (result.ok){
                                setState(State.SHOW);
                            }
                            else if (result.error){
                                alert(result.error);
                            }
                        }}
                    variant="bright" w={100}/>}
                </div>
            }
            {state === State.SHOW &&
                <div className="flex flex-row items-start justify-center gap-2">
                    {isDeleting && <Spinner/>}
                    {!isDeleting && <Button text="Delete" onClick={async () => {deleteProduct();}} variant="bright" w={100}/>}
                    {!isDeleting && <Button text="Edit" onClick={() => {setState(State.EDIT);}} variant="bright" w={100}/>}
                    {!isDeleting && <Button text="Analyze" onClick={() => {onAnalyzeProduct();}} variant="primary" w={100}/>}
                </div>
            }
            {state === State.EDIT &&
                <div className="flex flex-row items-start justify-center gap-2">
                    {isUpdating && <Spinner/>}
                    {!isUpdating && <Button text="Cancel" onClick={() => {setState(State.SHOW);}} variant="bright" w={100}/>}
                    {!isUpdating && <Button text="Save" onClick={async () => {
                        const result = await saveProduct();
                        if (result.ok){
                            setState(State.SHOW);
                        }
                    }} variant="bright" w={100}/>}
                </div>
            }
        </div>
    );
  }