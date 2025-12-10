import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-lg border border-medical-200 dark:border-medical-800 overflow-hidden">
      {/* Conversations Sidebar Skeleton */}
      <div className="w-1/3 border-r border-medical-200 dark:border-medical-800 flex flex-col">
        <div className="p-4 border-b border-medical-200 dark:border-medical-800">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-10 w-full mb-3" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex-1 p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area Skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-medical-200 dark:border-medical-800">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <div className="flex items-end space-x-2 max-w-xs">
                {i % 2 === 0 && <Skeleton className="w-6 h-6 rounded-full" />}
                <Skeleton className="h-16 w-48 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-medical-200 dark:border-medical-800">
          <div className="flex items-end space-x-2">
            <Skeleton className="w-8 h-8" />
            <Skeleton className="flex-1 h-10" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
