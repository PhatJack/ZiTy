import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Filter, Search } from 'lucide-react'
import { Button } from '@components/ui/button'
import { IPackage } from '@/schema/package.validate'
import PackageForm from './components/package-form'
import PackageList from './components/package-list'
import BreadCrumb from '@/components/breadcrumb'
import { useDocumentTitle } from 'usehooks-ts'
const Index = () => {
  useDocumentTitle('Package')
  const packages: IPackage[] = [
    {
      id: 1,
      image: 'Image 1',
      description: 'Description 1',
      isReceived: true,
      userId: 1,
			createdAt: new Date(),
			updatedAt: new Date()
    },
    {
      id: 2,
      image: 'Image 2',
      description: 'Description 2',
      isReceived: true,
      userId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
    },
    {
      id: 3,
      image: 'Image 3',
      description: 'Description 3',
      isReceived: true,
      userId: 3,
			createdAt: new Date(),
			updatedAt: new Date()
    },
    {
      id: 4,
      image: 'Image 4',
      description: 'Description 4',
      isReceived: true,
      userId: 4,
			createdAt: new Date(),
			updatedAt: new Date()
    },
    {
      id: 5,
      image: 'Image 5',
      description: 'Description 5',
      isReceived: false,
      userId: 5,
			createdAt: new Date(),
			updatedAt: new Date()
    },
  ]

  return (
    <>
      <div className="w-full sm:h-screen flex flex-col bg-zinc-100">
        <BreadCrumb paths={[{ label: 'package', to: '/package' }]} />
        <div className="size-full p-4">
          <div className="size-full p-4 bg-white rounded-md flex flex-col">
            <div className="w-full h-auto flex lg:flex-row flex-col gap-4 justify-between items-center">
              <div className="w-full flex gap-4 items-center">
                <div className="lg:w-1/4 w-full flex items-center border px-3 py-0.5 relative rounded-md focus-within:border-primary transition-all">
                  <Search size={20} />
                  <Input
                    placeholder="Search something"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
                <Button className="gap-1" size={'lg'} variant={'secondary'}>
                  <Filter size={20} />
                  Filter
                </Button>
              </div>
              <PackageForm>
                <Button
                  className="w-full sm:w-[160px]"
                  variant={'default'}
                  size={'lg'}>
                  New Package
                </Button>
              </PackageForm>
            </div>
            <div className="size-full">
              <PackageList packages={packages} />
            </div>
            <Pagination className="mt-2">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious to="#" />
                </PaginationItem>
                {[1, 2, 3, 4, 5].map((page) => (
                  <PaginationItem
                    key={page}
                    className={`${page === 1 ? 'bg-primary rounded-md' : ''}`}>
                    <PaginationLink to="#">{page}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext to="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
