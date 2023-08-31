import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../Redux/UserReducer";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';



export default function Update(){

    const {id} = useParams();
    const users = useSelector((state)=> state.users);
    const existingUser= users.filter(f => f.id == id);
    const {name, lName, email, address, address2, phoneNumber,zipcode} = existingUser[0];
    const [uname, setName] = useState(name);
    const [uLName, setULName]= useState(lName);//
    const [uemail, setEmail] = useState(email);
    const [uphoneNumber, setPhoneNumber] = useState(phoneNumber);
    const [uaddress, setAddress] = useState(address);//
    const [uaddress2, setAddress2] = useState(address2);//

    const [uzipcode, setZipCode] = useState(name)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleUpdate =(event)=>{
        event.preventDefault();
        dispatch(updateUser({
            id:id,
            name: uname,
            lName: uLName,
            email: uemail,
            phoneNumber: uphoneNumber,
            address: uaddress,
            address2: uaddress2,
            zipcode: uzipcode,
        }));
        navigate('/')
    }

    const handleChange = (value) => {
        // Validate the phone number format
        if (validatePhoneNumber(value)) {
            setPhoneNumber(value);
        } else {
            // Handle invalid phone number
            setPhoneNumber('');
            // You might want to show an error message to the user here
            {!valid && (
                <p>Please enter a valid phone number.</p>
            )}
        }
    };
    
    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
        return phoneNumberPattern.test(phoneNumber);
    };
    


    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Update Details</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">First Name:</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter First Name" 
                     value={uname} onChange={e=> setName(e.target.value)}/>
                     <label htmlFor="name">Last Name:</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter Last Name" 
                     value={uLName} onChange={e=> setULName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter Email" 
                     value={uemail} onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div>
                        <label htmlFor="mobile">Mobile No:</label>
                        <PhoneInput
                            country={'in'}
                            
                            onChange={handleChange}
                         
                        />
                        
                    </div>
                <div>
                        <label htmlFor="address">Address1</label>
                        <input type="textarea" name="address" className="form-control" placeholder="Enter address" 
                         value={uaddress} onChange={e=> setAddress(e.target.value)}/>
                         <label htmlFor="address">Address2</label>
                        <input type="textarea" name="address" className="form-control" placeholder="Enter address" 
                         value={uaddress2} onChange={e=> setAddress2(e.target.value)}/>
                    </div>

                    <div>
                    <label htmlFor="email">Zipcode</label>
                    <input type="number" name="zipcode" className="form-control" placeholder="Enter zipcode" 
                     value={uzipcode} onChange={e=> setZipCode(e.target.value)}/>
                    </div>
                 <br/>
                <button className="btn btn-info">Update</button>
            </form>
        </div>
    </div>
    )
}