import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../config/api';
import { isAuthenticated } from '../services/auth';
import formatNumber from '../utils/formatNumber';
import { ContainerBackground } from '../components/ContainerBackground';
import { ContainerContent } from '../components/ContainerContent';
import { ContainerLine } from '../components/ContainerLine';
import Menu from '../components/Menu';
import AsideMenu from '../components/AsideMenu';
import { ContainerWindow } from '../components/ContainerWindow';

function Process() {
    const route = useRouter();
    const [requisitions, setRequisitions] = useState();
    const [error, setError] = useState();

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
                                    <ContainerLine waiting key={`${requisition.number}/${requisition.section}`}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
                                        <strong>{requisition.status}</strong>
                                        <a href="">Detalhar</a>
                                    </ContainerLine>
                                )
                            }
                        }
                        {
                            if (requisition.status === 'Empenhado') {
                                return (
                                    <ContainerLine empenhado key={`${requisition.number}/${requisition.section}`}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
                                        <strong>{requisition.status}</strong>
                                        <a href="">Detalhar</a>
                                    </ContainerLine>
                                )
                            }
                        }
                        {
                            if (requisition.status === 'Liquidado') {
                                return (
                                    <ContainerLine liquidado key={`${requisition.number}/${requisition.section}`}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
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

export default Process;