import { useState, useEffect } from 'react';

function User() {
    const[users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index); // Видаляємо користувача за індексом
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Оновлюємо localStorage
    };

    return (
        <div>
            <h1>Users</h1>
            <div>
                <div>Filter</div>
                <button>addUser</button>
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
                    {users.map((user, index)=>(
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

        </div>
    )
}

export default User