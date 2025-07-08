export interface User {
  _id: string
  ten: string
  email: string
  tenDangNhap: string
  matKhau: string
  soDienThoai: string
  vaiTro: string
  anhDaiDien: string
  trangThai: string
  createdAt: string
  updatedAt: string
}

export interface Overlay {
  category: string
  location: string
  priceDisplay: string
  rating: number
  reviews: number
  amenities: string[]
}

export interface ThongTinChiTiet {
  tang: string
  huong: string
  banCong: string
  noiThat: string
}

export interface BatDongSan {
  overlay: Overlay
  thongTinChiTiet: ThongTinChiTiet
  _id: string
  tieuDe: string
  moTa: string
  diaChi: string
  gia: number
  dienTich: number
  soPhongNgu: number
  soPhongTam: number
  gallery: string[]
  createdAt: string
  updatedAt: string
}

export interface Review {
  _id: string
  nguoiDungId: User
  batDongSanId: BatDongSan | null
  soSao: number
  binhLuan: string
  createdAt: string
  updatedAt: string
  __v: number
}

