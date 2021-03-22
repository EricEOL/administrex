import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import styled from 'styled-components';
import api from '../../config/api';
import { ContainerBackground } from '../../components/ContainerBackground';
import Menu from '../../components/Menu';
import { ContainerContent } from '../../components/ContainerContent';
import { ContainerWindow } from '../../components/ContainerWindow';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

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
    
    .form-divisions {
        display: flex;

        .form-inputs {
            display: flex;
            flex-direction: column;
            padding: 50px;

            > div {
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
                
                    &:focus {
                        border: 2px solid #0B8BD5;
                    }
                }
            }


        }
    }
`;

export default function RegisterRequisition() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        isAuthenticated();
    }, [])

    const [noticeSending, setNoticeSending ] = useState();
    const [error, setError] = useState();
    const [number, setNumber] = useState();
    const [section, setSection] = useState();
    const [responsible, setResponsible] = useState();
    const [type, setType] = useState();
    const [value, setValue] = useState();
    const [object, setObject] = useState();

    async function handleSubmit(event) {

        event.preventDefault();
        
        setNoticeSending('');
        setError('');

        try {
            const response = await api.post('/requisition/register', 
                {
                    number,
                    section,
                    responsible,
                    type,
                    value,
                    object,
                } 
                ,
                {
                    headers: {
                        'authorization-token': localStorage.getItem("@Sistem_mar21:token"),
                    }
                }
            );

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
                    <h2>Registrar nova requisição</h2>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-divisions">
                            <div className="form-inputs">
                                <div>
                                    <label>Nº</label>
                                    <input type="text" name="number" onChange={(event) => setNumber(event.target.value)} />
                                </div>
                                <div>
                                    <label>Responsável</label>
                                    <input type="text" name="responsible" onChange={(event) => setResponsible(event.target.value)} />
                                </div>
                                <div>
                                    <label>Valor</label>
                                    <input type="number" step=".01" name="value" onChange={(event) => setValue(event.target.value)} />
                                </div>
                            </div>
                            <div className="form-inputs">
                                <div>
                                    <label>Seção</label>
                                    <input type="text" name="section" onChange={(event) => setSection(event.target.value)} />
                                </div>
                                <div>
                                    <label>Tipo</label>
                                    <input type="text" name="type" onChange={(event) => setType(event.target.value)} />
                                </div>
                                <div>
                                    <label>Objeto</label>
                                    <input type="text" name="object" onChange={(event) => setObject(event.target.value)} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" >Registrar</button>
                        
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