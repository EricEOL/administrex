import {useRouter} from 'next/router';

export default function Menu() {

    const route = useRouter();

    function handleLogout() {
        localStorage.removeItem('@Sistem_mar21:token');
        localStorage.removeItem('@Sistem_mar21:user');
    
        route.push('/');
    }

    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}