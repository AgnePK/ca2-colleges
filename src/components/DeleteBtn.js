import { useState } from "react";
import axios from "../congif/api";

const DeleteBtn = ({id, resource, deleteCallback}) =>{
    const [isLoading, setIsLoading]= useState(false);
    const onDelete=()=>{
        setIsLoading(true);
        let token = localStorage.getItem("token")
        axios.delete(`/${resource}/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            console.log(response.data);
            deleteCallback(id)
        })
        .catch(err =>{
            console.log(err.response.data);
        })
    }
    return (
        <>
            <button onClick={onDelete} class="btn btn-small waves-effect waves-light red">
                {(isLoading)?("deleting..."):("Delete")}
            </button>
        </>
    )
}
export default DeleteBtn