
import { z } from "zod";

export const accountSchema = z.object({
  _id: z.string().optional(),
  ten: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  tenDangNhap: z.string().min(3, "Tên đăng nhập quá ngắn"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").optional().or(z.literal("")),
  soDienThoai: z.string().min(8, "SĐT không hợp lệ"),
  vaiTro: z.string().min(1, "Chọn vai trò"),
  anhDaiDien: z.string().optional(),
  trangThai: z.string().min(1, "Chọn trạng thái"),
  lastLogin: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  loginNotifications: z.boolean().optional(),
  securityNotifications: z.boolean().optional(),
  twoFactorAuth: z.enum(["none", "sms", "email", "app"]).optional(),
  requirePasswordChange: z.boolean().optional(),
  language: z.enum(["vi", "en"]).optional(),
  theme: z.enum(["light", "dark", "auto"]).optional(),
});

export type AccountFormData = z.infer<typeof accountSchema>;