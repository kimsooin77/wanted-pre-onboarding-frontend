import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoListItem from "../component/TodoListItem";
import customAxios from "../utils/customAxios";

export interface TodoListItemProps {
    id : number;
    todo : string;
    isCompleted : boolean;
    userId : number;
}

const Todo = () => {
    const [todoList, setTodoList] = useState<TodoListItemProps[]>([]);
    const [todoInputValue, setTodoInputValue] = useState('');

    const onChangeTodoInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTodoInputValue(e.target.value);
    }

    const onSubmitTodoInput = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(todoInputValue) {
            try {
                const {data} = await customAxios.post('todos', {
                    todo : todoInputValue,
                });
                setTodoList([...todoList, data]);
                setTodoInputValue('');
            } catch (error) {
                console.log(error);
                localStorage.setItem('access_token', '');
            }
        }
    }

    // useEffect(() => {
    //     customAxios.get('todos').then(({data}) => {
    //         setTodoList(data);
    //     })
    // },[]);

    return(
        <TodoWrapper>
            <StyledTodoForm onSubmit={onSubmitTodoInput}>
                <TodoTitle>TODO LIST</TodoTitle>
                <StyledInputButtonWrapper>
                    <StyledTodoInput
                        type="text"
                        data-testid="new-todo-input"
                        value={todoInputValue}
                        onChange={onChangeTodoInput}
                    />
                    <StyledAddButton
                        data-testid="new-todo-add-button"
                    >ADD</StyledAddButton>
                </StyledInputButtonWrapper>
                

                <StyledTodoListWrapper>
                    {
                        todoList.map((todoItem) => {
                            return (
                                <TodoListItem 
                                    key={todoItem.id}
                                    todoItem={todoItem}
                                    setTodoList={setTodoList}
                                />
                            )
                        })
                    }
                </StyledTodoListWrapper>
            </StyledTodoForm>
        </TodoWrapper>
    )
}

export default Todo;

const TodoWrapper = styled.div`
    padding-top : 100px;
    padding-bottom : 100px;
    background : #F0F2F5;
    box-sizing: boder-box;
`;

const StyledTodoForm = styled.form`
    margin : 0 auto;
    padding : 30px 50px;
    border-radius : 10px / 10px;
    width : 400px;
    background : #86bcda;
    
`;

const TodoTitle = styled.h1`
    text-alingn : center;
    margin-top : 20px;
    font-size : 30px;
    color : #ffffff;
    letter-spacing : 1.2px;
`;

const StyledInputButtonWrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    border-bottom : 1px solid #ffff;
`;

const StyledTodoInput = styled.input`
    margin-bottom  : 30px;
    padding : 8px 15px;
    flex : 1;
    border : 1px solid #dcdcdc;
    box-sizing : border-box;
    vertical-align : middle;
    outline : none;
`;

const StyledAddButton = styled.button`
    margin-left : 35px;
    background: #9870da;
    border: none;
    padding: 10px;
    width : 48px;
    height : fit-content;
    color: #ffff;
`;

const StyledTodoListWrapper = styled.ul`
    margin-top : 30px;
`;