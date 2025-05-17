import { Navigate } from "react-router-dom"

export const HomePage = () => {
  // const { isAuth, isLoading, role } = useCheckAuth()
  const isAuth = true
  const isLoading = false
  const role = "user"

  if (isLoading) {
    // return <Spinner />
    return <div>Loading</div>
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  switch (role) {
    case "admin":
      return <Navigate to="/admin" replace />
    case "user":
      return <Navigate to="/user" replace />
    default:
      return <Navigate to="/login" replace />
  }
}
