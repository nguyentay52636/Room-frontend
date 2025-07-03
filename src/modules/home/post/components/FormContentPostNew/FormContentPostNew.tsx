import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StepOneCreatePostNew from './components/StepCreatePostNew/StepOneCreatePostNew'
import StepTwoCreatePostNew from './components/StepCreatePostNew/StepTwoCreatePostNew'
import StepThreeCreatePostNew from './components/StepCreatePostNew/StepThreeCreatePostNew'
import StepFourCreatePostNew from './components/StepCreatePostNew/StepFourCreatePostNew'
import StepFiveCreatePostNew from './components/StepCreatePostNew/StepFiveCreatePostNew'
import NavigateButtonCreatePostNew from './components/StepCreatePostNew/NavigateButtonCreatePostNew'

export default function FormContentPostNew({ prevStep, nextStep, handleSubmit, formData, handleInputChange, categories, steps, currentStep, amenitiesList, handleAmenityToggle, handleImageUpload, removeImage }: { prevStep: () => void, nextStep: () => void, handleSubmit: () => void, formData: any, handleInputChange: (field: string, value: any) => void, categories: any[], steps: any[], currentStep: number, amenitiesList: any[], handleAmenityToggle: (amenityId: string) => void, handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void, removeImage: (index: number) => void }) {
    return (
        <>
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3">
                        {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6" })}
                        {steps[currentStep - 1].name}
                    </CardTitle>
                    <p className="text-blue-100">{steps[currentStep - 1].description}</p>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    {currentStep === 1 && (
                        <StepOneCreatePostNew formData={formData} handleInputChange={handleInputChange} categories={categories} />
                    )}

                    {currentStep === 2 && (
                        <StepTwoCreatePostNew handleInputChange={handleInputChange} formData={formData} />
                    )}

                    {currentStep === 3 && (
                        <StepThreeCreatePostNew formData={formData} handleInputChange={handleInputChange} amenitiesList={amenitiesList} handleAmenityToggle={handleAmenityToggle} />
                    )}

                    {currentStep === 4 && (
                        <StepFourCreatePostNew formData={formData} handleImageUpload={handleImageUpload} removeImage={removeImage} />
                    )}

                    {currentStep === 5 && (
                        <StepFiveCreatePostNew formData={formData} handleInputChange={handleInputChange} />
                    )}

                    <NavigateButtonCreatePostNew prevStep={prevStep} nextStep={nextStep} handleSubmit={handleSubmit} currentStep={currentStep} steps={steps} />
                </CardContent>
            </Card>
        </>
    )
}
