const delay = require("../utils/delay");
const z = require("zod");
const { v4: uuidv4 } = require("uuid");

const productSchema = z.object({
    name: z.string(),
    cost: z.number().positive("Price must be a positive number"),
    owner: z.string(),
});

const products = [
    { id: "ADASDSADA", name: "Product 1", cost: 100000, owner: "123" },
    { id: "ADA231SDS", name: "Product 2", cost: 200000, owner: "123" },
    { id: "ADASDS321", name: "Product 3", cost: 300000, owner: "123" },
    { id: "ADAS414DS", name: "Product 4", cost: 400000, owner: "farhan" },
    { id: "ADASDS12A", name: "Product 5", cost: 500000, owner: "farhan" },
    { id: "ADASDSA42", name: "Product 6", cost: 600000, owner: "farhan" },
];

const getUserProducts = async (req, res) => {
    
    try{
        await delay(1000);
        const userProducts = products.filter(product => product.owner === req.user.username);

        res.status(200).json(userProducts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductByID = async (req, res) => {
    
    try{
        await delay(1000);
        const product = products.find(product => product.id === req.params.id && req.user.username === product.owner);
        
        if (product === undefined || product === null) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createNewProduct = async (req, res) => {
    try {
        await delay(1000);

        let newProduct = req.body;
        newProduct = { ...newProduct, owner: req.user.username };
        let newId;
        do {
            newId = uuidv4();
        } while (products.some(product => product.id === newId));

        productSchema.parse(newProduct);

        newProduct = { ...newProduct, id: newId };
        products.push(newProduct);

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const updateProduct = async (req, res) => {

    try{
        let {id, updatedProduct} = req.body;
        updatedProduct = { ...updatedProduct, owner: req.user.username };
        productSchema.parse(updatedProduct);
        
        await delay(1000);
        const productIndex = products.findIndex(product => product.id === id && req.user.username === product.owner);
        if (productIndex === -1) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
            products[productIndex] = { ...products[productIndex], ...updatedProduct };
            res.status(200).json({ message: "Product updated successfully", product: products[productIndex] });
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
        await delay(1000);

        const id = req.params.id;

        const productIndex = products.findIndex(product => product.id === id && req.user.username === product.owner);
        if (productIndex === -1) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
            const deletedProduct = products.splice(productIndex, 1)[0];
            res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const analyze = async (req, res) => {
    
    try{
        const id = req.params.id;

        await delay(1000);
        const product = products.find(product => product.id === id && req.user.username === product.owner);
        
        if (product === undefined || product === null) {
            res.status(404).json({ message: "Product not found" });
        }
        else{
            res.status(200).json({
                analysis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris neque mauris, auctor vel tristique nec, feugiat sed ipsum. Vivamus faucibus justo tortor, quis venenatis nulla feugiat nec. Praesent tristique enim at felis vehicula, ut blandit libero finibus. Nullam ac cursus leo, semper sagittis sem. Aliquam iaculis egestas eros ac malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur sed ex sed purus pretium vulputate quis et est. Mauris dignissim mollis nisl. Sed viverra enim vel gravida tincidunt. Integer nec risus quis tellus varius luctus.",
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserProducts,
    getProductByID,
    createNewProduct,
    updateProduct,
    deleteProduct,
    analyze
};