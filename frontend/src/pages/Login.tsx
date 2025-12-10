import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/contexts/AuthContext"
import usePostFn from "@/hooks/usePostFn"
import { login } from "@/services/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setUser, isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { loading, postData } = usePostFn(login)

  useEffect(() => {
		if(isAuthenticated) {
			navigate('dashboard')
		}
	}, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username === '' || username === undefined) {
      toast.error('Username is required');
      return;
    }
    if (password === '' || password === undefined) {
      toast.error('Password is required');
      return;
    }

    try {
      const res = await postData({ username, password })
      if (res.success) {
        toast.success("Login successfully")
        setUser(res.data)
        setIsAuthenticated(true)
        navigate('dashboard')
      }
    } catch (error) {
      toast.error(error as string)
    }
  };
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="w-96 border p-3 rounded-md">
        <form className="space-y-4 py-4">
          <h1 className="font-bold text-3xl text-center">Login</h1>
          <div>
            <Label
              htmlFor="username"
              className="mb-0.5 text-md">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="mb-0.5 text-md">
              Password
            </Label>
            <Input
              id="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              className="w-full"
              onClick={handleSubmit}
            >
              {loading ? (
                <Spinner />
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
