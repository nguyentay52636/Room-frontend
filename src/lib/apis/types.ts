export interface User {
    _id: string;
    ten: string;
    email: string;
    mat_khau: string;
    so_dien_thoai: string;
    vai_tro: string;
    anh_dai_dien: string;
    trang_thai: string;
    createdAt: string;
    updatedAt: string;
    ten_dang_nhap: string;
  }
  export interface Review {
    _id: string;
    nguoi_dung_id: User;
    bat_dong_san_id: BatDongSan | null;
    so_sao: number;
    binh_luan: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  export interface BatDongSan {
    _id: string;
    overlay: {
      category: string;
      location: string;
      price_display: string;
      rating: number;
      reviews: number;
      amenities: string[];
    };
    thong_tin_chi_tiet: {
      tang: string;
      huong: string;
      ban_cong: string;
      noi_that: string;
    };
  }
  