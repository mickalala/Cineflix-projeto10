import styled from "styled-components";

import { useState } from "react";

export default function Seat({ se, seatID, setSeatID, seatName, setSeatName }) {

    const [selected, setSelected] = useState(false)
   
    function select(ses) {

        if (ses.isAvailable === false) {
            alert("Esse assento não está disponível")
            return
        }
        setSelected(!selected)
        const newSeatID = [...seatID,ses.id]
        const newSeatName=[...seatName, ses.name]
        if(seatID.includes(ses.id)){
            const idic= seatID.indexOf(ses.id)
            const idic2= seatName.indexOf(ses.name)

            seatID.splice(idic,1)
            seatName.splice(idic2,1)

            setSeatName(seatName)
            setSeatID(seatID)
            return
        }
           setSeatName(newSeatName)
           setSeatID(newSeatID)
    }

    return (
        <SeatItem available={se.isAvailable} key={se.id} onClick={() => select(se)}
            selected={selected} data-test="seat">
            {se.name}
        </SeatItem>
    )
}

const SeatItem = styled.div`
    border:  ${(props) => (props.available) ? "1px solid #808F9D" : " 1px solid #F7C52B"};  
    border:  ${(props) => (props.selected) ? "1px solid #0E7D71" : ""};         // Essa cor deve mudar
    background-color:${(props) => (props.available) ? "lightblue" : "#FBE192"};    // Essa cor deve mudar
    background-color:${(props) => (props.selected) ? "#1AAE9E" : ""};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`