# Room Frontend

Một ứng dụng web hiện đại được xây dựng với React, TypeScript và Vite, tích hợp với Tailwind CSS và nhiều thư viện UI/UX tiên tiến.

## 🚀 Công nghệ sử dụng

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 + tw-animate-css
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Redux Toolkit + React Redux
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier

## 📦 Cài đặt

1. **Clone repository**:
```bash
git clone https://github.com/nguyentay52636/Room-frontend.git
cd Room-NewLive
```

2. **Cài đặt dependencies**:
```bash
npm install
```

3. **Chạy development server**:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

## 🛠️ Scripts có sẵn

- `npm run dev` - Chạy development server với hot reload
- `npm run build` - Build ứng dụng cho production
- `npm run preview` - Preview build production
- `npm run lint` - Kiểm tra code với ESLint
- `npm run format` - Format code với Prettier

## 🎨 Tính năng

- **Dark/Light Mode**: Hỗ trợ chuyển đổi theme với animation mượt mà
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Modern UI**: Sử dụng design system hiện đại
- **Performance**: Tối ưu với React 19 và Vite
- **Type Safety**: TypeScript end-to-end

## 📁 Cấu trúc dự án

```
src/
├── components/     # UI Components
├── contexts/       # React Contexts
├── hooks/          # Custom Hooks
├── lib/           # Utility functions
├── modules/       # Feature modules
├── redux/         # Redux store & slices
├── routes/        # Routing configuration
├── assets/        # Static assets
├── App.tsx        # Main App component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## 🔧 Cấu hình

### Tailwind CSS
Dự án sử dụng Tailwind CSS 4 với cấu hình tùy chỉnh cho:
- Color system với dark/light mode
- Custom animations
- Responsive design
- Component variants

### ESLint & Prettier
- ESLint với TypeScript support
- Prettier cho code formatting
- React-specific rules

## 🚀 Deployment

Để build cho production:
```bash
npm run build
```

Files build sẽ được tạo trong thư mục `dist/`.

## 📝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

