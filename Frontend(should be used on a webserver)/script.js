
        const apiUrl = "http://localhost:8081/users";

        async function fetchUsers() {
            const response = await fetch(apiUrl);
            const users = await response.json();
            const tableBody = document.getElementById("userTableBody");
            tableBody.innerHTML = "";
            users.forEach(user => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="updateUser(${user.id})">Update</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>`;
            });
        }

        async function addUser() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email })
            });
            fetchUsers();
        }

        async function updateUser(id) {
            const name = prompt("Enter new name:");
            const email = prompt("Enter new email:");
            await fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email })
            });
            fetchUsers();
        }

        async function deleteUser(id) {
            await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            fetchUsers();
        }
    
