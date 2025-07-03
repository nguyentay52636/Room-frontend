import React from 'react'

export default function ProgressStepsPostNew({ steps, currentStep, renderStepIcon }: { steps: any[], currentStep: number, renderStepIcon: (step: any, isActive: boolean, isCompleted: boolean) => React.ReactNode }) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentStep >= step.id
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg"
                                    : currentStep === step.id - 1
                                        ? "border-blue-300 text-blue-600 bg-blue-50"
                                        : "border-gray-300 text-gray-400 bg-white"
                                    }`}
                            >
                                {renderStepIcon(step, currentStep === step.id, currentStep > step.id)}
                            </div>
                            <div className="mt-3 text-center">
                                <p
                                    className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}
                                >
                                    {step.name}
                                </p>
                                <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${currentStep > step.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-300"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
