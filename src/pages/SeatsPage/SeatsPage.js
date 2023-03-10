import styled from "styled-components"

import axios from "axios"

import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import Seat from "./Seat"

export default function SeatsPage() {

    const { idSessao } = useParams();
    const [session, setSession] = useState([]);
    const [seats, setSeats] = useState([]);



    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
        const promise = axios.get(url);

        promise.then((answer) => {
            setSession(answer.data);
            setSeats(answer.data.seats);
        }
        )
        promise.catch((err) =>
            console.log(err))
    }, [])

    if (session.length === 0) {
        return <p>Carregando...</p>
    }
    console.log(session);

    // function select(id){
    //     setSelected(true)
    //     console.log("id selecionado de assento:")
    //     console.log(id)
    // }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((se) =><Seat se={se} key={se.id}/>
                    // <SeatItem available={se.isAvailable} key={se.id} onClick={()=>select(se.id)}
                    // selected={selected} >
                    //     {se.name}
                    // </SeatItem>
                    )}

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle bColor={"#1AAE9E"} borderColor={"#0E7D71"}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle bColor={"#C3CFD9"} borderColor={"#7B8B99"}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle bColor={"#FBE192"} borderColor={"#F7C52B"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={session.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{session.day.weekday} - {session.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => (props.borderColor)};         // Essa cor deve mudar
    background-color:${(props) => (props.bColor) } ;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
// const SeatItem = styled.div`
//     border: 1px solid ${(props) => (props.available) ? "blue" : "#F7C52B"};         // Essa cor deve mudar
//     background-color:${(props) => (props.available) ? "lightblue" : "#FBE192"};    // Essa cor deve mudar
//     background-color:${(props)=> (props.selected)? "#1AAE9E" : ""};
//     height: 25px;
//     width: 25px;
//     border-radius: 25px;
//     font-family: 'Roboto';
//     font-size: 11px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 5px 3px;
// `
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`