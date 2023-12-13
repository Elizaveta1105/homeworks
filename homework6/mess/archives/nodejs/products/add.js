const getAll = require('./getAll')
const { v4 } = require('uuid')
const fs = require("fs/promises")
const filePath = require(('./filePath'))

const add = async(data) => {
    const products = await getAll();
    const newProduct = {...data, id: v4()};
    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products));
    return newProduct;
}

module.exports = add;