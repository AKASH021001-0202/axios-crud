import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const deleteUser = (userId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the field is nested
    if (name.includes(".")) {
      // For nested fields
      const fieldNames = name.split(".");
      let updatedFormData = { ...formData };
      let currentLevel = updatedFormData;
      for (let i = 0; i < fieldNames.length - 1; i++) {
        currentLevel = currentLevel[fieldNames[i]];
      }
      currentLevel[fieldNames[fieldNames.length - 1]] = value;
      setFormData(updatedFormData);
    } else {
      // For non-nested fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing user
      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${editingUserId}`,
          formData
        )
        .then((res) => {
          setUsers(
            users.map((user) => (user.id === editingUserId ? formData : user))
          );
          setFormData({
            name: "",
            username: "",
            email: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
              geo: {
                lat: "",
                lng: "",
              },
            },
            phone: "",
            website: "",
            company: {
              name: "",
              catchPhrase: "",
              bs: "",
            },
          });
          alert("Updated Sucessfully")
          handleCloseModal()
          setEditMode(false);
          setEditingUserId(null);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      // Add new user
      axios
        .post("https://jsonplaceholder.typicode.com/users", formData)
        .then((res) => {
          setUsers([...users, res.data]);
          setFormData({
            name: "",
            username: "",
            email: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
              geo: {
                lat: "",
                lng: "",
              },
            },
            phone: "",
            website: "",
            company: {
              name: "",
              catchPhrase: "",
              bs: "",
            },
          });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditMode(true);
    setEditingUserId(user.id);
    handleShowModal();
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    // Set showModal to false when closing the modal
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <section className="bg-sec">

    <div className="container p-5">
      <div className="num d-flex justify-content-between align-content-lg-center">
        <h3>Data</h3>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShowModal}
        >
          <i class="bi bi-plus"></i>ADD DATA
        </button>

        {showModal && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
            onClick={handleCloseModal}
          >
            <div
              className="modal-dialog modal-lg"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header d-flex justify-content-between">
                  <h5 className="modal-title" id="exampleModalLabel">
                  {editMode ? "Edit User" : "Add New User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  >
                   
                  </button>
                </div>
                <div className="px-5 py-3">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 form-group">
                        <label>Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Username:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={formData.username}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className=" col-lg-6 form-group">
                        <label>Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Street:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className=" col-lg-6 form-group">
                        <label>Suite:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.suite"
                          value={formData.address.suite}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>City:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Zipcode:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.zipcode"
                          value={formData.address.zipcode}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Latitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.geo.lat"
                          value={formData.address.geo.lat}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Longitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address.geo.lng"
                          value={formData.address.geo.lng}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Phone:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Website:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="website"
                          value={formData.website}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Company Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company.name"
                          value={formData.company.name}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>Catch Phrase:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company.catchPhrase"
                          value={formData.company.catchPhrase}
                          onChange={handleChange} required
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <label>BS:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="company.bs"
                          value={formData.company.bs}
                          onChange={handleChange} required
                        />
                      </div>
                      <button
                        type="submit"
                        className={`mt-3 btn ${
                          editMode ? "btn-primary" : "btn-success"
                        }`}
                      >
                        {editMode ? "Update" : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      
      </div>
      <hr />
      {/* User data display */}

      <div className="row">
        {users.map((user) => (
          <div className="col-md-6" key={user.id}>
            <div className="card1">
              <table className="table">
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Username:</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{user.address.street}</td>
                  </tr>
                  <tr>
                    <td>suite:</td>
                    <td>{user.address.suite}</td>
                  </tr>
                  <tr>
                    <td>city:</td>
                    <td>{user.address.city}</td>
                  </tr>
                  <tr>
                    <td>BS:</td>
                    <td>{user.company.bs}</td>
                  </tr>
                  <tr>
                    <td>zipcode:</td>
                    <td>{user.address.zipcode}</td>
                  </tr>
                  <tr>
                    <td>Geo:lat</td>
                    <td>{user.address.geo.lat}</td>
                  </tr>
                  <tr>
                    <td>Geo:lng</td>
                    <td>{user.address.geo.lng}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>Website:</td>
                    <td>{user.website}</td>
                  </tr>
                  <tr>
                    <td>Company:</td>
                    <td>{user.company.name}</td>
                  </tr>
                  <tr>
                    <td>Catchphrase:</td>
                    <td>{user.company.catchPhrase}</td>
                  </tr>
                </tbody>
              </table>
              <div className="update-card">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Home;
