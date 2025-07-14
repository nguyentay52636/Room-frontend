import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Profile Sidebar Skeleton */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                                    <Skeleton className="h-4 w-24 mx-auto mb-2" />
                                    <Skeleton className="h-6 w-20 mx-auto" />
                                </div>

                                <div className="space-y-3 mb-6">
                                    <Skeleton className="h-5 w-32" />
                                    <div className="space-y-2">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-4 w-4 rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <Skeleton className="h-8 w-8 mx-auto mb-2" />
                                        <Skeleton className="h-3 w-12 mx-auto" />
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <Skeleton className="h-8 w-8 mx-auto mb-2" />
                                        <Skeleton className="h-3 w-12 mx-auto" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-3">
                        {/* Tabs Skeleton */}
                        <div className="mb-6">
                            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-10 flex-1" />
                                ))}
                            </div>
                        </div>

                        {/* Content Cards Skeleton */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-6 w-48" />
                                    <Skeleton className="h-4 w-64" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="space-y-2">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-24 w-full" />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Card key={i}>
                                        <CardContent className="p-6 text-center">
                                            <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
                                            <Skeleton className="h-5 w-24 mx-auto mb-2" />
                                            <Skeleton className="h-4 w-32 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
