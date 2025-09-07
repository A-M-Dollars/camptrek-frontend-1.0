import { Skeleton } from "@/components/ui/skeleton"

const ShowcaseCardsSkeleton = () => {
  return (
    <div className="mt-4">
      {/* Image skeleton */}
      <div className="relative h-[180px] w-full">
        <Skeleton className="h-full w-full" />
        {/* Discount badge skeleton */}
        <div className="absolute top-0 right-0 m-2">
          <Skeleton className="h-[28px] w-[60px]" />
        </div>
      </div>

      {/* Content section skeleton */}
      <div className='justify-between items-center p-4'>
        <div className="flex flex-row items-center justify-between w-full mb-2">
          {/* Title skeleton */}
          <Skeleton className="h-[20px] w-[180px]" />
        </div>
        {/* Category skeleton */}
        <Skeleton className="h-[16px] w-[100px] mb-3" />
        
        <div className='flex flex-row justify-between items-center'>
          {/* Duration skeleton */}
          <div className='flex flex-row items-center'>
            <Skeleton className="h-[16px] w-[60px]" />
          </div>
          {/* Rating skeleton */}
          <div className="flex flex-row gap-1 items-center">
            <Skeleton className="h-[20px] w-[20px]" />
            <Skeleton className="h-[16px] w-[30px]" />
          </div>
        </div>
      </div>

      {/* Price and button section skeleton */}
      <div className='flex flex-row justify-between items-center p-4'>
        <div>
          <Skeleton className="h-[28px] w-[120px] mb-1" />
          <Skeleton className="h-[14px] w-[80px]" />
        </div>
        <div>
          <Skeleton className="h-[39px] w-[118px]" />
        </div>
      </div>
    </div>
  )
}

export default ShowcaseCardsSkeleton