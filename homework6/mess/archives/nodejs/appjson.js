const productsOperations = require('./products')

const invokeAction = async({action, id, data}) => {
    switch(action) {
        case "getAll":
            const products = await productsOperations.getAll()
            console.log(products)
            break;
        case "getById":
            const product = await productsOperations.getById(id)
            if (!product) {
                throw new Error(`Product with id ${id} doesn't exist`)
            }
            console.log(product)
            break;
        case "add":
            const newProduct = await productsOperations.add(data)
            console.log(newProduct)
            break;
        default:
            console.log("Unknown action")
    }
}

//invokeAction({action: "getAll"})

const id = 4

//invokeAction({action: "getById", id})

const newData = {
    title: "Phone Case",
    description: "Attractive case for your phone",
    price: 10,
    discountPercentage: 5,
    rating: 4.98,
    stock: 33,
    brand: "Rosy",
    category: "accessorise",
}

invokeAction({action: "add", data: newData})

