import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initialData';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  state = initialData;
  onDragEnd = (res) => {
    const { destination, source, draggableId } = res;
    if(!destination) return;
    if(destination.droppableId===source.droppableId && destination.index===source.index) return;
    const currentCol = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(currentCol.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newCol = {
      ...currentCol,
      taskIds: newTaskIds
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newCol.id]: newCol 
      }
    };
    console.log(newState)
    this.setState(newState);
  };
  render() {
    return <DragDropContext onDragEnd={this.onDragEnd}>
      {this.state.columnOrder.map(columnId => {
      const column = this.state.columns[columnId];
      const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

      return <Column key={column.id} column={column} tasks={tasks} />;
    })}
    </DragDropContext>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));