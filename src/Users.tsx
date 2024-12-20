import './Users.css';
import { useState, useEffect } from 'react';

function User() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: '',
        department: { name: '', value: '' },
        country: { name: '', value: '' },
        status: { name: '', value: '' },
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countries, setCountries] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [filters, setFilters] = useState({
        department: '',
        country: '',
        status: ''
    });

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
        const storageCountries = JSON.parse(localStorage.getItem('countries')) || [];
        const storageDepartments = JSON.parse(localStorage.getItem('departments')) || [];
        const storageStatuses = JSON.parse(localStorage.getItem('statuses')) || [];
        setCountries(storageCountries);
        setDepartments(storageDepartments);
        setStatuses(storageStatuses);
    }, [isModalOpen]);

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleAddUser = () => {
        if (newUser.name) {
            setUsers([...users, newUser]);
            localStorage.setItem('users', JSON.stringify([...users, newUser]));
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const filterUsers = (e, type) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: e.target.value
        }));
    };

    const filteredUsers = users.filter((user) => {
        return (
            (filters.department ? user.department.value === filters.department : true) &&
            (filters.country ? user.country.value === filters.country : true) &&
            (filters.status ? user.status.value === filters.status : true)
        );
    });

    return (
        <div>
            <h1>Users</h1>
            <div className="top">
                <div className="filter">
                    <select onChange={(e) => filterUsers(e, 'department')}>
                        <option value="">Select department</option>
                        {departments.map((dep, index) => (
                            <option key={index} value={dep.value}>{dep.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => filterUsers(e, 'country')}>
                        <option value="">Select country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.value}>{country.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => filterUsers(e, 'status')}>
                        <option value="">Select status</option>
                        {statuses.map((status, index) => (
                            <option key={index} value={status.value}>{status.name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={() => setIsModalOpen(true)}>Add User</button>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Country</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.department.name}</td>
                            <td>{user.country.name}</td>
                            <td>{user.status.name}</td>
                            <td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <div className="modal">
                    <h2>ADD USER</h2>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="Full Name"
                    />

                    <label>Department</label>
                    <select
                        name="department"
                        value={newUser.department.value}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                department: { name: e.target.options[e.target.selectedIndex].text, value: e.target.value }
                            })
                        }
                    >
                        <option value="">Select department</option>
                        {departments.map((dep, index) => (
                            <option key={index} value={dep.value}>{dep.name}</option>
                        ))}
                    </select>

                    <label>Country</label>
                    <select
                        name="country"
                        value={newUser.country.value}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                country: { name: e.target.options[e.target.selectedIndex].text, value: e.target.value }
                            })
                        }
                    >
                        <option value="">Select country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.value}>{country.name}</option>
                        ))}
                    </select>

                    <label>Status</label>
                    <select
                        name="status"
                        value={newUser.status.value}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                status: { name: e.target.options[e.target.selectedIndex].text, value: e.target.value }
                            })
                        }
                    >
                        <option value="">Select status</option>
                        {statuses.map((status, index) => (
                            <option key={index} value={status.value}>{status.name}</option>
                        ))}
                    </select>

                    <div>
                        <button onClick={handleAddUser}>Add</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
