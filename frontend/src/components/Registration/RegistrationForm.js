import React,{useState} from "react";
import './stylesheets.css';




const  RegistrationForm = () => {
    const [studentId, setstudentId] = useState('');
    const [firstName, setFirstName]=useState('');
    const [lastName, setLastName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [retypepassword, setRetypepassword]=useState('');
    const [country , setCountry] =useState('');
    const [state , setState] = useState('');
    const [city , setCity] = useState('');
    const [phoneNumber , setPhoneNumber]=useState('');
    const [gender, setGender] = useState('');
    const [secquestion, setSecQuestion] = useState("");
    const [fieldsEmpty, setFieldsEmpty] = useState("");
    const [answer, setAnswer] = useState("");

    const securityQuestions = [
        "What is your mother's maiden name?",
        "What is the name of your first pet?",
        "What is your favorite movie?",
        "What city were you born in?",
        "What is the name of your elementary school?",
      ];
    


    
    

    const handleRegistraion = () => {


        if(!firstName || !lastName || !email ||  !password  || !retypepassword ||
            !country || !state || !city || !phoneNumber || !gender || !secquestion || !fieldsEmpty  ||!answer){
            alert('All fields are required');
            return;
        }

        const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
           if (!emailValidation.test(email)) {
           alert('Please enter a valid email address');
          return;
        }

        const PhoneValidation = /^\d+$/;
        if(!PhoneValidation.test(phoneNumber)){
            alert('Please enter a valid phone number (only numbers are allowed)');
            return;
        }

        alert('Registarion Successfull');

        setstudentId('');
        setFirstName('');
        setLastName('');
        setCountry('');
        setState('');
        setCity('');
        setEmail('');
        setPassword('');
        setRetypepassword('');
        setPhoneNumber('');
        setGender('');
         };

    return(
        <div className="outer-container">

       
        <div className="container">
          <form >
            <h2 >Student Registration</h2>
                <div className="content">
                  <div className="input-name"  >
                <label>First Name:
                    <br/>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="name"/>
                </label>
                </div>
                <div className="input-name"  >
                <label>Last Name:
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  className="name" />
                </label>
                </div>
                <div className="input-name"  >
                <label>Enter Your Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  className="name"/>
                </label>
                
                </div>
                <div className="input-name"  >
                <label>Password:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="name"/>
                </label>
                </div>
                <div className="input-name"  >
                <label>Retype password:
                    <input type="text" value={retypepassword} onChange={(e) => setRetypepassword(e.target.value)} className="name"/>
                </label>
                </div>
                <div className="input-name"  >
                <label>Country:
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="name" />
                </label>
                </div>
                <div className="input-name"  >

                <label>State:
                    <br/>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="name" />
                </label>
                </div>
                <div className="input-name"  >
                <label>City:
                    <br/>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}  className="name"/>
                </label>
                </div>
                <div className="input-name"  >
                <label>Phone Number:
                    <br/>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="name"/>
                </label>
                </div>
                <div className="gender"  >
                
      <label htmlFor="gender">Select Gender:</label>
      <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="gender">
        <option value="">-- Select Gender --</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div className="form-group">
            <label htmlFor="Security-question">
              Choose a Security Question
            </label>
            <select
              className="secQuestion"
              id="Security-question"
              name="Security-question"
              value={secquestion}
              onChange={(e) => {
                setSecQuestion(e.target.value);
                setFieldsEmpty("");
              }}
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option
                  style={{ maxWidth: "200px" }}
                  key={index}
                  value={question}
                >
                  {question}
                </option>
              ))}{" "}
            </select>
          </div>
          {secquestion && (
            <div className="form-group">
              <label htmlFor="Answer">Answer</label>
              <input
                type="text"
                id="Answer"
                name="Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setFieldsEmpty("");
                }}
                autoComplete="off"
              />
            </div>
          )}


    
                <div className="btn-container">
                <button type="button" onClick={handleRegistraion}  className="btn" >
                    Register
                </button>
                </div>
                </div>
            </form>
            </div>
            </div>
    );
};

export default RegistrationForm;