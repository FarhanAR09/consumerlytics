const delay = require("../utils/delay");
const z = require("zod");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const productSchema = z.object({
    name: z.string(),
    cost: z.number().positive("Price must be a positive number"),
    owner: z.string(),
});

const productsMockDB = [
    { id: "ADASDSADA", name: "Product 1", cost: 100000, owner: "123" },
    { id: "ADA231SDS", name: "Product 2", cost: 200000, owner: "123" },
    { id: "ADASDS321", name: "Product 3", cost: 300000, owner: "123" },
    { id: "ADAS414DS", name: "Product 4", cost: 400000, owner: "farhan" },
    { id: "ADASDS12A", name: "Product 5", cost: 500000, owner: "farhan" },
    { id: "ADASDSA42", name: "Product 6", cost: 600000, owner: "farhan" },
];

const getUserProducts = async (req, res) => {
    try{
        const result = await pool.query(`SELECT * FROM public."UserProduct" WHERE "owner" = $1;`, [req.user.username]);
        const userProducts = result.rows
        res.status(200).json(userProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductByID = async (req, res) => {
    
    try{
        //await delay(1000);
        //const product = productsMockDB.find(product => product.id === req.params.id && req.user.username === product.owner);

        const result = await pool.query(
            `SELECT * FROM public."UserProduct" WHERE "id" = $1 AND "owner" = $2;`, 
            [id, req.user.username]
        );
        if (result.rows.length === 0){
            return res.status(404).json({ error: "Product not found" });
        }
        const product = result.rows[0];
        
        if (product === undefined || product === null) {
            res.status(404).json({ error: "Product not found" });
        }
        else{
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createNewProduct = async (req, res) => {
    try {
        let newProduct = req.body;
        newProduct = { ...newProduct, owner: req.user.username };
        let newId;
        do {
            newId = uuidv4();
        } while (
            (await pool.query(
                `SELECT * FROM public."UserProduct" WHERE "id" = $1;`, 
                [newId]
            )).rows.length > 0
        );

        productSchema.parse(newProduct);

        newProduct = { ...newProduct, id: newId };
        const result = await pool.query(
            `INSERT INTO public."UserProduct" ("id", "name", "cost", owner, "similarProduct")
            VALUES ($1, $2, $3, $4, $5);`, 
            [newId, newProduct.name, newProduct.cost, newProduct.owner, null]
        );
        //productsMockDB.push(newProduct);

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const updateProduct = async (req, res) => {

    try{
        let {id, updatedProduct} = req.body;
        updatedProduct = { ...updatedProduct, owner: req.user.username };
        productSchema.parse(updatedProduct);
        
        //await delay(1000);
        const productIndex = productsMockDB.findIndex(product => product.id === id && req.user.username === product.owner);
        if (productIndex === -1) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
            productsMockDB[productIndex] = { ...productsMockDB[productIndex], ...updatedProduct };
            res.status(200).json({ message: "Product updated successfully", product: productsMockDB[productIndex] });
        }
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        }
        else{
            res.status(500).json({ message: error.message });
        }
    }
};

const deleteProduct = async (req, res) => {
    try {
        //await delay(1000);

        const id = req.params.id;

        const productIndex = productsMockDB.findIndex(product => product.id === id && req.user.username === product.owner);
        if (productIndex === -1) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
            const deletedProduct = productsMockDB.splice(productIndex, 1)[0];
            res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const analyze = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT * FROM public."UserProduct" WHERE "id" = $1 AND "owner" = $2;`, 
            [id, req.user.username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = result.rows[0];

        res.status(200).json({
            product,
            analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUserProducts,
    getProductByID,
    createNewProduct,
    updateProduct,
    deleteProduct,
    analyze
};