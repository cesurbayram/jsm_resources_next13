import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
    <main className="flex-center pandings mx-aouto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
      <Skeleton className="h-[274px] w-full rounded-lg" />
      </section>
      <section className="mt-6 flex w-full flex-cool sm:st-20">
      <Skeleton className="h-10 w-56" />
      <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
      <Skeleton className="h-[440px] w-full sm:w-[356px] bg-red-500" />
      <Skeleton className="h-[440px] w-full sm:w-[356px] bg-red-500" />
      <Skeleton className="h-[440px] w-full sm:w-[356px] bg-red-500" />
      </div>
      </section>
    </main>
  )
}

export default loading
