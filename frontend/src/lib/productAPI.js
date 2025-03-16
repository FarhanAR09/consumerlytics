import { Product, ProductFetchSchema, ProductPostSchema } from "@/classes/product";
import { z } from "zod";

export async function getProductByID(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getProductByID/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Get product by id failed");
    }

    return ProductFetchSchema.parse(await res.json());
}

export async function getProducts() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getUserProducts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/createNewProduct`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        throw new Error("Create new product failed");
    }

    return ProductPostSchema.parse(await res.json());
}

export async function updateProduct(product) {

    let validation = ProductPostSchema.parse(product);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/updateProduct`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: product.id,
            updatedProduct: product
        }),
    });

    if (!res.ok) {
        throw new Error("Update product failed");
    }

    return ProductPostSchema.parse(await res.json());
}

export async function deleteProduct(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/deleteProduct/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error("Delete product failed");
    }

    return await res.json();
}