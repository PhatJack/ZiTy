import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
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
import { Link } from 'react-router-dom'
import { Package } from '@/schema/package.validate'
import PackageForm from './components/package-form'
import PackageList from './components/package-list'

const Index = () => {
  const packages: Package[] = [
    {
      id: 1,
      image: 'Image 1',
      description: 'Description 1',
      is_received: true,
      user_id: 1,
    },
    {
      id: 2,
      image: 'Image 2',
      description: 'Description 2',
      is_received: true,
      user_id: 2,
    },
    {
      id: 3,
      image: 'Image 3',
      description: 'Description 3',
      is_received: true,
      user_id: 3,
    },
    {
      id: 4,
      image: 'Image 4',
      description: 'Description 4',
      is_received: true,
      user_id: 4,
    },
    {
      id: 5,
      image: 'Image 5',
      description: 'Description 5',
      is_received: false,
      user_id: 5,
    },
  ]

  return (
    <>
      <div className="w-full sm:h-screen flex flex-col bg-zinc-100">
        <div className="w-full px-4 pt-4">
          <Breadcrumb className="p-4 font-medium bg-white rounded-md">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={'/'}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="size-full p-4">
          <div className="size-full p-4 bg-white rounded-md">
            <div className="w-full h-auto flex justify-between items-center">
              <div className="w-full flex gap-4 items-center">
                <div className="lg:w-1/4 flex items-center border px-3 py-0.5 relative rounded-md focus-within:border-primary transition-all">
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
              <PackageForm />
            </div>
            <PackageList packages={packages} />
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
