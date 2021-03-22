import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import {useRouter} from 'next/router';
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

export default function EditProcessEmpenho({ id, numberSection }) {

    const {isAuthenticated} = useAuth();
    const route = useRouter();
    const [empenho, setEmpenho] = useState();
    const [pi, setPi] = useState();
    const [error, setError] = useState();
    const [noticeSending, setNoticeSending] = useState();

    useEffect(() => {
        isAuthenticated();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await api.put('/requisition/updateempenho',
                {
                    id,
                    empenho,
                    pi,
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
                    <h2>Inserir Empenho e Plano Interno</h2>
                    <button className="back-button" onClick={() => route.push(`/requisitions/${id}`)}>Voltar</button>
                    <h3>{numberSection}</h3>
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Nota de Empenho</label>
                            <input type="text" onChange={(event) => {
                                setError('');
                                setNoticeSending('');
                                setEmpenho(event.target.value);
                            }} />
                        </div>
                        <div>
                            <label>Plano Interno</label>
                            <input type="text" onChange={(event) => {
                                setError('');
                                setNoticeSending('');
                                setPi(event.target.value);
                            }} />
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