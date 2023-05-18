import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard/index";
import "./App.css";
function App() {
  const [error, setError] = useState({});
  const [userData, setUserData] = useState([]);

  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  useEffect(() => {
    performApiCall();
  }, []);

  const performApiCall = async () => {
    try {
      const response = await axios.get(API_URL);
      response.data = response.data.map((user) => ({
        ...user,
        visible: true,
        checked: false,
        edit: false,
        deleted: false,
      }));
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    const temp = [...userData];
    const data = temp.map((user) => {
      if (
        user.name.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      ) {
        return { ...user, visible: true };
      } else {
        return { ...user, visible: false };
      }
    });
    setUserData(data);
  };

  const handleDelete = (id) => {
    const temp = [...userData];
    const data = temp.map((user) => {
      if (user.id === id) {
        return { ...user, deleted: true };
      }
      return user;
    });
    setUserData(data);
  };

  const deleteAll = (items) => {
    const data = [...userData];
    data.forEach((user) =>
      items.forEach((item) => {
        if (item.id === user.id && item.checked) {
          user.deleted = true;
        }
      })
    );
    setUserData(data);
  };

  const handleSelect = (event, user) => {
    const temp = [...userData];
    const index = temp.indexOf(user);
    const current = event.target;
    if (current.checked) {
      temp[index].checked = true;
    } else {
      temp[index].checked = false;
    }
    setUserData(temp);
  };

  const handleSelectAll = (event, items) => {
    const current = event.target;
    const temp = [...userData];

    if (current.checked) {
      temp.forEach((userData) => {
        items.forEach((item) => {
          if (item.id === userData.id) {
            userData.checked = true;
          }
        });
      });
    } else {
      temp.forEach((userData) => {
        items.forEach((item) => {
          if (item.id === userData.id) {
            userData.checked = false;
          }
        });
      });
    }
    setUserData(temp);
  };

  const handleEdit = (user) => {
    const temp = [...userData];
    const index = temp.indexOf(user);
    temp[index].edit = true;
    setUserData(temp);
  };

  const handleValueEdit = (user, editValue) => {
    const temp = [...userData];
    const index = temp.indexOf(user);
    if (editValue["name"]) {
      temp[index].name = editValue.name;
    }
    if (editValue["email"]) {
      temp[index].email = editValue.email;
    }
    if (editValue["role"]) {
      temp[index].role = editValue.role;
    }

    temp[index].edit = false;
    setUserData(temp);
  };

  return (
    <div className="App">
      {error.message && <h1>{error.message}</h1>}
      {userData.length !== 0 && (
        <Dashboard
          userData={userData}
          onDelete={handleDelete}
          onSelect={handleSelect}
          deleteAll={deleteAll}
          onSelectAll={handleSelectAll}
          onEdit={handleEdit}
          onEditValues={handleValueEdit}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}

export default App;
