import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { isAuthenticated } from '../../../services/auth';
import api from '../../../config/api';
import { ContainerBackground } from '../../../components/ContainerBackground';
import Menu from '../../../components/Menu';
import { ContainerContent } from '../../../components/ContainerContent';
import { ContainerWindow } from '../../../components/ContainerWindow';

export default function EditProcessEmpenho({id, numberSection}){

    console.log(id);
    console.log(numberSection);

    const route = useRouter();
    const [empenho, setEmpenho] = useState();
    const [pi, setPi] = useState();

    useEffect(() => {
        const verifyAuthentication = isAuthenticated();

        if (!verifyAuthentication) {
            route.push('/');
            return;
        }
    },[]);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await api.put('/requisition/updateempenho', 
/*             { 
                id,
                empenho: ,
                pi: , 
            },  */
            {
                headers: {
                    'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                }
            });

            setNoticeSending(response.data);

            const indexRequisition = requisitions.findIndex(requisition => requisition._id === requisitionUpdated);
            requisitions.splice(indexRequisition, 1);

            setSendingImage(true);

        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent>
                <ContainerWindow>
                    <h2>Inserir Empenho e Plano Interno</h2>
                    <div>
                        <div>
                            <label>Nota de Empenho</label>
                            <input type="text" onChange={(event)=> {
                                setEmpenho(event.target.value) 
                            }}/>                       
                        </div>
                        <div>
                            <label>Plano Interno</label>
                            <input type="text" onChange={(event)=> {
                                setPi(event.target.value) 
                            }}/>
                        </div>
                    </div>
                </ContainerWindow>
            </ContainerContent>
        </ContainerBackground>
    )
}

export async function getServerSideProps(context) {

    const [idProcess, numberSectionProcess] = context.query.id.split('__');

    return {
        props: {
            id: idProcess,
            numberSection: numberSectionProcess,
        }
    }
}