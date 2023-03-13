import styled from "styled-components"

import axios from "axios"

import { useEffect} from "react"

import { useParams, useNavigate } from "react-router-dom"

import Seat from "./Seat"

export default function SeatsPage({session, setSession, seats, setSeats, userCPF, setUserCPF, userName, setUserName ,
seatID, setSeatID, seatName, setSeatName}) {

    const { idSessao } = useParams();
    // const [session, setSession] = useState([]);
    // const [seats, setSeats] = useState([]);

    // const [userCPF, setUserCPF]= useState("");
    // const [userName, setUserName]= useState("");

    // const [seatID, setSeatID]= useState("")

    const navigate= useNavigate();

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
    console.log(seatID)
    console.log(seatName)

    function submitSeat(event){

        event.preventDefault();

        const request= axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",{
            ids: seatID,
            name: userName,
            cpf: userCPF,
        })
        request.then(() => navigate("/sucesso")) 

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((se) =><Seat se={se} key={se.id}
                  seatID={seatID} setSeatID={setSeatID} seatName={seatName}
                  setSeatName={setSeatName} />  )}

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

            <FormContainer onSubmit={submitSeat}>
                Nome do Comprador:
                <input type="text" value={userName} onChange={e=> setUserName(e.target.value)}
                 placeholder="Digite seu nome..." required data-test="client-name"/>

                CPF do Comprador:
                <input type="text" value={userCPF} onChange={e=> setUserCPF(e.target.value)}
                placeholder="Digite seu CPF..." required  data-test="client-cpf"/>

                <button type="submit"  data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
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