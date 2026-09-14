import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../hooks/auth"

const ProtectedRoute = () => {
  const {data: user, isLoading, isError} = useMe();

  if (isLoading) return <p>Loading...</p>

  if (isError || !user) return <Navigate to="/login" replace/>

  return <Outlet/>
}

export default ProtectedRoute
