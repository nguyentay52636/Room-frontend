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
  loaiBds: string
  gia: number
  diaChi: string
  tinhThanh: string
  quanHuyen: string
  dienTich: number
  anhDaiDien: string
  gallery: string[]
  phongNgu: number
  phongTam: number
  choDauXe: number
  trangThai: string
  nguoiDungId: User
  badge: string
  subtitle: string
  features: features[]
  colorGradient?: string
  createdAt?: string
  updatedAt?: string
  views?: number | 1
  __v?: number
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

export interface features { 
  _id: string
  icon: string
text: string
  color: string
}
export interface Customer { 
  nguoiDungId:  User
  diaChi: string
  loai: string
  tongChiTieu: number
  soBdsDangThue: number
  soBdsYeuThich: number
  soDanhGia: number
  diemTrungBinh: number
  bdsDangThueHienTai: number
  ngayKetThucHopDong: string
  lanHoatDongGanNhat: string
  ghiChu: string
  __v: number
  createdAt?: string
  updatedAt?: string
}