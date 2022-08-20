import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import initialData from './initial-data';
import reportWebVitals from './reportWebVitals';
import Column from './column';
import Note from './note';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
display: flex;`;

const root = ReactDOM.createRoot(document.getElementById('root'));
class App extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    // if the drop is cancelled, or the drop goes to the same position, do nothing
    if (!destination || 
      (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    if (start == finish) {
                 
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      
      const newColumn = {
        ...start,
        cardIds: newCardIds
      }

      
      const newState = {
        ...this.state,
        columns: {
          ...this.state.starts,
          [newColumn.id]: newColumn,
        }
      }
      this.setState(newState);
    } else {
      const startCardIds = Array.from(start.cardIds);
      startCardIds.splice(source.index, 1);
      const newStart = {
        ...start,
        cardIds: startCardIds
      }

      const finishCardIds = Array.from(finish.cardIds);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        cardIds: finishCardIds
      }
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
      this.setState(newState);
    }
  }

  render() {
    return (
      <Container>
         <Container>
          {this.state.notes.map((note) => {
            return <Note key={note.key} note={note}/>;
          })}
          
        </Container> 
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container>
            {this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const cards = column.cardIds.map(cardId => this.state.cards[cardId]);

              return <Column key={column.id} column={column} cards={cards} />;
            })}
          </Container>
      </DragDropContext>
      </Container>
    );
    }

}
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
