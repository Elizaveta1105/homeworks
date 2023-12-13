const express = require('express')
const products = require('../../data/products')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        status: "success",
        code: 200,
        data: {
            result: products
        }
    })
})

router.get('/:id', (req, res) => {//: dynamic part or a parameter
    const { id } = req.params;
    const result = products.find(item => item.id === id)
    if(!result) {
        res.status(404).json({
            status: "error",
            code: 404,
            message: `Product with id=${id} not found`
        })
    }

    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
})


router.post('/', (req, res) => {
    const newProduct = {...req.body, id: (products.length + 1).toString()}
    products.push(newProduct)
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result: newProduct
        }
    })
})

module.exports = router;