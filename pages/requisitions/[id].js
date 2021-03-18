import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { isAuthenticated } from '../../services/auth';
import api from '../../config/api';
import formatNumber from '../../utils/formatNumber';
import { ContainerBackground } from '../../components/ContainerBackground';
import Menu from '../../components/Menu';
import { ContainerContent } from '../../components/ContainerContent';
import { ContainerWindow } from '../../components/ContainerWindow';

const Informations = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70%;
    margin-top: 30px;

    .column-1, .column-2 {
        
        div {
            margin-bottom: 20px;

            strong {
                display: block;
                font-size: 14px;
            }
        }
    }
`;

const Status = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background: gray;
        background: ${props => props.waiting && css`yellow`};
        background: ${props => props.empenhado && css`green`};
        background: ${props => props.liquidado && css`blue`};
        background: ${props => props.pago && css`gray`};
        color: #000;
        color: ${props => props.empenhado && css`#fff`};
        color: ${props => props.liquidado && css`#fff`};
        color: ${props => props.pago && css`#fff`};
        letter-spacing: 1px;
`;

export default function Details({ id }) {

    const [process, setProcess] = useState([]);
    const [error, setError] = useState();

    const route = useRouter();

    useEffect(() => {
        const verifyAuthentication = isAuthenticated();

        if (!verifyAuthentication) {
            route.push('/');
            return;
        }

        async function getData() {
            try {
                const response = await api.get(`/requisition/allrequisitions`, {
                    headers: {
                        'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                    }
                });
                const searchProcess = response.data.filter(process => process._id === id);
                setProcess(searchProcess);
            } catch (error) {
                setError(error.response.data);
            }
        }
        getData();
    }, []);

    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent>
                <ContainerWindow>
                    <div>
                        <h2>Detalhes do Processo - 001/Almox</h2>
                    </div>
                    {process && process.map(item => (
                        <>
                        <Informations key={item._id}>
                            <div className="column-1">
                                <div>
                                    <strong>Nº/Seção</strong>
                                    <span>{`${item.number}/${item.section}`}</span>
                                </div>
                                <div>
                                    <strong>Valor</strong>
                                    <span>{formatNumber(item.value)}</span>
                                </div>
                                <div>
                                    <strong>Responsável</strong>
                                    <span>{item.responsible}</span>
                                </div>
                                <div>
                                    <strong>Objeto</strong>
                                    <span>{item.object}</span>
                                </div>
                                <div>
                                    <strong>Tipo</strong>
                                    <span>{item.type}</span>
                                </div>
                                <div>
                                    <strong>ND</strong>
                                    <span>{item.nd}</span>
                                </div>
                            </div>
                            <div className="column-2">
                                <div>
                                    <strong>Plano Interno</strong>
                                    <span>{item.internalplane}</span>
                                </div>
                                <div>
                                    <strong>Nota de Empenho</strong>
                                    <span>{item.noempenho}</span>
                                </div>
                                <div>
                                    <strong>Liquidação</strong>
                                    <span>{item.noliquid}</span>
                                </div>
                                <div>
                                    <strong>Pagamento</strong>
                                    <span>{item.nopayment}</span>
                                </div>
                                <div>
                                    <strong>Local Atual</strong>
                                    <span>{item.locale}</span>
                                </div>
                                <div>
                                    <strong>Entregue no Sup doc</strong>
                                    <span>{item.supdoc}</span>
                                </div>
                            </div>
                            {item.status === 'Aguardando' && (
                                <Status waiting>
                                    <div>
                                        <strong>
                                            {item.status}
                                        </strong>
                                    </div>
                                </Status>
                            )}
                            {item.status === 'Empenhado' && (
                                <Status empenhado>
                                    <div>
                                        <strong>
                                            {item.status}
                                        </strong>
                                    </div>
                                </Status>
                            )}
                            {item.status === 'Liquidado' && (
                                <Status liquidado>
                                    <div>
                                        <strong>
                                            {item.status}
                                        </strong>
                                    </div>
                                </Status>
                            )}
                            {item.status === 'Pago' && (
                                <Status pago>
                                    <div>
                                        <strong>
                                            {item.status}
                                        </strong>
                                    </div>
                                </Status>
                            )}
                        </Informations>

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <a className="ancor-button" href={`/requisitions/empenho/${item._id}`}>Inserir Empenho</a>
                        <a className="ancor-button" href={`/requisitions/payment/${item._id}`}>Inserir Liquidação/Pagamento</a>
                    </div>
                    </>
                    ))}
                </ContainerWindow>
            </ContainerContent>
        </ContainerBackground >
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;

    return {
        props: {
            id,
        }
    }
}