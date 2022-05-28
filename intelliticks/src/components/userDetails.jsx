import React from "react";

import {useState, useRef, useEffect} from "react";

const initstate = {
    name : "",
    age : "",
    address : "",
    department : "",
    salary : "",
    isMarried : "",
    profilepic : "",
}
export const Userdetails = () => {

    const [ form, setForm] = useState(initstate);
    const [details, setDetails] = useState([]);
    const fileref = useRef();


    useEffect(() => {
        getDetails();
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    const handleChange = (e) => {
        let {name,value,type,checked} = e.target;
        value = type === "checkbox" ? checked : value;
        setForm((prev) => ({...prev,[name]:value}))
    }

    const postData = () => {

        const payload = {
            name : form.name,
            age : form.age,
            address : form.address,
            salary : form.salary,
            department : form.department,
            isMarried : form.isMarried,
            
            status: false,
        };

        fetch("",{
            method : "POST",
            body : JSON.stringify(payload),
            headers : {
                "content-type" : "application/json",
            },
        })
        .then(() => {
            getDetails();
            setForm("")
        })
    }

    const getDetails = () => {
        fetch("http://localhost:3005/users")
        .then((d) => d.json())
        .then((res) => {
            setDetails(res)
        })
    }

    const handleClickDelete = (i) => {
        let result = details.filter((user,index) => index!==i)
        setDetails(result);
    }

    const {name,age,address,salary,isMarried,department}=form;

    return (
        <div id="flex">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br/>
                <input type="text" placeholder="eneter the name" value={name} name="name" onChange={handleChange} />
                <br/>
                <bt/>
                <label>Age</label>
                <br />
                <input type="number" placeholder="eneter your age" value={age} name="age" onChange={handleChange} />
                <br />
                <br />
                <label>Address</label>
                <br />
                <input type="text" placeholder="eneter your address" value={address} name="address" onChange={handleChange} />
                <br />
                <br />
                <button type="button" id="submitbtn" onClick={postData}>submit</button>
                
            </form>
            <table>
                <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                
                </tr>
                {details.map((e,i) => 
                <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.age}</td>
                    <td>{e.address}</td> 
                   
                    <button onClick={() => handleClickDelete(i)}>Delete</button>
                </tr>
                )}
            </table>
        </div>
    )
}

export default Userdetails;