import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import api from '../config/api';
import { isAuthenticated } from '../services/auth';
import { ContainerBackground } from '../components/ContainerBackground';
import { ContainerContent } from '../components/ContainerContent';
import { ContainerLine } from '../components/ContainerLine';
import Menu from '../components/Menu';
import AsideMenu from '../components/AsideMenu';


const ContainerWindow = styled.div`
    width: 70%;
    min-height: 80vh;
    margin-top: 30px;
    padding: 10px;

    background: #fff;

    h2 {
        text-align: center;
        margin: 5px;
    }
`;

function Logged() {
    const route = useRouter();
    const [requisitions, setRequisitions] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const verifyAuthentication = isAuthenticated();

        if (!verifyAuthentication) {
            route.push('/');
            return;
        }

        async function handleInformation() {
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
        handleInformation();
    });


    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent contentWindow>
                <ContainerWindow>
                    <h2>Processos</h2>  
                    {requisitions && requisitions.map(requisition => {
                        {
                            if (requisition.status === 'Aguardando') {
                                return (
                                    <ContainerLine waiting>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`R$ ${requisition.value}`}</span>
                                        <strong>{requisition.status}</strong>
                                        <a href="">Detalhar</a>
                                    </ContainerLine>
                                )
                            }
                        }
                        {
                            if (requisition.status === 'Empenhado') {
                                return (
                                    <ContainerLine empenhado>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`R$ ${requisition.value}`}</span>
                                        <strong>{requisition.status}</strong>
                                        <a href="">Detalhar</a>
                                    </ContainerLine>
                                )
                            }
                        }
                        {
                            if (requisition.status === 'Liquidado') {
                                return (
                                    <ContainerLine liquidado>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`R$ ${requisition.value}`}</span>
                                        <strong>{requisition.status}</strong>
                                        <a href="">Detalhar</a>
                                    </ContainerLine>
                                )
                            }
                        }
                    })}
                </ContainerWindow>
                
                <AsideMenu />
            
            </ContainerContent>
        </ContainerBackground>
    )
}

export default Logged;