import { useDocumentTitle } from 'usehooks-ts'
import ApartmentList from './components/apartment-list'
import ApartmentForm from './components/apartment-form'
import { useParams } from 'react-router-dom'
import ApartmentDetail from './components/apartment-detail'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import BreadCrumb from '@/components/breadcrumb'
import { useGetApartmentsQuery } from '@/features/apartment/apartmentSlice'
import ApartmentSkeleton from '@/components/skeleton/ApartmentSkeleton'
import { useState } from 'react'
import PaginationCustom from '@/components/pagination/PaginationCustom'
const Index = () => {
  const params = useParams()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const {
    data: apartments,
    isLoading,
    isFetching,
  } = useGetApartmentsQuery(currentPage)
  useDocumentTitle('Apartment')
  // console.log('apartments', apartments)
  return (
    <div className="w-full sm:h-screen flex flex-col bg-zinc-100 overflow-hidden">
      <BreadCrumb
        paths={[
          {
            label: 'apartment',
            to: '/apartment',
          },
          ...(params.id ? [{ label: params.id, to: '/#' }] : []),
        ]}
      />
      <div className="w-full h-full p-4 overflow-hidden">
        <div className="bg-white w-full h-full rounded-md p-4 space-y-4 flex flex-col overflow-hidden">
          {!params.id && (
            <>
              <section className="w-full flex flex-col sm:flex-row sm:gap-0 gap-4 justify-between items-center">
                <div className="w-full lg:w-1/3 flex items-center border px-3 py-0.5 relative rounded-md focus-within:border-primary transition-all">
                  <Search size={20} />
                  <Input
                    placeholder="Search something"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
                <ApartmentForm textTrigger="New Apartment" />
              </section>
              <div className="size-full flex flex-col overflow-hidden">
                {isLoading || isFetching ? (
                  <div className="w-full h-full flex flex-col gap-4 oveflo">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <ApartmentSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <ApartmentList apartments={apartments?.contents} />
                )}
                <PaginationCustom
                  onPageChange={setCurrentPage}
                  currentPage={currentPage}
                  totalPages={apartments?.totalPages}
                />
              </div>
            </>
          )}
          {params.id && <ApartmentDetail id={params?.id} />}
        </div>
      </div>
    </div>
  )
}

export default Index
