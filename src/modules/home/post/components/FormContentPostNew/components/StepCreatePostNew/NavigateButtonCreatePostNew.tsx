import { CheckCircle } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function NavigateButtonCreatePostNew({ prevStep, nextStep, handleSubmit, currentStep, steps }: { prevStep: () => void, nextStep: () => void, handleSubmit: () => void, currentStep: number, steps: any[] }) {
    return (
        <div className="flex justify-between pt-8 border-t border-gray-200">
            <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-8 py-3 bg-transparent cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
            </Button>

            {currentStep < steps.length ? (
                <Button
                    onClick={nextStep}
                    className="px-8 py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                    Tiếp tục
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
            ) : (
                <Button
                    onClick={handleSubmit}
                    className="px-8 cursor-pointer py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Đăng tin ngay
                </Button>
            )}
        </div>
    )
}
