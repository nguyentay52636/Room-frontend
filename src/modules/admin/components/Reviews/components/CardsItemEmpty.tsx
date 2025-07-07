import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Zap } from 'lucide-react'

export default function CardsItemEmpty({ setSearchTerm, setRatingFilter, setCategoryFilter }: { setSearchTerm: any, setRatingFilter: any, setCategoryFilter: any }) {
    return (
        <>
            <Card className="shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
                <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="text-8xl mb-6 animate-bounce">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        Không tìm thấy đánh giá nào
                    </h3>
                    <p className="text-gray-500 text-center max-w-md mb-6 leading-relaxed">
                        Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để khám phá thêm những đánh giá chân thật từ khách hàng.
                    </p>
                    <Button
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 rounded-xl px-6 py-3 font-semibold transition-all duration-200"
                        onClick={() => {
                            setSearchTerm("")
                            setRatingFilter("all")
                            setCategoryFilter("all")
                        }}
                    >
                        <Zap className="h-4 w-4 mr-2" />
                        Đặt lại bộ lọc
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}
