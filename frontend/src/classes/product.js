import { z } from "zod";

export class Product {
    constructor(id="", name = "", cost = 0) {
        this.id = id;
        this.name = name;
        this.cost = cost;
    }

    static fromJSON(json) {
        return new Product(json.id, json.name, json.cost);
    }
}

export const ProductFetchSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    cost: z.coerce.number().min(0).optional(),
})

export const ProductPostSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1).optional(),
    cost: z.coerce.number().min(0).optional(),
})