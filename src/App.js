import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"

export default function App() {

    const [session, setSession] = useState([]);
    const [seats, setSeats] = useState([]);

    const [userCPF, setUserCPF]= useState("");
    const [userName, setUserName]= useState("");

    const [seatID, setSeatID]= useState("");
    const [seatName, setSeatName]= useState([]);

    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
           <Routes>
           <Route path="/" element={ <HomePage />}/>
           <Route path="/sessoes/:idFilme" element={<SessionsPage />  }/>

           <Route path="/assentos/:idSessao" element={<SeatsPage session={session} 
           setSession={setSession} seats={seats} setSeats={setSeats} userCPF={userCPF}
           setUserCPF={setUserCPF} userName={userName} setUserName={setUserName}
           seatID={seatID} setSeatID={setSeatID} seatName={seatName} setSeatName={setSeatName}/>}/>

           <Route path="/sucesso" element={<SuccessPage session={session} userCPF={userCPF} 
           setUserCPF={setUserCPF} userName={userName} setUserName={setUserName} 
           setSeatName={setSeatName} seatName={seatName}/> }/>
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
