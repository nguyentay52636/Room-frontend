export interface User {

  ten: string;
  email: string;
  matKhau: string;
  soDienThoai: string;
  vaiTro: string;
  anhDaiDien: string;
  trangThai: string;
  createdAt: string;
  updatedAt: string;
  tenDangNhap: string;
}

export interface Review {

  nguoiDungId: User;
  batDongSanId: BatDongSan | null;
  soSao: number;
  binhLuan: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BatDongSan {

  overlay: {
    category: string;
    location: string;
    priceDisplay: string;
    rating: number;
    reviews: number;
    amenities: string[];
  };
  thongTinChiTiet: {
    tang: string;
    huong: string;
    banCong: string;
    noiThat: string;
  };
}
