import React from 'react'

export default function FeatureItem({ feature, index }: { feature: any, index: number }) {
    return (
        <>
            <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                        <feature.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>

                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
            </div>
        </>
    )
}
