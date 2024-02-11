import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/requests");
      const requestData = response.data;
      const requestsArray = Object.values(requestData); // Get an array of arrays
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
        (housekeeper) => housekeeper.status === "inactive"
      );
      console.log(inactiveHousekeeper);

      if (
        inactiveHousekeeper !== "inactive" &&
        inactiveHousekeeper !== "active"
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
      // await axios.put(`http://localhost:3005/api/requests/admin/${reqid}`, {
      //   status: "Completed",
      // });
      const response = await axios.get(
        `http://localhost:3005/api/requests/admin/${reqid}`
      );
      const { hid } = response.data;
      // console.log(hid);

      // Make a PUT request to update the housekeeper status to "Active"
      await axios.put(`http://localhost:3005/api/staff/complete/${hid}`, {
        status: "inactive",
      });
      alert("completed");
      fetchData(); // Refresh requests after update
    } catch (error) {
      console.error("Error completing request:", error);
    }
    fetchData();
  };

  return (
    <div>
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
          {requests &&
            requests.map((request) => (
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
                <td>{request.status}</td>
                <td>
                  {request.status === "Created" ? (
                    <button
                      className=""
                      onClick={() =>
                        allocateHousekeeperToRequest(request.reqid)
                      }
                    >
                      Allocate
                    </button>
                  ) : request.status === "Allocated" ? (
                    <button
                      onClick={() => completeRequest(request.reqid)}
                      className=""
                    >
                      Complete
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequest;
