import { Button } from '@/components/ui/button'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

export default function HeaderPostNew({ currentStep, steps, getStepProgress }: { currentStep: number, steps: any[], getStepProgress: () => number }) {
    return (
        <div className="bg-white shadow-sm border-b sticky z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="cursor-pointer" size="sm" >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Quay lại
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Đăng tin cho thuê</h1>
                            <p className="text-sm text-gray-600">
                                Bước {currentStep} / {steps.length}: {steps[currentStep - 1].name}
                            </p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">Hoàn thành {Math.round(getStepProgress())}%</div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${getStepProgress()}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
