import React from "react";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { deleteUser } from "../Redux/UserReducer";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Home(){
    const users = useSelector((state)=> state.users);
    
    const dispatch = useDispatch();
    const handleDelete = (id) =>{
        dispatch(deleteUser({id:id}))
    }
    console.log(users)
    return(
        <div className='container'>
            <h2> User Data</h2>
            <Link to="/create" className='btn btn-success my-3'>create</Link>
            <table className='table'>
                <thead className="thead-dark">
                    <tr>
                        {/* <th >ID</th> */}
                        <th >Name</th>
                        <th >Email</th>
                        <th> Mobile No</th>
                        <th >Address</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>(
                        <tr key={index}>
                            {/* <td>{user.id}</td> */}
                            <td>{user.name} {user.lName}</td>
                            <td>{user.email}</td>
                            <td>+ {user.code} {user.phoneNumber}</td>
                            <td>{user.address} {user.address2}</td>
                            <td>{user.countries}</td>
                            <td>{user.states}</td>
                            <td>{user.zipcode}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Edit</Link >
                                <button onClick={()=> handleDelete(user.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}