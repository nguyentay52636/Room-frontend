import baseApi from "./baseApi"
import { IAPIResponseWrapperArray } from "./responseApi";

import { BatDongSan } from "./types"

export const getAllProperties = async () => {
    try {
        const { data } = await baseApi.get(`/property`);
        // data: { message: string, properties: BatDongSan[] }
        return data.properties || [];
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Unknown error");
    }
};
export const getPropertyById = async (id: string) => {
    try {
        const {data}= await baseApi.get<IAPIResponseWrapperArray <BatDongSan>>(`/property/${id}`)
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}   
export const createProperty = async ({overlay, thongTinChiTiet, tieuDe, moTa, loaiBds, diaChi, tinhThanh, quanHuyen, gia, dienTich, anhDaiDien, gallery, phongNgu, phongTam, choDauXe, trangThai, nguoiDungId, badge, subtitle, features, colorGradient}: BatDongSan) => {
    const newProperty = { 
        overlay: overlay,
        thongTinChiTiet: thongTinChiTiet,
        tieuDe: tieuDe,
        moTa: moTa,
        loaiBds: loaiBds,
        diaChi: diaChi,
        tinhThanh: tinhThanh,
        quanHuyen: quanHuyen,
        gia: gia,
        dienTich: dienTich,
        anhDaiDien: anhDaiDien,
        gallery: gallery,
        phongNgu: phongNgu,
        phongTam: phongTam,
        choDauXe: choDauXe,
        trangThai: trangThai,
        nguoiDungId: nguoiDungId,
        badge: badge,
        subtitle: subtitle,
        features: features,
        colorGradient: colorGradient
    } 
    try {
        const {data}= await baseApi.post<IAPIResponseWrapperArray<BatDongSan>>("/property", newProperty)
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }   
}
export const deleteProperty = async (id: string) => {
    try {
        const {data}= await baseApi.delete<IAPIResponseWrapperArray<BatDongSan>>(`/property/${id}`)
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}   

export const updateProperty = async (id: string, {overlay, thongTinChiTiet, tieuDe, moTa, loaiBds, diaChi, tinhThanh, quanHuyen, gia, dienTich, anhDaiDien, gallery, phongNgu, phongTam, choDauXe, trangThai, nguoiDungId, badge, subtitle, features, colorGradient}: BatDongSan) => {
    const newProperty = {
        overlay: overlay,
        thongTinChiTiet: thongTinChiTiet,
        tieuDe: tieuDe,
        moTa: moTa,
        loaiBds: loaiBds,
        diaChi: diaChi,
        tinhThanh: tinhThanh,
        quanHuyen: quanHuyen,
        gia: gia,
        dienTich: dienTich,
        anhDaiDien: anhDaiDien,
        gallery: gallery,
        phongNgu: phongNgu,
        phongTam: phongTam,
        choDauXe: choDauXe,
        trangThai: trangThai,
        nguoiDungId: nguoiDungId,
        badge: badge,
        subtitle: subtitle,
        features: features,
        colorGradient: colorGradient
    }
    try {
        const {data}= await baseApi.put<IAPIResponseWrapperArray<BatDongSan>>(`/property/${id}`, newProperty)
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}       