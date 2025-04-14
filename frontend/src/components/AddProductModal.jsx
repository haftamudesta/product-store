import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { PackageIcon, DollarSignIcon, ImageIcon, XIcon,PlusCircleIcon } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import DialogWrapper from "./wrappers/DialogWrapper";



const AddProductModal = ({isOpen,setIsOpen}) => {
        const { addProduct, formData, setFormData,loading,fetchProducts,resetFormData } = useProductStore();
        
        

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                  await addProduct(e); // Pass the event to the store function
                  fetchProducts()
                  // Success handled in store, now just close modal
                  closeModal();
                } catch (error) {
                  console.log(error)
                }
              };

              const closeModal = () => {
                resetFormData(); // Clear the form when closing
                setIsOpen(false);
              };

        return (
                <DialogWrapper id="add-product-modal" isOpen={isOpen} closeModal={closeModal}
                className="dark:bg-sky-500"
                >
                        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase">
                                        Add Product
                                </DialogTitle>
                                <button 
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                                >
                                        <XIcon className="size-5" />
                                </button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-6">
                <div className="form-control">
                  <label className="block mb-1">
                    <span className="text-base dark:text-white font-medium">
                      Product Name
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <PackageIcon className="size-5 dark:text-white" />
                    </div>
                    <input 
                      type="text"
                      required
                      placeholder="Enter product name"
                      className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200 dark:text-white" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="block mb-1">
                    <span className="text-base dark:text-white font-medium">
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
                      className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200 dark:text-white" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="block mb-1">
                    <span className="text-base dark:text-white font-medium">
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
                      className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200 dark:text-white" 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-linear-45 from-indigo-700 to-indigo-900 hover:bg-gray-100 rounded-md transition-colors dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="input inset-shadow-sm inset-shadow-amber-500 ring-4 rounded-sm border-2 border-gray-200 w-full pl-10 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-colors duration-200 dark:text-white"
                  disabled={!formData.name || !formData.price || !formData.image || loading}
                >
                        {
                                loading ?(
                                <p>loading...</p>
                        ):(
                                <div className="flex">
                                <PlusCircleIcon className="size-5 dark:text-white mr-2"/>Add Product
                                </div>
                        )
                        }    
                </button>
              </div>
            </form>
      </DialogPanel>
    </DialogWrapper>
        )
}

export default AddProductModal;