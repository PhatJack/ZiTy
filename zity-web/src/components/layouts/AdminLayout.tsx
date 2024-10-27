import { useAppSelector } from '@/store'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const token = useAppSelector((state) => state.authReducer.token)
  const user = useAppSelector((state) => state.userReducer.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (token && !token) {
      navigate('/login', { replace: true })
    }
    if (user && user?.userType !== 'ADMIN') {
      navigate(-1)
    }
  }, [navigate, token, user])

  return <Outlet />
}

export default AdminLayout
