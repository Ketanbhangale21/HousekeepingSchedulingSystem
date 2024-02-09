import React from "react";
import './AFeedback.css';




function Feedback(){
    const DataArray = [
        {Fid: "01",Req_Id:"221",SName:"Dhanush",Fb:"Cleaning is good",Ratings:"4"},
        {Fid: "02",Req_Id:"112",SName:"kethan",Fb:"Room service is good",Ratings:"5"},
        {Fid: "03",Req_Id:"125",SName:"Mayur",Fb:"Needs to be improve,but its okk",Ratings:"4"},
        {Fid: "04",Req_Id:"254",SName:"Maneesha",Fb:"Excellent work",Ratings:"4"},
        {Fid: "05",Req_Id:"220",SName:"Monika",Fb:"Good Work",Ratings:"5"},
        {Fid: "06",Req_Id:"115",SName:"Shivaranjini",Fb:"good Service",Ratings:"5"},
    ];

    let resultArray = DataArray.map((item) => {
        return <tr>
            <td>   {item.Fid}  </td>
            <td>   {item.Req_Id}  </td>
            <td>   {item.SName}  </td>
            <td>   {item.Fb}  </td>
            <td>   {item.Ratings}  </td>
        </tr>
    });
    return  ( <>
    <div className="inner-container">
    <h3>Feedback</h3>
            <table border="2" width="600" cellspacing="0" cellpadding="5">
                <tr>
                    <th>Feedback Id</th>
                    <th>Request Id</th>
                    <th>Student Name</th>
                    <th>Feedback</th>
                    <th>Ratings</th>
                </tr>
                {resultArray}
            </table>
    </div>
        </>
    );
}

export default Feedback;