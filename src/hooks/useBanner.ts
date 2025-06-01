import {useRouter} from 'next/navigation';
import {useDispatch} from "react-redux";
import {logout} from "@/features/auth/authSlice";

export function useBanner() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };
    return {
        handleLogout,
    };
}
