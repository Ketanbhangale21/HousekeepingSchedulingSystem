import React, { useState } from 'react';
import './feedback.css'; 

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    RequestId: '',
    HousekeeperName: '',
    HousekeeperId: '',
    Status: '',
    Remarks: '',
    Rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, Rating: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to submit the form data
    console.log(formData);
  };

  return (
    <div className="outer-container">

    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Request ID:
          <input
            type="text"
            name="RequestId"
            value={formData.RequestId}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Housekeeper Name:
          <input
            type="text"
            name="HousekeeperName"
            value={formData.HousekeeperName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Housekeeper ID:
          <input
            type="text"
            name="HousekeeperId"
            value={formData.HousekeeperId}
            onChange={handleInputChange}
          />
        </label>
       
        <br/>

        <label>
          Rating:
          <select
            name="Rating"
            value={formData.Rating}
            onChange={handleInputChange}
          >
            <option value="">Select </option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
            <option value="Outstanding">Outstanding</option>
            <option value="Better">Better</option>
            <option value="Best">Best</option>
          </select>
        </label>
        <br/>
        <label>
          Remarks:
          <div className="remarks">
          <input
            type="text"
            name="Remarks"
            value={formData.Remarks}
            onChange={handleInputChange}
          />
          </div>
        </label>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default FeedbackForm;