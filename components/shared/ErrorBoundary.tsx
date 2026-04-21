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
    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          ลองอีกครั้ง
        </Button>
      )}
    </div>
  )
}
