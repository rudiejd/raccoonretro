import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid red;
    border-radius: 2px;
    padding: 4px;
    margin-bottom: 8px;
    background-color: white;
`;

export default class Note extends React.Component {
    render() {
        return <Container>
            {this.props.note.user} {this.props.note.text}
        </Container>
    }
}