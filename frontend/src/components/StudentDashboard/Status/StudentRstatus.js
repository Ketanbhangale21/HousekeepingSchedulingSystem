import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestStatus = ({ userEmail }) => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = requests.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(requests.length / recordsPerPage);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userData = await axios.get(`http://localhost:3005/api/students`);
        const user = userData.data.filter((user) => user.email === userEmail);
        const id = user[0].stdid;
        const response = await axios.get(`http://localhost:3005/api/requests`);
        const filteredRequests = response.data.filter(
          (item) => item.stdid === id
        );
        // Ensure that setRequests is called after filteredRequests is populated
        setRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [userEmail]);

  return (
    <div className="maincontainer">
      <div className="outercontainer">
        {/* <h6>Request Status</h6> */}
        <table className="housekeepers-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Date</th>
              <th>Timings</th>
              <th>Requests</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((request) => (
              <tr key={request.reqid}>
                <td>{request.reqid}</td>
                <td>{request.date}</td>
                <td>{request.timings}</td>
                <td>
                  <ul className="p-0" style={{ "list-style-type": "none" }}>
                    {request.reqs.map((req, index) => (
                      <li key={index} className="requests">
                        {req}
                      </li>
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

export default RequestStatus;
