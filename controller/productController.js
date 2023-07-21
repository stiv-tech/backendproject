import Product from "../models/productModel.js";


const createProduct = async(req, res) => {
    try{
        const {name, price, category, image, description, quantity} = req.body
        const newProduct = await new Product({
            name,
            price,
            category,
            image,
            description,
            quantity
        })
        const saveProduct = await newProduct.save()
        if(saveProduct){
            res.json({message: 'product created successfully', saveProduct})
        }else{
            res.status(500).json({message: 'unable to create Product'})
        }
    }catch(err){
        throw new Error(err)
    }
};

const getAllProduct = async(req, res) => {

    try{
        const product = await Product.find({})
        if(product){
            res.json({message: 'product fetched', product})
        }else{
            res.status(400).json({message: 'product not fetched'})
        }
    }catch(err){
        throw new Error(err)
    }
};

const bestSellerProduct = async(req, res) => {
    try{
        const products = await Product.find({}).sort({ salesCount: -1 }).limit(10);

        if (products.length > 0) {
          const bestSellerProduct = products[0];
          res.json({ message: "Best-selling product found", bestSellerProduct });
        } else {
          res.json({ message: "No best-selling product found" });
        }
    }catch(err){
        throw new Error(err)
    }
}
const getTopSixNewProducts = async(req, res) => {
    try {
        const product = await Product.find({})
        if(product){
        const sortedProducts = await Product.sort((a, b) => b.createdAt - a.createdAt);
        if(sortedProducts){
            res.json({message: 'product retrieved', sortedProducts})
        }else{
            res.status(400).json({message: 'no product found'})
        }
    }else{
        res.status(400).json({messsage: 'product not found'})
    }
    } catch (error) {
        
    }
};

const getFeaturedProducts = async (req, res) => {
	try {
		const product = await Product.find({}).limit(5)
		if(product){
			res.json({message: "Product retrieved", product})
		}else{
			res.status(400).json({message: "Error loading Products"})
		}
	} catch (err) {
		throw new Error(err);
	}
};

const getProductId = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if(product){
			res.json({message: "Product retrieved", product})
		}else{
			res.status(400).json({message: "Error loading Products"})
		}
	} catch (err) {
		throw new Error(err);
	}
};



const getNewProduct = async(req, res) => {
    try{
        const product = await Product.findOne({}).sort({createdAt: -1}).limit(10)
        if(product){
            res.json({message: 'product retrieved', product})
        }else{
            res.status(400).json({message: "no product found with the given ID"})
        }
    }catch(err){
        throw new Error(err)
    }
}


const getRelatedProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            const related = await Product.find({category: product.category}).limit(5)
            const actual = related.filter(p => p._id != product._id)
            res.json({message: "product retrieved", actual})
        } else {
            res.status(400).json('Product not found')
        }
    } catch (err) {
        throw new Error(err);
    }
}

const getDiscountedProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product){

            const discountedProducts = await Product.find({ discount: { $gt: 0 } });
            if(discountedProducts.length > 0) {
            res.json({ message: "Discounted products found", discountedProducts });
            } else {
            res.json({ message: "No discounted products found" });
            }
        }else{
            res.status(400).json({message: 'product not found'})
        }
    }catch(err){
        throw new Error(err)
    }
}






const updateProduct = async(req, res) => {
    try{
        const {name, price, category, image, isAvailable, isDiscount, quantity, discount, description } = req.body
        const product = await Product.findOne({_id: req.params.id})
        if(product){
            const updateProduct = await Product.findByIdAndUpdate(product._id, {
                name: name ? name : product.name,
                price: price ? price : product.price,
                category: category ? category : product.category,
                image: image ? image : product.image,
                isAvailable: isAvailable ? isAvailable : product.isAvailable,
                isDiscount: isDiscount ? isDiscount : product.isDiscount,
                quantity: quantity ? quantity : product.quantity,
                discount: discount ? discount : product.discount,
                description: description ? description : product.description
            },
            {
                new: true,
                useFindAndModify: false
            })

            if(updateProduct){
                res.json({message: 'product updated', updateProduct})
            }else{
                res.status(400).json({message: 'unable to update please try again'})
            }
        }else{
            res.status(400).json({message: 'product not found'})
        }
    }catch(err){
        throw new Error(err)
    }
}

const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findOne({_id: req.params.id})
        if(product){
            const deleteProduct = await Product.findByIdAndDelete(product._id)
            if(deleteProduct){
                res.json({message: "product deleted", product})
            }else{
                res.status(400).json({message: 'product unable to delete'})
            }
        }else{
            res.status(400).json({message: 'product not found'})
        }
    }catch(err){
        throw new Error(err)
    }
}



const updateDiscountedProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const newDiscount = req.body.discount;
    
        const product = await Product.findById(productId);
    
        if (!product) {
          res.status(400).json({ message: "Product not found" });
        } else {
          product.discount = newDiscount;
          await product.save();
    
          res.json({ message: "Product discount updated successfully", product });
        }
    }catch(err){
        throw new Error(err)
    }
}
const createProductReview = async(req, res) => {
    try{
        const productId = req.params.id;
        const {comment, rating } = req.body;
    
        const product = await Product.findById(productId);
    
        if (!product) {
          res.status(400).json({ message: "Product not found" });
        } else {
          const review = {
            name: req.user.name,
            date: new Date(),
            comment: comment,
            rating,
            user: req.user.id
          };
    
          product.review.push(review);
          await product.save();
    
          res.json({ message: "Product review created successfully", product });
        }
    }catch(err){
        throw new Error(err)
    }
}
const getProductReview = async(req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
    
        if (!product) {
          res.status(400).json({ message: "Product not found" });
        } else {
          const reviews = product.reviews;
          res.json({ message: "Product reviews found", reviews });
        }
    }catch(err){
        throw new Error(err)
    }
}


export {createProduct, 
        getAllProduct, 
        getProductId, 
        updateProduct,
        deleteProduct,
        getNewProduct, 
        getRelatedProduct, 
        bestSellerProduct, 
        getDiscountedProduct, 
        createProductReview,
        getProductReview, 
        updateDiscountedProduct,
        getFeaturedProducts,
        getTopSixNewProducts}