import { useState } from "react";
import Button from "../button";
import Product from "@/classes/product";
import { v4 as uuidv4 } from 'uuid';

export default function ProductCard({ onProductSaved=(_)=>{}, onProductDeleted = (_) => {}, initProduct = new Product(), initState="show" }) {

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

    function addProduct(){
        const generatedID = uuidv4();
        //TODO: check if id already exists in database
        product.id = generatedID;
        saveProduct();
    }

    function saveProduct(){
        product.name = nameInput;
        product.cost = costInput;
        setProduct(product);
        onProductSaved(product);
    }

    function deleteProduct(){
        onProductDeleted(product);
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
                    <Button text="Cancel" onClick={() => {deleteProduct();}} variant="bright" w={100}/>
                    <Button text="Add" onClick={() => {addProduct(); setState(State.SHOW);}} variant="bright" w={100}/>
                </div>
            }
            {state === State.SHOW &&
                <div className="flex flex-row items-start justify-center gap-2">
                    <Button text="Delete" onClick={() => {deleteProduct();}} variant="bright" w={100}/>
                    <Button text="Edit" onClick={() => {setState(State.EDIT);}} variant="bright" w={100}/>
                    <Button text="Analyze" onClick={() => {}} variant="primary" w={100}/>
                </div>
            }
            {state === State.EDIT &&
                <div className="flex flex-row items-start justify-center gap-2">
                    <Button text="Cancel" onClick={() => {setState(State.SHOW);}} variant="bright" w={100}/>
                    <Button text="Save" onClick={() => {saveProduct(); setState(State.SHOW);}} variant="bright" w={100}/>
                </div>
            }
        </div>
    );
  }