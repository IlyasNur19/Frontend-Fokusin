import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <div className="space-y-4">
      <SortableContext items={todos.map(todo => todo._id)} strategy={verticalListSortingStrategy}>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </SortableContext>
    </div>
  );
};

export default TodoList;