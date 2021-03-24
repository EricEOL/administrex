import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import styled from 'styled-components';
import api from '../../config/api';
import formatNumber from '../../utils/formatNumber';
import { ContainerBackground } from '../../components/ContainerBackground';
import Menu from '../../components/Menu';
import { ContainerContent } from '../../components/ContainerContent';
import { ContainerWindow } from '../../components/ContainerWindow';

const ContainerFinances = styled.div`
    width: 100%;
    height: 70%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            width: 120px;
        }

        strong {
            font-size: 14px;
            padding: 5px;
        }

        span {
            margin-top: 15px;
            font-size: 25px;
        }
    }

`;

function Totals() {
    const { isAuthenticated } = useAuth();
    const [requisitions, setRequisitions] = useState([]);
    const [totalRequisitions, setTotalRequisitions] = useState('');
    const [totalEmpenhado, setTotalEmpenhado] = useState('');
    const [totalPayment, setTotalPayment] = useState('');
    const [error, setError] = useState('');

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

                const requisitionsArray = response.data;

                const totalRequisitionsValue = requisitionsArray.reduce((total, requisition) => {
                    return total + requisition.value;
                }, 0);
        
                setTotalRequisitions(formatNumber(totalRequisitionsValue));
        
                const totalRequisitionsEmpenhadas = requisitionsArray
                    .filter((requisition) => requisition.status !== 'Aguardando')
                    .reduce((total, requisition) => {
                        return total + requisition.value;
                    }, 0);
        
                setTotalEmpenhado(formatNumber(totalRequisitionsEmpenhadas));

                const totalRequisitionsPayment = requisitionsArray
                .filter((requisition) => requisition.status === 'Liquidado' || requisition.status === 'Pago')
                .reduce((total, requisition) => {
                    return total + requisition.value;
                }, 0);
    
                setTotalPayment(formatNumber(totalRequisitionsPayment));

            } catch (error) {
                setError(error.response.data);
            }
        }

        getData();
    }, [])

    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent>
                <ContainerWindow>
                    <h2>Dados Financeiros</h2>
                    {requisitions.length > 0 ? (
                        <ContainerFinances>
                            <div>
                                <img src="/requisitions.svg" alt="" />
                                <strong>Requisições</strong>
                                <span>{totalRequisitions}</span>
                            </div>
                            <div>
                                <img src="/empenhado.svg" alt="" />
                                <strong>Empenhado</strong>
                                <span>{totalEmpenhado}</span>
                            </div>
                            <div>
                                <img src="/payment.svg" alt="" />
                                <strong>Liquidado/Pago</strong>
                                <span>{totalPayment}</span>
                            </div>
                        </ContainerFinances>
                    ) : (
                            <p>Aguardando...</p>
                        )}
                </ContainerWindow>
            </ContainerContent>
        </ContainerBackground>
    )
}

export default Totals;