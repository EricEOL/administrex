import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import styled, { css } from 'styled-components';
import api from '../../../config/api';
import { ContainerBackground } from '../../../components/ContainerBackground';
import Menu from '../../../components/Menu';
import { ContainerContent } from '../../../components/ContainerContent';
import { ContainerWindow } from '../../../components/ContainerWindow';

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;

    div {
        text-align: center;
        margin-bottom: 20px;

        label {
            display: block;
            font-size: 14px;
            font-weight: 700;
        }

        input {
            width: 300px;
            height: 30px;
            outline: none;
            border: 1px solid #DDE1E4;
            transition: 0.2s;
            text-align: center;
                
            &:focus {
                border: 2px solid #0B8BD5;
            }
        }
    }

    .input-radio {
        display: flex;
        justify-content: space-evenly;

        input {
            width: 100px;
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
        transition: 0.2s;
        margin-top: 20px;

        &:hover {
            background: #064C74;
        }
    }

    .notice-error {
        margin-top: 20px;
        font-size: 12px;
        color: red;
        font-weight: 700;
    }

    .notice-ok {
        margin-top: 20px;
        font-size: 12px;
        color: green;
        font-weight: 700;
    }
`;

export default function EditProcessPayment({ id, numberSection }) {

    const { isAuthenticated } = useAuth();
    const [nsLiquidPay, setNsLiquidPay] = useState();
    const [optionLiquidPay, setOptionLiquidPay] = useState();
    const [error, setError] = useState();
    const [noticeSending, setNoticeSending] = useState();

    useEffect(() => {
        isAuthenticated();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await api.put('/requisition/updateliquidpay',
                {
                    id,
                    ns: nsLiquidPay,
                    option: optionLiquidPay,
                },
                {
                    headers: {
                        'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                    }
                });

            setNoticeSending(response.data);

        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <ContainerBackground>
            <Menu />
            <ContainerContent>
                <ContainerWindow>
                    <h2>Inserir Liquidação ou Pagamento</h2>
                    <h3>{numberSection}</h3>
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>NS Liquidação ou Pagamento</label>
                            <input type="text" onChange={(event) => {
                                setError('');
                                setNoticeSending('');
                                setNsLiquidPay(event.target.value);
                            }} />
                        </div>
                        <div className="input-radio">
                            <div>
                                <input 
                                    type="radio" 
                                    id="liquid" 
                                    value="liquid" 
                                    name="liquidpay" 
                                    onClick={(event)=> {
                                        setOptionLiquidPay(event.target.value);
                                    }}/>
                                <label htmlFor="liquid">Liquidação</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    id="payment" 
                                    value="payment" 
                                    name="liquidpay" 
                                    onClick={(event)=> {
                                        setOptionLiquidPay(event.target.value);
                                    }}/>
                                <label htmlFor="payment">Pagamento</label>
                            </div>
                        </div>
                        <button type="submit">Inserir informações</button>

                        {error && (
                            <p className="notice-error">{error}</p>
                        )}
                        {noticeSending && (
                            <p className="notice-ok">{noticeSending}</p>
                        )}

                    </Form>
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