import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'services';

interface Props {
    children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) =>{
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/discover');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}

export default Layout;
