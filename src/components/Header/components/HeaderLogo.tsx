
import { Link } from 'react-router-dom'

export default function HeaderLogo() {
    return (
        <>
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 animate-fade-in">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-lg flex items-center justify-center theme-transition">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                </div>
                <div className="min-w-0">
                    <h1 className="text-lg sm:text-xl font-bold text-primary theme-transition truncate">NewLive</h1>
                    <p className="text-xs text-muted-foreground -mt-1 theme-transition hidden sm:block">Cho thuê căn hộ</p>
                </div>
            </Link>

        </>
    )
}
