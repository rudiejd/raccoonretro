import React from 'react'
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Card from './card'

const Container = styled.div`
    width: 300px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const CardList = styled.div`
    padding:8px;
    flex-grow: 1;
    min-height: 100px;
`;

export default class Column extends React.Component {
    render() {
        return <Container>
            <Title>{this.props.column.title}</Title>
            <Droppable droppableId={this.props.column.id}>
                {provided => (
                    <CardList
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {this.props.cards.map((card, index) => <Card key={card.id} card={card} index={index}/>)}
                        {provided.placeholder}
                    </CardList>
                )}
            </Droppable>
        </Container>
    }
}