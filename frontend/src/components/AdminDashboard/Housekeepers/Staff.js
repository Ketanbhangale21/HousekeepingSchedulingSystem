import React, { useState, useEffect } from "react";
import axios from "axios";
import "./staff.css";
// import "profile1.png";

const Staff = () => {
  const [housekeepers, setHousekeepers] = useState([]);
  const [selectedHousekeeper, setSelectedHousekeeper] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState(false);
  const [editable, setEditable] = useState(false);
  const recordsPerPage = 8;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = housekeepers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(housekeepers.length / recordsPerPage);

  useEffect(() => {
    fetchHousekeepers();
  }, []);

  const fetchHousekeepers = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/staff");
      setHousekeepers(response.data);
    } catch (error) {
      console.error("Error fetching housekeepers:", error);
    }
  };
  const handleUpdate = () => {
    // Perform update operation with edited housekeeper data
    const updatedHousekeeper = {
      ...selectedHousekeeper,
      hid: selectedHousekeeper.hid,
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
    };
    console.log(updatedHousekeeper);
    try {
      axios
        .put("http://localhost:3005/api/staff/", updatedHousekeeper)
        .then((resData) => {
          alert("updated");
        });
    } catch {
      console.error("Error updating housekeeper");
    }
  };
  const handleDelete = (id) => {
    window.confirm("Do you want to delete this housekeeper");

    try {
      axios.delete(`http://localhost:3005/api/staff/remove/${id}`);
      setHousekeepers(
        housekeepers.filter((housekeeper) => housekeeper.hid !== id)
      );
    } catch (error) {
      console.error("Error deleting housekeeper:", error);
    }
  };
  const handleView = (housekeeper) => {
    setDetails(!details);
    setSelectedHousekeeper(housekeeper);
  };
  const handleBack = () => {
    setDetails(!details);
  };
  const editSelected = () => {
    setEditable(true);
    // console.log(selectedHousekeeper);
  };
  return (
    <div className="maincontainer">
      {!details && (
        <div className="outercontainer">
          <h5>Housekeepers List</h5>
          <table className="housekeepers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((housekeeper) => (
                <tr key={housekeeper._id}>
                  <td>
                    {housekeeper.fname} {housekeeper.lname}
                  </td>

                  <td>{housekeeper.email}</td>
                  <td>Active</td>
                  <td>
                    {/* <button
                      className="viewid"
                      
                    >
                      View
                    </button> */}
                    <i
                      class="bi bi-plus-square"
                      style={{
                        borderRight: "1px solid #333",
                        paddingRight: "15px",
                      }}
                      onClick={() => handleView(housekeeper)}
                    ></i>
                    <span> </span>
                    <i
                      className="bi bi-trash3"
                      onClick={() => handleDelete(housekeeper.hid)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {housekeepers.length > recordsPerPage && (
              <ul>
                {/* Previous Button */}
                {currentPage > 1 && (
                  <li onClick={() => handlePageChange(currentPage - 1)}>
                    &laquo; Prev
                  </li>
                )}
                {/* Page Numbers */}
                {Array.from(
                  { length: Math.ceil(housekeepers.length / recordsPerPage) },
                  (_, index) => (
                    <li
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </li>
                  )
                )}
                {/* Next Button */}
                {currentPage !== totalPages && (
                  <li onClick={() => handlePageChange(currentPage + 1)}>
                    Next &raquo;
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
      {details && (
        <div className="innercontainer">
          <div className="profile-card">
            <div className="profile-header">
              <img
                src="profile1.png"
                alt="Housekeeper Avatar"
                className="avatar"
              />
            </div>
            <div className="profile-details">
              <div className="detail">
                <span className="label">Name:</span>
                <span className="value">
                  {selectedHousekeeper.fname} {selectedHousekeeper.lname}
                </span>
              </div>
              <div className="detail">
                <span className="label">Email:</span>
                <span className="value">{selectedHousekeeper.email}</span>
              </div>
              <div className="detail">
                <span className="label">Country:</span>
                <span className="value">{selectedHousekeeper.country}</span>
              </div>
              <div className="detail">
                <span className="label">State:</span>
                <span className="value">{selectedHousekeeper.state}</span>
              </div>
              <div className="detail">
                <span className="label">City:</span>
                <span className="value">{selectedHousekeeper.city}</span>
              </div>
              <div className="detail">
                <span className="label">Phone:</span>
                <span className="value">{selectedHousekeeper.phone}</span>
              </div>
              <div className="detail">
                <span className="label">Gender:</span>
                <span className="value">{selectedHousekeeper.gender}</span>
              </div>
              <i class="bi bi-pencil-square" onClick={editSelected}></i>
            </div>
            {editable && (
              <div className="editHouskeeper">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className="label">First Name:</span>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="fname"
                          defaultValue={selectedHousekeeper.fname}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">Last Name:</span>
                      </td>
                      <td>
                        <input
                          type="text"
                          id="lname"
                          defaultValue={selectedHousekeeper.lname}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">Email:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="email"
                          defaultValue={selectedHousekeeper.email}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">Country:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="country"
                          defaultValue={selectedHousekeeper.country}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">State:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="state"
                          defaultValue={selectedHousekeeper.state}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">City:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="city"
                          defaultValue={selectedHousekeeper.city}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">Phone:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="phone"
                          defaultValue={selectedHousekeeper.phone}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">Gender:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="gender"
                          defaultValue={selectedHousekeeper.gender}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Staff;
