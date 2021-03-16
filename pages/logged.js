import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../config/api';
import { isAuthenticated } from '../services/auth';
import Menu from '../components/Menu';

function Logged() {
    const route = useRouter();
    const [authetication, setAuthetication] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        const verifyAuthentication = isAuthenticated();
        setAuthetication(verifyAuthentication);

        if (!verifyAuthentication) {
            route.push('/');
        }

        async function handleInformation() {
            try {
                const response = await api.get('/admin', {
                    headers: {
                        'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                    }
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        handleInformation();
    });


    return (
        <>
            <Menu />
            {authetication && (
                <div>
                    {data}
                </div>
            )}
        </>
    )
}

export default Logged;