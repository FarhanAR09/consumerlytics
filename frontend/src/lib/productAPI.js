import delay from "@/utils/delay";
import mockApiResponse from "@/utils/mockResponse";
import { Product, ProductFetchSchema, ProductPostSchema } from "@/classes/product";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

let mockProductsDatabase = [
    new Product("1", "Besi", 10000),
    new Product("2", "Batu", 20000),
    new Product("3", "Kertas", 30000),
    new Product("4", "Plastik", 40000),
];
async function getMockDBProductsJSON(){
    await delay(1000);
    return JSON.parse(JSON.stringify(mockProductsDatabase));
}
async function getMockDBProductByIDJSON(id){
    await delay(1000);
    const results = mockProductsDatabase.filter((product) => product.id === id);
    if (results.length > 0) {
        return JSON.parse(JSON.stringify(results[0]));
    }
    else {
        throw new Error("Product not found");
    }
}
async function updateMockDBProductByIDJSON(updatedProduct) {
    await delay(1000);
    const index = mockProductsDatabase.findIndex((product) => product.id === updatedProduct.id);
    if (index !== -1) {
        mockProductsDatabase[index] = { ...mockProductsDatabase[index], ...updatedProduct };
        return JSON.parse(JSON.stringify(mockProductsDatabase[index]));
    } else {
        throw new Error("Product not found");
    }
}
async function deleteMockDBProductByIDJSON(id) {
    await delay(1000);
    const index = mockProductsDatabase.findIndex((product) => product.id === id);
    if (index !== -1) {
        mockProductsDatabase.splice(index, 1)[0];
    } else {
        throw new Error("Product not found");
    }
}

export async function getProductByID(id) {
    // const res = await fetch("https://api.example.com/getProducts", {
    //     method: "GET",
    //     credentials: "include", // Important to include cookies
    // });

    const res = await mockApiResponse(
        await getMockDBProductByIDJSON(id), //TODO: replace with actual database
        200,
        1000
    );

    if (!res.ok) {
        throw new Error("Get product failed");
    }

    return ProductFetchSchema.parse(await res.json());
}

export async function getProducts() {

    // const res = await fetch("https://api.example.com/getProducts", {
    //     method: "GET",
    //     credentials: "include", // Important to include cookies
    // });

    const res = await mockApiResponse(
        await getMockDBProductsJSON(), //TODO: replace with actual database
        200,
        1000
    );

    if (!res.ok) {
        throw new Error("Get products failed");
    }

    const filteredData = (await res.json()).filter(
        (item) =>
            item.id &&
            item.id.trim() !== ""
        );
    return z.array(ProductFetchSchema).parse(filteredData).map((item) => new Product(item.id, item.name, item.cost));
}

export async function createNewProduct(product) {
    let validation = ProductPostSchema.parse(product);
    // const res = await fetch("https://api.example.com/getProducts", {
    //     method: "POST",
    //     credentials: "include",
    //     body: JSON.stringify(product),
    // });

    product.id = await generateID();
    mockProductsDatabase.push(product); //TODO: replace with database
    
    const res = await mockApiResponse(
        await getMockDBProductByIDJSON(product.id),
        200,
        1000
    );
    if (!res.ok) {
        throw new Error("Create new product failed");
    }

    return ProductPostSchema.parse(await res.json());
}

export async function updateProduct(product) {
    
    updateMockDBProductByIDJSON(product);
    const res = await mockApiResponse(
        await getMockDBProductByIDJSON(product.id),
        200,
        1000
    );
    if (!res.ok) {
        throw new Error("Update product failed");
    }

    return ProductPostSchema.parse(await res.json());
}

export async function deleteProduct(id) {
    deleteMockDBProductByIDJSON(id);
    const res = await mockApiResponse(
        { message: "Product deleted successfully" },
        200,
        1000
    );
    if (!res.ok) {
        throw new Error("Delete product failed");
    }

    return await res.json();
}

export async function checkProductExists(id) {
    await delay(500);
    getMockDBProductsJSON().then((products) => {
        return products.some((product) => product.id === id);
    });
}

export async function generateID(){
    let generatedID = uuidv4();
    while (await checkProductExists(generatedID)){
        generatedID = uuidv4();
    }
    return generatedID;
}