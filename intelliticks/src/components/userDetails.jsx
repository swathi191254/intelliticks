import { useState, useRef, useEffect } from "react";

const inistate = {
    name : "",
    discription : "",
    size : "",
    
}

export const Userdetails = () => {
    const [ form, setForm ] = useState(inistate);
    const [ details, setDetails] = useState([])

    const fileref = useRef();

    useEffect(() => {
        getDetails();
    },[])

    const handleChange = (e) => {
        let { name, value,checked,type } = e.target
        value = type === "checkbox" ? checked : value;
        setForm((prev) => ({...prev,[name]:value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    }

    const postData = () => {
        const payload = {
            name:form.name,
            discription:form.discription,
            size:form.size            


            
        }
        fetch("https://mailchimpabc.herokuapp.com/data",{
            method:"POST",
            body : JSON.stringify(payload),
            headers: {
                "content-type":"application/json",
            }
        }).then(()=> {
            getDetails();
            setForm("")
        })
    }

    const getDetails = () => {
        fetch("https://mailchimpabc.herokuapp.com/data")
        .then(d => d.json())
        .then((res) => {
            setDetails(res)
        });
    }

    const {name,size,discription} = form;

    return (
        <>
        <div id="flex">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <br />
              <input name="name" value={name} onChange={handleChange} type="text" placeholder="Enter your name"/>  
              <br />
              <br />
              <label>discription</label>
              <br />
              <input name="discription" value={discription} onChange={handleChange} type="text" placeholder="Enter your discription"/>
              <br />
              <br />
              <label>Size</label> 
              <br />
              <input name="size" value={size} onChange={handleChange}  placeholder="Enter size"/>
              <br />
              <br />
              
              
             
              
              <input onClick={postData} id="submitbtn" type="submit" />  
            </form>

            <table>
                <tr>
                    <th>Name</th>
                    <th>Discription</th>
                    <th>Size</th>
                </tr>

                {details.map((e,i)=>
                    <tr key={i}>
                        <td>{e.name}</td>
                        <td>{e.discription}</td>
                        <td>{e.size}</td>
                    </tr>
                )}
            </table>
        </div>
        </>
    )
}

export default Userdetails;





