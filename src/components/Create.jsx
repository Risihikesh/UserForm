import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUser } from "../Redux/UserReducer";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


export default function Create() {

    const [name, setName] = useState('');
    const [lName, setLName] = useState('');//
    const [email, setEmail] = useState('');
    // const [code, setCode] = useState('');
    const [address, setAddress] = useState('');//
    const [address2, setAddress2] = useState('');//
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);
    const [countryid, setCountryid] = useState('');
    // const [countries, setCountries] = useState([]);
    const [stetes, setSat] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [states, setStates] = useState([]);

    const [zipcode, setZipCode] = useState('');


    const users = useSelector((state) => state.users)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser({ id: users[users.length - 1].id + 1, name, lName, email, address, address2, phoneNumber, valid, zipcode }));
        navigate('/')
    }

    const handleChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

        return phoneNumberPattern.test(phoneNumber);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'X-CSCAPI-KEY': 'NTNsTlhQdEtzN2pFcjhrbXdWcXZjbjBwYlJyUGZSRlZhT1U3d29lcw=='
                    }
                };

                const countriesResponse = await axios.get('https://api.countrystatecity.in/v1/countries', config);
                console.log(countriesResponse.data);
                setCountries(countriesResponse.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchData();
    }, []);

    const handleCountryChange = async (event) => {
        const countryCode = event.target.value;

        try {
            const statesConfig = {
                headers: {
                    'X-CSCAPI-KEY': 'NTNsTlhQdEtzN2pFcjhrbXdWcXZjbjBwYlJyUGZSRlZhT1U3d29lcw=='
                }
            };

            const statesResponse = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, statesConfig);
            console.log(statesResponse.data);
            setStates(statesResponse.data);

        } catch (error) {
            console.error('Error fetching states:', error);
        }

        setSelectedCountry(countryCode);
    };


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
                <form onSubmit={handleSubmit}>
                    <h3>Enter Details</h3>
                    <div>
                        <label htmlFor="name">First Name:</label>
                        <input type="text" name="name" className="form-control" placeholder="Enter Name"
                            onChange={e => setName(e.target.value)} />
                        <label htmlFor="lastname">Last Name:</label>
                        <input type="text" name="lastname" className="form-control" placeholder="Enter Last Name"
                            onChange={e => setLName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email"
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="mobile">Mobile No:</label>
                        <PhoneInput
                            country={'in'}
                            value={phoneNumber}
                            onChange={handleChange}
                            inputProps={{
                                required: true,
                            }}
                        />
                        {!valid && (
                            <p>Please enter a valid phone number.</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="address">Address1</label>
                        <input type="textarea" name="address" className="form-control" placeholder="Enter address"
                            onChange={e => setAddress(e.target.value)} />
                        <label htmlFor="address">Address2</label>
                        <input type="textarea" name="address" className="form-control" placeholder="Enter address"
                            onChange={e => setAddress2(e.target.value)} />
                    </div>
                    <div>
                        <label className="mb-2">Country</label>
                        <select className="form-control" onChange={handleCountryChange} value={selectedCountry}>
                            <option value="">Select a country</option>
                            {countries.map(country => (
                                <option key={country.iso2} value={country.iso2}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="mb-2">State</label>
                        <select className="form-control">
                            <option value="">Select a state</option>
                            {states.map(state => (
                                <option key={state.id} value={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="zipcode">Zipcode</label>
                        <input type="number" name="zipcode" className="form-control" placeholder="Enter Zipcode"
                            onChange={e => setZipCode(e.target.value)} />
                    </div>
                    <br></br><button className="btn btn-info">Submit</button>
                </form>
            </div>
        </div>
    )
}