import {useNavigate,useParams} from "react-router-dom";
import { useProductStore } from '../store/useProductStore';
import {useEffect} from "react"
import { PlusCircleIcon, RefreshCwIcon, PackageIcon,DollarSignIcon,ImageIcon, Trash2Icon, SaveIcon } from 'lucide-react';

const ProductPage = () => {
  const {
    loading,
    error,
    currentProduct,
    formData,
    setFormData,
    fetchProduct,
    updateProduct,
    deleteProduct
  }=useProductStore()
  const navigate=useNavigate();
  const {id}=useParams();

  const handleDeleteproduct=async()=>{
    if(window.confirm("Are You sure you want to delete the product")){
      await deleteProduct(id);
      navigate("/")
    }
  }

  useEffect(()=>{
    fetchProduct(id)
  },[fetchProduct,id])
  console.log("current product",currentProduct)
  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  if(error){
    return(
      <p>{error}</p>
    )
  }
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <button onClick={()=>navigate("/")}
      className="mb-8 bg-linear-45 from-blue-600 to-green-600 font-bold text-white px-4 py-1 rounded-xl"
        >
          Back to Home
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
            <img src={currentProduct?.image} 
            alt={currentProduct?.name} 
            className="size-full object-center"
            />
          </div>
          <div className="bg-base-100 shadow-lg px-6 bg-linear-45 from-sky-500 to-sky-700">
            <div className="mt-8">
              <h2 className="text-2xl mb-6 text-center">Edit Product</h2>
              <form onSubmit={(e)=>{
                e.preventDefault()
                updateProduct(id)
              }}
              className="space-y-6"
              >
                <div className="grid gap-6 ">
                  <div className="form-control">
                    <label className="block mb-1">
                      <span className="text-base font-medium">
                        Product Name
                      </span>
                    </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <PackageIcon className="size-5" />
                </div>
                <input 
                type="text"
                required
                placeholder="Enter product name"
                className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                </div>
                </div>
                <div className="form-control">
                  <label className="block mb-1">
                    <span className="text-base font-medium">
                      Product Price
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <DollarSignIcon className="size-5" />
                    </div>
                    <input 
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="block mb-1">
                    <span className="text-base font-medium">
                      Product Image URL
                    </span>
                  </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <ImageIcon className="size-5" />
                  </div>
                  <input 
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
              type="button"
              onClick={handleDeleteproduct}
              className="px-2 py-2 bg-red-700 hover:bg-red-400 rounded-md transition-colors text-white flex "
              >
                <Trash2Icon className="size-5 mr-4" /> Delete Product
              </button>
              <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md transition-colors disabled:bg-green-500/5"
              disabled={!formData.name || !formData.price || !formData.image || loading}
              >
                {
                  loading ?(
                    <p>loading...</p>
                    ):(
                    <div className="flex">
                      <SaveIcon className="size-5 mr-2"/>Save Changes
                    </div>
                    )
                }
              </button>
              </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductPage