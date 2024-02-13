import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminreq.css";
const AdminRequest = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = requests.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(requests.length / recordsPerPage);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/requests");
      const requestData = response.data;
      const incompleteRequests = requestData.filter(
        (request) => request.status !== "Completed"
      );
      const requestsArray = Object.values(incompleteRequests); // Get an array of arrays
      const flattenedRequests = requestsArray.flat();
      setRequests(flattenedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const allocateHousekeeperToRequest = async (reqid) => {
    try {
      // Fetch housekeepers' data from the API
      const response = await axios.get("http://localhost:3005/api/staff");
      const housekeepersData = response.data;

      // Find an inactive housekeeper
      const inactiveHousekeeper = housekeepersData.find(
        (housekeeper) => housekeeper.status === "Inactive"
      );
      console.log(inactiveHousekeeper);

      if (
        inactiveHousekeeper !== "Inactive" &&
        inactiveHousekeeper !== "Active"
      ) {
      }
      if (inactiveHousekeeper) {
        // If an inactive housekeeper is found, allocate their HID to the request
        await axios.put(`http://localhost:3005/api/requests/admin/${reqid}`, {
          status: "Allocated",
          hid: inactiveHousekeeper.hid,
        });
        await axios.put(
          `http://localhost:3005/api/staff/allocate/${inactiveHousekeeper.hid}`,
          {
            reqid: reqid,
            status: "Active",
          }
        );
        // Display a success message
        alert("Housekeeper allocated successfully");
      } else {
        // If no inactive housekeeper is found, display a message
        alert("No inactive housekeeper available for allocation");
      }
    } catch (error) {
      console.error("Error allocating housekeeper to request:", error);
    }
    fetchData();
  };

  const completeRequest = async (reqid) => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/requests/admin/${reqid}`
      );
      const { hid } = response.data;
      // Make a PUT request to update the housekeeper status to "Inactive"
      await axios.put(`http://localhost:3005/api/staff/complete/${hid}`, {
        status: "Inactive",
      });
      await axios.put(`http://localhost:3005/api/requests/admin/${reqid}`, {
        status: "Completed",
      });
      alert("completed");
      fetchData(); // Refresh requests after update
    } catch (error) {
      console.error("Error completing request:", error);
    }
    fetchData();
  };

  return (
    <div className="maincontainer">
      <div className="outercontainer">
        {/* <h2>Requests</h2> */}
        <table className="housekeepers-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Requests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords &&
              currentRecords.map((request) => (
                <tr key={request.reqid}>
                  <td>{request.reqid}</td>
                  <td>{request.date}</td>
                  <td>{request.timings}</td>
                  <td>
                    <ul style={{ "list-style-type": "none" }}>
                      {request.reqs.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </td>
                  <td
                    className={
                      request.status === "Allocated"
                        ? "text-primary"
                        : request.status === "Completed"
                        ? "text-success"
                        : "text-default"
                    }
                  >
                    {request.status}
                  </td>

                  <td>
                    {request.status === "Created" ? (
                      <button
                        className="btn btn-primary status1"
                        onClick={() =>
                          allocateHousekeeperToRequest(request.reqid)
                        }
                      >
                        Allocate
                      </button>
                    ) : request.status === "Allocated" ? (
                      <button
                        onClick={() => completeRequest(request.reqid)}
                        className="btn btn-success status2"
                      >
                        Complete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">
          {requests.length > recordsPerPage && (
            <ul>
              {/* Previous Button */}
              {currentPage > 1 && (
                <li onClick={() => handlePageChange(currentPage - 1)}>
                  &laquo; Prev
                </li>
              )}
              {/* Page Numbers */}
              {Array.from(
                { length: Math.ceil(requests.length / recordsPerPage) },
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
    </div>
  );
};

export default AdminRequest;
