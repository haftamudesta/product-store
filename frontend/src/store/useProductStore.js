import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast"


const BASE_URL="http://localhost:3000"

export const useProductStore=create((set,get)=>({
        products:[],
        loading:false,
        error:null,
        currentProduct:null,

        formData:{
                name:"",
                price:"",
                image:""
        },
        setFormData:(formData)=>set({formData}),
        resetFormData:()=>set({formData:{name:"",price:"",image:""}}),
        addProduct:async (e)=>{
                e.preventDefault();
                set({loading:true})
                try {
                        const {formData}=get();
                        await axios.post(`${BASE_URL}/api/products/create_product`,formData);
                        await get.fetchProducts();
                        get.resetFormData();
                        toast.success("Product Added Successfully!")
                        document.getElementById("add-product-modal").close()  
                } catch (error) {
                        console.log("error")
                        toast.error("Something Went Wrong!!!",error.message)
                }finally{
                        set({loading:false})
                }
        },

        fetchProducts:async ()=>{
                set({loading:true})
                try {
                       const response=await axios.get(`${BASE_URL}/api/products`);
                       set({products:response.data.data,error:null})
                } catch (error) {
                      console.log(error.message)
                      if(error.status===429) set({error:"Rate limit Exceeded!!!",products:[]})
                        else set({error:"Something went wrong",products:[]})  
                }finally{
                        set({loading:false})
                }
        },
        deleteProduct:async (id)=>{
                set({loading:true})
                try {
                     await axios.delete(`${BASE_URL}/api/products/${id}`);
                     set(prev=>({products:prev.products.filter(product=>product.id!==id)}))
                     toast.success("Product Deleted Successfully") 
                } catch (error) {
                        console.log(error)
                       toast.error("Something want wrong!!!") 
                }finally{
                        set({loading:false})
                }
        },
        fetchProduct:async (id)=>{
                set({loading:true})
                try {
                        const response=await axios.get(`${BASE_URL}/api/products/${id}`);
                        set({currentProduct:response.data.data,
                                formData:response.data.data,
                                error:null,
                        })
                } catch (error) {
                        set({error:"Something want wrong!!!",
                                currentProduct:null
                        })
                        toast.error("Something want wrong!!!",error.message) 
                }finally{
                        set({loading:false})
                }
        },
        updateProduct:async (id)=>{
                set({loading:true})
                try {
                       const {formData}=get();
                       const response=await axios.put(`${BASE_URL}/api/products/${id}`,formData);
                       set({currentProduct:response.data.data});
                       toast.success("Product Updated successfully!!!");
                } catch (error) {
                        set({error:"Something want wrong!!!",
                                currentProduct:null
                        })
                        toast.error("Something want wrong!!!",error.message)   
                }finally{
                        set({loading:false})
                }
        },
}))