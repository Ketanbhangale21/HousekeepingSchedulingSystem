import React, { useState } from 'react';
import './BankApp.css'; 
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
 
// Step4:  Use Redux hooks to communicate with store: useSelector, useDispatch
 

function BankApp(props) 
{    
    const [amountValue, setAmount] = useState(0);       

    // Get the global state from store
    let currentBalance = useSelector((state) => state.balance);
  
    const dispatch = useDispatch();
    
    // Step5:  Perform the operations using dispatch
    function deposit_click() { 
       
        dispatch({type:"DEPOSIT", amount:amountValue} );
        setAmount(0);   // clear textbox
    }

    function withdraw_click() {        
        if (currentBalance - amountValue < 500) 
        {
            alert("Minimum balance should be 500. Cannot withdraw.");
        } 
        else
         {
        dispatch({type:"WITHDRAW", amount:amountValue} );
        setAmount(0);   // clear textbox
         }
    }

    
        return (
        <div>
        <header>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOAZUjKADjNCHFUKG1oqx5NzP5_kW5Yrd40oZU9cJRJw&s" width="150" alt="" />
            <br/>
            React-Redux Bank
        </header>
        <h1>Your balance is ${(currentBalance).toFixed(2)}</h1>
        <div className="atm">
                Enter Amount :  
                <input type="text" placeholder="Enter Ammount" 
                        value={amountValue}  name="amount" onChange={(e) => setAmount(e.target.value)} />
                
                <button onClick={withdraw_click}>Withdraw</button>
                <button onClick={deposit_click}>Deposit</button>
        </div>
        </div>
        );
}
 
export default BankApp;
    

 