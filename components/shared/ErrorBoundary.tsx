import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = 'เกิดข้อผิดพลาด',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="bg-danger/10 border border-danger/20 rounded-lg p-6 text-center">
      <AlertCircle className="h-12 w-12 text-danger mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          ลองอีกครั้ง
        </Button>
      )}
    </div>
  )
}
