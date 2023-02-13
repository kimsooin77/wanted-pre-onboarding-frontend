import React from "react";
import { TodoListItemProps } from "../pages/Todo";

interface Props {
    todoItem : TodoListItemProps;
    setTodoList : React.Dispatch<React.SetStateAction<TodoListItemProps[]>>;
}

const TodoListItem = ({todoItem, setTodoList} : Props) => {
    return(
        <div></div>

    )
}

export default TodoListItem;