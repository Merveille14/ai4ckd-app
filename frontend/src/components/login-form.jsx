import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/services/axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export function LoginForm({
  className,
  ...props
}) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  const navigate =useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await api.post('/login',{
        email,
        password,
      });
      const {user,token} = response.data;
      // token stocker
      localStorage.setItem('token',token);
      console.log("token")
      if (user.role === 'admin' || user.role === 'doctor' ||   user.role === 'lab_technician'  ) {
       navigate('/admin/dashboard');
      } else if (user.role === 'doctor') {
        navigate('/doctor/dashboard')
      }else if (user.role === 'doctor') {
        navigate('/doctor/dashboard')
      }
      ;s

      setMessage(`Bienvenue ${user.first_name} !`);
    }
    catch (error) {
      setMessage(error.response?.data?.message || 'Erreur inconnue');
    }
  };
  return (
    (<div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden shadow-2xl p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Connexion </h1>
                <p className="text-muted-foreground text-balance w-full">
                   Entrez vos informations de connexion
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" 
                type="email"  
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="m@example.com" 
                required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    mot de passe oublié?
                  </a>
                </div>
                <Input id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <Button type="submit" className="w-full mb-20">
              se connecter
              </Button>
            </div>
          </form>
          {message && <p>{message}</p>}
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://i.pinimg.com/736x/2e/6e/c8/2e6ec814459231d305e89bd315a7ae74.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>)
  );
}
