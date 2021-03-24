import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../config/api';
//import { isAuthenticated } from '../services/auth';
import formatNumber from '../utils/formatNumber';
import { ContainerBackground } from '../components/ContainerBackground';
import { ContainerContent } from '../components/ContainerContent';
import { ContainerLine } from '../components/ContainerLine';
import Menu from '../components/Menu';
import AsideMenu from '../components/AsideMenu';
import { ContainerWindow } from '../components/ContainerWindow';

function Process() {
    const { isAuthenticated } = useAuth();
    const [requisitions, setRequisitions] = useState();
    const [error, setError] = useState();
    const [requisitionsFiltered, setRequisitionsFiltered] = useState([]);

    useEffect(() => {

        isAuthenticated();

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
    }, []);

    function handleFilter(event) {
        const textFilter = event;
        const textFilterModified = textFilter.toUpperCase();

        const requisitionFiltered = requisitions.filter(requisition=> {
            const concatData = `${requisition.number}/${requisition.section}/${formatNumber(requisition.value)}/${requisition.status}/${requisition.type}/${requisition.locale}`;
            const concatDataModified = concatData.toUpperCase();

            if(concatDataModified.indexOf(textFilterModified) >= 0){
                return requisition;
            }            
        });

        setRequisitionsFiltered(requisitionFiltered);
    }

    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent contentWindow>
                <ContainerWindow>
                    <h2>Processos</h2>
                    
                    <input 
                        type="text" 
                        name="filter" 
                        onChange={(event)=>handleFilter(event.target.value)}
                        placeholder="Digite aqui e encontre seu processo"
                    />

                    <ContainerLine style={{fontWeight: 'bold'}}>
                        <div style={{background: 'transparent'}}/>
                        <span>Nº/Seção</span>
                        <span>Tipo</span>
                        <span>Valor</span>
                        <span>Local</span>
                        <strong style={{fontSize: '14px'}}>Situação</strong>
                        <a href="" style={{color: '#000', fontSize: '14px', cursor: 'auto'}}>Detalhar</a>
                    </ContainerLine>

                    {requisitionsFiltered.length > 0 ? (
                        <>
                            { requisitionsFiltered && requisitionsFiltered.map(requisition => {
                        {
                            if (requisition.status === 'Aguardando') {
                                return (
                                    <ContainerLine waiting key={requisition._id} id={requisition._id}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
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
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
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
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
                                    </ContainerLine>
                                )
                            }
                        }
                        {
                            if (requisition.status === 'Pago') {
                                return (
                                    <ContainerLine pago key={`${requisition.number}/${requisition.section}`}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
                                    </ContainerLine>
                                )
                            }
                        }
                    })}
                        </>
                    ): (
                        <>
                        { requisitions && requisitions.map(requisition => {
                        {
                            if (requisition.status === 'Aguardando') {
                                return (
                                    <ContainerLine waiting key={requisition._id} id={requisition._id}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
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
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
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
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
                                    </ContainerLine>
                                )
                            }
                        }
                        {
                            if (requisition.status === 'Pago') {
                                return (
                                    <ContainerLine pago key={`${requisition.number}/${requisition.section}`}>
                                        <div />
                                        <span>{`${requisition.number}/${requisition.section}`}</span>
                                        <span>{requisition.type}</span>
                                        <span>{`${formatNumber(requisition.value)}`}</span>
                                        <span>{requisition.locale}</span>
                                        <strong>{requisition.status}</strong>
                                        <Link href={`/requisitions/${requisition._id}`}>Detalhar</Link>
                                    </ContainerLine>
                                )
                            }
                        }
                    })}
                        </>
                    )}
                </ContainerWindow>

                <AsideMenu />

            </ContainerContent>
        </ContainerBackground>
    )
}

export default Process;