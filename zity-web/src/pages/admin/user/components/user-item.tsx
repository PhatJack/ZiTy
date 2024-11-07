import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { User } from '@/schema/user.validate'

interface UserItemProps {
  user: User
  setShowDetail: (value: number | string) => void
}

const UserItem = ({ user, setShowDetail }: UserItemProps) => {
  return (
    <TableRow
      key={user?.id}
      className="font-medium cursor-pointer"
      onClick={() => setShowDetail(user?.id)}>
      <TableCell>{user?.id}</TableCell>
      <TableCell className="">
        <div className="w-full flex items-center gap-3">
          <img
            src={user?.avatar}
            alt="user avatar"
            className="size-9 rounded-full object-cover hidden sm:inline-block"
          />
          <div className="flex flex-col">
            <p className="">{user?.fullName}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{user?.phone ?? ''.slice(0, -4) + '****'}</TableCell>
      <TableCell>
        <Badge
          variant={`${user?.userType?.includes('ADMIN') ? 'warning' : 'info'}`}>
          {user?.userType}
        </Badge>
      </TableCell>
      <TableCell className="uppercase">
        <Badge variant={`${user?.isStaying === true ? 'success' : 'error'}`}>
          {user?.isStaying ? 'True' : 'False'}
        </Badge>
      </TableCell>
    </TableRow>
  )
}

export default UserItem
