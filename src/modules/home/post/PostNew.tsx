

import React from "react"

import { useState } from "react"
import {
    CheckCircle,
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import HeaderPostNew from "./components/HeaderPostNew"
import ProgressStepsPostNew from "./components/ProgressStepsPostNew"
import FormContentPostNew from "./components/FormContentPostNew/FormContentPostNew"
import { categories, amenitiesList, steps } from "./components/Data/DataFormCreatePostNew"

export default function PostNew() {
    const router = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        address: "",
        price: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        amenities: [] as string[],
        images: [] as string[],
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        deposit: "",
        utilities: "",
        furnished: "",
        availableFrom: "",
    })







    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleAmenityToggle = (amenityId: string) => {
        setFormData((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenityId)
                ? prev.amenities.filter((id) => id !== amenityId)
                : [...prev.amenities, amenityId],
        }))
    }

    const handleImageUpload = (event: any) => {
        const files = event.target.files
        if (files) {
            const newImages = Array.from(files).map(
                (file, index) => `/placeholder.svg?height=300&width=400&text=Image+${formData.images.length + index + 1}`,
            )
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages],
            }))
        }
    }

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }))
    }

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSubmit = () => {
        console.log("Form submitted:", formData)

    }

    const getStepProgress = () => {
        return (currentStep / steps.length) * 100
    }

    const renderStepIcon = (step: any, isActive: boolean, isCompleted: boolean) => {
        const IconComponent = step.icon
        if (isCompleted) {
            return <CheckCircle className="w-6 h-6" />
        }
        return <IconComponent className="w-6 h-6" />
    }

    return (
        <div className="min-h-screen my-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <HeaderPostNew currentStep={currentStep} steps={steps} getStepProgress={getStepProgress} />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <ProgressStepsPostNew currentStep={currentStep} steps={steps} renderStepIcon={renderStepIcon} />

                    {/* Form Content */}
                    <FormContentPostNew prevStep={prevStep} nextStep={nextStep} handleSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange} categories={categories} steps={steps} currentStep={currentStep} amenitiesList={amenitiesList} handleAmenityToggle={handleAmenityToggle} handleImageUpload={handleImageUpload} removeImage={removeImage} />
                </div>
            </div>
        </div>
    )
}
