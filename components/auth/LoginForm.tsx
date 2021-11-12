import { useForm } from "react-hook-form";

interface ILoginForm {
    email: string;
    password: string;
  }

const LoginForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },  
      } = useForm<ILoginForm>();
    return (
        <form className='flex flex-col w-full'>
            
        </form>
    )
}

export default LoginForm
