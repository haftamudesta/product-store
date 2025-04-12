import { sql } from "../config/DataBase.js"

export const getAllProducts=async (req,res)=>{
        try {
                const products=await sql`
                SELECT * FROM products
                ORDER BY created_at DESC
                `;
                console.log("all products")
                res.status(200).json({
                        success:true,
                        data:products
                })
        } catch (error) {
              console.log("error") 
              res.status(500).json({
                success:false,
                message:"Internal Server Error"
              }) 
        }
}

export const getProduct=async (req,res)=>{
        const {id}=req.params;
        try {
               const product=await sql`
               SELECT * FROM products WHERE id=${id}
               ` ;
               res.status(200).json({
                success:true,
                data:product[0]
               })
        } catch (error) {
                res.status(500).json({
                        success:false,
                        message:"Internal Server Error"
                      }) 
        }
}

export const createProduct=async (req,res)=>{
        console.log(req.body)
        const {name,price,image}=req.body;
        if(!name || !price || !image){
                res.status(400).json({
                        success:false,
                        message:"All Fields are Required"
                });
        }
        try {
                console.log("trying...");
                const newProduct = await sql`
                    INSERT INTO products (name, price, image)
                    VALUES (${name}, ${price}, ${image})
                    RETURNING *
                `;
                
                res.status(201).json({
                    success: true,
                    data: newProduct[0]
                });
            } catch (error) {
                console.log("error") 
                res.status(500).json({
                  success:false,
                  message:"Internal Server Error"
                })    
        }
}

export const updateProduct = async (req, res) => {
        const { id } = req.params;
        const { name, price, image } = req.body;
        try {
            const updatedProduct = await sql`
                UPDATE products
                SET name=${name}, price=${price}, image=${image}
                WHERE id=${id}
                RETURNING *
            `;
            if (updatedProduct.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Product not Found"
                });
            }
            res.status(200).json({
                success: true,
                data: updatedProduct[0]
            });
        } catch (error) {
            console.log("Error updating product:", error); // Better error logging
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    };

export const deleteProduct=async (req,res)=>{
        const {id}=req.params;
        try {
               const deletedProduct= await sql`
                DELETE FROM products 
                WHERE id = ${id}
                RETURNING *
                `
                if(deletedProduct.length===0){
                        res.status(404).json({
                                success:false,
                                message:"Product not Found"
                        })
                }
                res.status(200).json({
                        success:true,
                        message:"Product deleted successfully!!!",
                        data:deleteProduct[0]
                })
        } catch (error) {
                console.log("error") 
                res.status(500).json({
                  success:false,
                  message:"Internal Server Error"
                }) 
        }
}
