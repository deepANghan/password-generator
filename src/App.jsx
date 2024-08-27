import { useState,useEffect,useCallback,useRef } from 'react'
import './App.css'

function App() {
  
  const [length,setLength] = useState(8);
  const [numeric,setNumeric] = useState(false);
  const [specialChar,setSpecialChar] = useState(false);
  const [passtext,setPassword] = useState("");

  let inputRef = useRef(null);
  let countPass = useRef<Number>(0);

  const generatePassword = useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      
      if(numeric === true)
        str += "0123456789"

      if(specialChar === true)
        str+="!@#$%^&*()";
      
      for(let i=0;i<length;i++){
        let char = Math.floor(Math.random() * str.length);
        pass += str[char];
      }

      console.log(pass);
      
      setPassword(pass);

  },[length,numeric,specialChar]);

  const copyToClipboard = ()=>{
    console.log(inputRef.current.select());
    window.navigator.clipboard.writeText(passtext);
  };
  
  useEffect(()=>{
    generatePassword();
    countPass += 1;
    console.log(`Count of generated password is :  ${countPass}`);
  },[length,numeric,specialChar,setPassword]);

  return (
    <>
    <div className="flex justify-center flex-col bg-slate-900 container">
      <div>
        <h2 className="text-white text-4xl">Password Generator</h2>     
      </div>
      <div>
          <input ref={inputRef} type="text" className='p-5 mt-5 w-auto' value={passtext} placeholder='Generate password'/>
          <button 
          className="bg-blue-500 p-5 text-slate-50"
          onClick={copyToClipboard}>Copy</button>
      </div>

      <div className="text-gray-50 p-2 flex gap-2 justify-center">
        <input type="range" 
        onChange={(e)=>setLength(e.target.value)} 
        min={0} 
        max={15} 
        value={length}/>Length({length})

        <input type="checkbox" 
        onChange={(e)=>{
          setNumeric((numeric) => !numeric)
        }}/>Numeric
        <input type="checkbox" 
        onChange={(e)=>{
          setSpecialChar(!specialChar)
        }}/>Speacial characters
      </div>
    </div>
    </>
  )
}

export default App
