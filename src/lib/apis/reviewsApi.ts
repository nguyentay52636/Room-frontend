import { IAPIResponseWrapper } from "./authApi"
import baseApi from "./baseApi"
import { Review } from "./types"
export const getAllReviews = async ()=> { 
try { 
    const {data}= await baseApi.get<IAPIResponseWrapper<Review[]>>(`/review`)
return data;
}catch (error :any) { 
    throw new Error(error.message)
}
}
export const getReviewById = async (id: string)=> {  
    try { 
        const {data}= await baseApi.get<IAPIResponseWrapper<Review>>(`/review/${id}`)
        return data;
    }catch (error :any) { 
        throw new Error(error.message)
    }
 } 
 export const createReview = async ( {nguoiDungId, batDongSanId, soSao, binhLuan}:Review)=> { 
    const newReview = {
        nguoiDungId,
        batDongSanId,
        soSao,
        binhLuan
    }
    try { 
        const {data}= await baseApi.post<IAPIResponseWrapper<Review>>("/review", newReview)
            return data;
    }catch (error :any) { 
        throw new Error(error.message)
    }
 }
 export const updateReview = async (id:string ,{nguoiDungId, batDongSanId, soSao, binhLuan}:Review)=> { 
    const updateReview = {
        nguoiDungId,
        batDongSanId,
        soSao,
        binhLuan
    }
    try { 
        const {data}= await baseApi.put<IAPIResponseWrapper<Review>>(`/review/${id}`, updateReview)
        return data;
    }catch (error :any) { 
        throw new Error(error.message)
    }
}
export const deleteReview = async (id:string)=> {
    try { 
        const {data}= await baseApi.delete<IAPIResponseWrapper<Review>>(`/review/${id}`)
        return data;
    }catch (error :any) { 
        throw new Error(error.message)
    }
 } 
// lay dnah gia theo BDS 
export const  getReviewByPropertyId = async (propertyId:string)=> { 
try   { 
    const {data}= await baseApi.get<IAPIResponseWrapper<Review[]>>(`/reviews/property/${propertyId}`)
    return data;
}catch(error : any) { 
    throw new Error(error.message)
}
 } 
 export const getReviewByUserId = async (userId:string)=> { 
    try { 
        const {data}= await baseApi.get<IAPIResponseWrapper<Review[]>>(`/reviews/user/${userId}`)
        return data;
    }catch(error : any) { 
        throw new Error(error.message)
    }
} 