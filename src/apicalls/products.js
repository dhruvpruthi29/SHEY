import { axiosInstance } from "./axiosInstance"; 


// add a new product
export const AddProduct = async (payload) => {
    try {
        const response = await axiosInstance.post("http://localhost:5000/api/products/add-products",payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// get all products
export const GetProducts = async (filters) => {
    try {
        const response = await axiosInstance.post("/api/products/get-products" , filters);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// edit a product
export const  EditProduct = async(id,payload) => {
    try {
        const response = await axiosInstance.put(`/api/products/edit-product/${id}`,payload);
        return response.data;    
    } catch (error) {
        return error.message;
    }
};

// get a product by id 
export const GetProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/products/get-product-by-id/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// delete a product
export const DeleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(
            `/api/products/delete-product/${id}`);
            return response.data;
    } catch (error) {
        return error.message;
    }
};


// upload product image
export const UploadProductImage = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "api/products/upload-image-to-product",
            payload
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};

// update product status
export const UpdateProductsStatus = async (id, status) => {
    try {
        const response = await axiosInstance.put(
            `/api/products/update-product-status/${id}`,
            {status}
        );
        return response.data;
    } catch (error) {
        return error.message;
    }
};
