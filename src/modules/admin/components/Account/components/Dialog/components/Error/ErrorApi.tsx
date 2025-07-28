import React from 'react'

export default function ErrorApi({ error }: { error: string }) {
  return (
    <>
      {error && (
        <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-500 mb-4">Lỗi: {error}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
