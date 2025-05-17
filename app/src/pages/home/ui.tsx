import { Navigate } from "react-router-dom"

export const HomePage = () => {
  // const { isAuth, isLoading, role } = useCheckAuth()
  const isAuth = true
  const isLoading = false
  const user = JSON.parse(localStorage.getItem('authData'))
  const role = user.user.role

  if (isLoading) {
    // return <Spinner />
    return <div>Loading</div>
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  switch (role) {
    case "Администратор":
      return <Navigate to="/admin" replace />
    case "Гость":
      return <Navigate to="/user" replace />
    default:
      return <Navigate to="/login" replace />
  }
}
