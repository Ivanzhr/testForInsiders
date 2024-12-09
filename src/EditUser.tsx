import { useState, useEffect } from 'react';
import './EditUsers.css';

function EditUser() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [countries, setCountries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [btn, setBtn] = useState(false);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const storageCountries = JSON.parse(localStorage.getItem('countries')) || [];
        const storageDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        const storageStatuses = JSON.parse(localStorage.getItem('statuses')) || [];
        setUsers(storedUsers);
        setCountries(storageCountries);
        setDepartments(storageDepartments);
        setStatuses(storageStatuses);
    }, []);

    useEffect(() => {
        if (users.length > 0 && !selectedUser) {
            setSelectedUser(users[0]);
        }
    }, [users, selectedUser]);
    

    const selectUser = (userName) => {
        const user = users.find((elem) => elem.name === userName);
        setSelectedUser(user || null);
        console.log(selectedUser)
    };

    const update = () => {
        const updatedUsers = users.map(elem => {
            if (elem.name === selectedUser.name) {
                return {
                    ...elem,
                    department: selectedUser.department,
                    country: selectedUser.country,
                    status: selectedUser.status
                };
            }
            return elem;
        });
        setUsers(updatedUsers);
    
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const resetDate = ()=> {
        setSelectedUser(null)
    }

    return (
        <div className='wrepper'>
            <h1>EDIT USER</h1>
            <label>User</label>
            <select name="users"
                value={selectedUser ? selectedUser.name : ''}
                onChange={(e) => selectUser(e.target.value)}>
                {users.map((elem, index) => (
                    <option key={index} value={elem.name}>
                        {elem.name}
                    </option>
                ))}
            </select>
            {selectedUser && (
                <>
                    <h2>User Information</h2>
                    <div className="editUser">
                        <label>Full Name</label>
                        <input type="text" value={selectedUser.name}/>

                        <label>Department</label>
                        <select name="departments" value={selectedUser.department.value} onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            setSelectedUser({
                                ...selectedUser,
                                department: {
                                    name: selectedOption.text,
                                    value: e.target.value
                                }
                            });
                            setBtn(true)
                        }}>
                            {departments.map((elem, index) => (
                                <option key={index} value={elem.value}>
                                    {elem.name}
                                </option>
                            ))}
                        </select>

                        <label>Country</label>
                        <select name="countries" value={selectedUser.country.value} onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            setSelectedUser({
                                ...selectedUser,
                                country: {
                                    name: selectedOption.text,
                                    value: e.target.value
                                }
                            });
                            setBtn(true)
                        }}>
                            {countries.map((elem, index) => (
                                <option key={index} value={elem.value}>
                                    {elem.name}
                                </option>
                            ))}
                        </select>

                        <label>Status</label>
                        <select name="statuses" value={selectedUser.status.value} onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            setSelectedUser({
                                ...selectedUser,
                                status: {
                                    name: selectedOption.text,
                                    value: e.target.value
                                }
                            });
                            setBtn(true)
                        }}>
                            {statuses.map((elem, index) => (
                                <option key={index} value={elem.value}>
                                    {elem.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}
            <div className='btn'>
                <button disabled={!btn} onClick={resetDate}>Undo</button>
                <button disabled={!btn} onClick={update}>Save</button>
            </div>
        </div>
    )
}

export default EditUser