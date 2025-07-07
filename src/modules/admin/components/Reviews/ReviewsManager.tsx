import React from 'react'
import { PaginationProvider } from '../../context/PaginationContext'
import ReviewsManagerContent from './ReviewsManagerContent'

export default function ReviewsManager() {
    return (
        <PaginationProvider initialRowsPerPage={10}>
            <ReviewsManagerContent />
        </PaginationProvider>
    )
}
