import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AdminHeader from "../../components/admin/theme/Header";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

export default function AdminLogin() {
  const router = useRouter();
  const user = auth.currentUser;
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-screen w-full bg-gray-200">
      <AdminHeader />
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}
