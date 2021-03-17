import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { isAuthenticated } from '../../services/auth';
import api from '../../config/api';
import { ContainerBackground } from '../../components/ContainerBackground';
import Menu from '../../components/Menu';
import { ContainerContent } from '../../components/ContainerContent';
import { ContainerWindow } from '../../components/ContainerWindow';

const ContainerReceive = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30px;
    height: 400px;

    img {
        width: 150px;
    }

    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        strong {
            text-align: center;
            display: block;
        }
        select {
            width: 120px;
            outline: none;
            height: 30px;
            font-size: 16px;
            border: 2px solid #DDE1E4;

            &:focus {
                border: 2px solid #0B8BD5;
            }
        }

        button {
        width: 270px;
        height: 30px;
        border: 0;
        border-radius: 4px;
        background: #0B8BD5;
        color: #fff;
        cursor: pointer;
        font-weight: 700;
        outline: none;
        margin-top: 30px;
        transition: 0.2s;

        &:hover {
            background: #064C74;
        }
    }
    }

`;

export default function Receive() {

    const route = useRouter();
    const [requisitions, setRequisitions] = useState();
    const [requisitionUpdated, setRequisitionUpdated] = useState();
    const [sendingImage, setSendingImage] = useState(false);

    useEffect(() => {
        const verifyAuthentication = isAuthenticated();

        if (!verifyAuthentication) {
            route.push('/');
            return;
        }

        async function getData() {
            try {
                const response = await api.get('/requisition/allrequisitions', {
                    headers: {
                        'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                    }
                });
                setRequisitions(response.data);
            } catch (error) {
                setError(error.response.data);
            }
        }
        getData();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        console.log(requisitionUpdated);
        
        setSendingImage(true);

        /*         const response = await api.put('/requisition/updatelocale', {}, {
                    headers: {
                        'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                    }
                }) */
    }

    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent>
                <ContainerWindow>
                    <h2>Receber Processo</h2>
                    <ContainerReceive>
                        <img src={sendingImage ? "/doc-checked-green.svg" : "/doc-checked-gray.svg"} alt="" />
                        <form onSubmit={handleSubmit}>
                            <strong>Processo</strong>
                            <select name="" id="" onChange={(event) => {
                                setRequisitionUpdated(event.target.value);
                                setSendingImage(false);
                            }}>
                                <option value=""></option>
                                {requisitions && requisitions.map(requisition => (
                                    <option value={requisition._id} key={requisition._id}>
                                        {`${requisition.number}/${requisition.section}`}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Receber</button>
                        </form>
                    </ContainerReceive>
                </ContainerWindow>
            </ContainerContent>
        </ContainerBackground>
    )
}