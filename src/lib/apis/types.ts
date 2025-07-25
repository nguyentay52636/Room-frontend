 export interface role { 
  _id? : string 
  ten : string 
  moTa : string 

 }
 export interface ILoginDataType {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenDataType {
  accessToken: string;
  refreshToken: string;
}
export interface IUser {
  _id: string
  ten: string
  email: string
  tenDangNhap: string
  matKhau: string
  soDienThoai: string
  vaiTro: role | string
  anhDaiDien?: string
  trangThai?: string
  createdAt?: string
  updatedAt?: string
}

export type UserType = IUser

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
  nguoiDungId: UserType
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
  nguoiDungId: UserType
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
  _id?: string
  nguoiDungId: UserType
  diaChi: string
  loai: string
  tongChiTieu: number
  soBdsDangThue: number
  soBdsYeuThich: number
  soDanhGia: number
  diemTrungBinh: number
  bdsDangThueHienTai: string
  ngayKetThucHopDong: string
  lanHoatDongGanNhat: string
  ghiChu?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface Employee { 
  nguoiDungId?: UserType 
  phongBan : string 
  chucVu : string 
  luong : number 
  hieuSuat : number 
  ngayVaoLam : Date 
  trangThai : string 
  createdAt?: string 
  updatedAt?: string 
  __v?: number 
}

export interface HostHome  { 

}  

export interface Message {
  _id?: string
  nguoiGuiId: string
  noiDung: string
  hinhAnh: string
  daDoc: boolean
  trangThai: string
  roomId?: string  
  createdAt?: string
  updatedAt?: string
  __v?: number
}
export interface Room { 
  _id?: string
  tenPhong: string
  loaiPhong: string
  thanhVien: UserType[]
  nguoiTao: UserType
  tinNhan?: Message[]
  anhDaiDien: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}
