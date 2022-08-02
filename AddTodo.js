
import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
    const[data,setData] = useState({
       title: "",
       desc: "" 
    });
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    const submit = async (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc);
            setTitle("");
            setDesc("");
            try{
                const response = await fetch("https://v1.nocodeapi.com/rahul198kash/google_sheets/anrFkfhxwetjuefg?tabId=Sheet1",{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([[title,desc,new Date().toLocaleString()],
                ]),
                }
                );
                await response.json();
                setData({...data,title:"",desc:""});
            } catch (err){
                console.log(err)
            }
        };
    }
    return (
        <div className="container my-3">
            <h3>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  className="form-control" id="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    )
}
