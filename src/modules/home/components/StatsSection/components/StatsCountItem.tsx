import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import { Shield } from 'lucide-react'

export default function ({ stat, index, isVisible, handleAnimationComplete, completedAnimations }: { stat: any, index: number, isVisible: boolean, handleAnimationComplete: () => void, completedAnimations: number }) {
  return (
    <>
      <div
        key={index}
        className={`group text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        style={{ transitionDelay: `${300 + index * 150}ms` }}
      >
        {/* Card Container */}
        <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 group-hover:-translate-y-2">
          {/* Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
          />

          {/* Icon Container */}
          <div className="relative mb-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 ${stat.bgColor} rounded-2xl mb-2 group-hover:scale-110 transition-all duration-500`}
            >
              <stat.icon className={`w-10 h-10 ${stat.iconColor}`} />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
          </div>

          {/* Counter */}
          <div className="mb-4">
            <AnimatedCounter
              end={stat.value}
              duration={stat.duration}
              isDecimal={stat.isDecimal}
              suffix={stat.suffix}
              onComplete={handleAnimationComplete}
            />
          </div>

          {/* Label */}
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {stat.label}
          </h3>

          {/* Description */}
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
            {stat.description}
          </p>

          {/* Progress Bar */}
          <div className="mt-6 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1500 ease-out`}
              style={{
                width: completedAnimations > index ? "100%" : "0%",
                transitionDelay: `${500 + index * 200}ms`,
              }}
            />
          </div>

          {/* Completion Badge */}
          <div
            className={`absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center transition-all duration-500 ${completedAnimations > index ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
          >
            <Shield className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </>
  )
}
