import { useEffect, useState } from 'react';

export function Users() {

    const [userData, setuserData] = useState([])

    useEffect(() => {
        const apiUrl = `/users`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setuserData(data)
            });
    }, []);

    return (
        <div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((val, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
