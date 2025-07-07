import { IAPIResponseWrapper } from "./authApi"
import baseApi from "./baseApi"
import { Review } from "./types"
export const getAllReviews = async ()=> { 
try { 
    const res= await baseApi.get<IAPIResponseWrapper<Review[]>>(`/reviews`)
return res.data
}catch (error :any) { 
    throw new Error(error.message)
}
}
export const getReviewById = async (id: string)=> {  
    try { 
        const res= await baseApi.get<IAPIResponseWrapper<Review>>(`/reviews/${id}`)
        return res.data
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
        const res= await baseApi.post<IAPIResponseWrapper<Review>>("/review", newReview)
        return res.data
    }catch (error :any) { 
        throw new Error(error.message)
    }
 }