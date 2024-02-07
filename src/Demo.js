import react from 'react';

function Demo () {
      var empArray=[
        {empid: 10, ename:"Account",empOffice:"hyd",empSalary:"20,000"},
        {empid: 20, ename:"sales",empOffice:"chennai",empSalary:"10,000"},
        {empid: 30, ename:"Marketing",empOffice:"hyd",empSalary:"25,000"},
        {empid: 40, ename:"medical",empOffice:"hyd",empSalary:"30,000"},
        
      ];
      return(
        <table  border="2">
            <thead>
                <tr>
                    <th>Emmployee id</th>
                    <th>Emmployee Name</th>
                    <th>Office</th>
                    <th>Salary </th>
                </tr>
            </thead>
            <tbody>
                {empArray.map((item, index)=>(
                  <tr key={index}>
                    {Object.values(item).map((value,index)=>(
                        <td key={index}>{value}</td>
                    ))}
                  </tr>  
                 ))}
            </tbody>
        </table>
      )

}

export default Demo;