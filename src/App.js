import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [inputText,setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleChangeInputText = (e) => {
    console.log(e.target.value)
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[...todos,inputText]");
    console.log([...todos,inputText]);
    setTodos([...todos,inputText]);
    setInputText('');
  }

  const handleClickDelete = (el) => {
    // console.log('削除！');
    setTodos(prevTodos => {
      return prevTodos.filter(eachTodo => eachTodo !== el);
    });
  };

  const handleClickDone = (el) => {
    handleClickDelete(el);
    setDoneList([...doneList,el]);
  };

  const handleClickReturn = (el) => {
    setDoneList(prevDoneList => prevDoneList.filter(eachDone => eachDone !== el));
    setTodos(prevTodos => [...prevTodos,el]);
  }

  const handleClickDoneDelete = (el) => {
    setDoneList(prevDoneList => prevDoneList.filter(eachDone => eachDone !== el));
  };
  console.log("todos");
  console.log(todos);
  return (
    <div className="App h-screen w-screen tex-center flex flex-col">
      <h1 className='font-bold my-5 mb-10'>TodoApp</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col mb-10 mx-auto text-center justify-center'>
          <input value={inputText} placeholder='input todo...' type="text" onChange={(e)=> handleChangeInputText(e)} className='md:w-1/2 w-[98%] m-auto p-5 border text-center h-10 border-solid border-cyan-950 rounded-full'/>
          <button type="submit"className='border border-solis mt-5 h-[40px]  w-[300px] m-auto bg-black text-white rounded-full'>追加する</button>
        </div>
        <p>やることリスト:</p>
        { todos.length ?
          <div className='mx-auto sm:w-1/2 px-10 mb-5'>
            <ul>
              {
                todos.map((eachTodo,index) => {
                  return (
                    <li key={index} className='flex w-full justify-between'>
                      {eachTodo}
                      <div className='flex'>
                        <p className='rounded-full w-14 border-2 border-solid  ml-10' onClick={()=> handleClickDelete(eachTodo)}>削除</p>
                        <p className='rounded-full w-14 border-2 border-solid  ml-5' onClick={()=> handleClickDone(eachTodo)}>完了</p>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          :
          <p className='mb-5'>特になし</p>
        }
        <p>完了リスト:</p>
        { doneList.length ?
        <div className='mx-auto sm:w-1/2 px-10 mb-5'>
          <ul>
            {
              doneList.map(eachDone => {
                return (
                  <li className='flex justify-between'>
                    {eachDone}
                    <div className='flex'>
                      <p className='rounded-full w-14 border-2 border-solid  ml-10' onClick={()=> handleClickDoneDelete(eachDone)}>削除</p>
                      <p className='rounded-full w-14 border-2 border-solid  ml-5' onClick={()=> handleClickReturn(eachDone)}>戻す</p>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
        :
        <p>まだ無し</p>
        }
      </form>
    </div>
  );
}

export default App;
