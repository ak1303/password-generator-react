import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [character,setCharacters] = useState(false);
  const [numbers,setNumbers] = useState(false);
  const [password,setPassword]=useState("");
  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,password.length);
    window.navigator.clipboard.writeText(password);
  },[password]);
  const passwordGenerator = useCallback(()=>{//memoization
    let str = "abcdefghijklmnopqrstuvwwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(character)str+="!@#$%^&*()?|/+-";
    if(numbers)str+="0123456789";
    let password="";
    for(let i=0;i<length;i++){
      let randomChar = Math.floor(Math.random()*str.length);
      password += str.charAt(randomChar);
    }
    setPassword(password);
  },[length,character,numbers]);

  useEffect(()=>passwordGenerator(),[length,character,numbers]);
  
  return (
    <>
    <div className='h-screen bg-slate-300 flex justify-center items-center'>
      <div style={{backgroundColor:'#211e66'}} className="  container flex flex-col gap-12 w-3/5 h-3/5 rounded-xl text-white p-5">
          <h1 className='text-xl text-center'>Password generator</h1>
          <div className="password flex justify-center">
            <input ref={passwordRef} className=" w-2/4 rounded-s-xl p-3 text-black  focus:outline-none font-bold" type="text" value={password} spellCheck="false" />
            <button onClick={copyToClipboard} className="bg-blue-500 rounded-e-xl p-3">Copy</button>
          </div>
          <div className="flex justify-around gap-12 mt-7">
            <div className='flex'>
              <input value={length} onChange={(e)=>{setLength(e.target.value)}}  min="6" max="40" className="w-80" type="range" id="length"/>
              <p>Length({length})</p>
            </div>
            <div >
              <input onChange={(e)=>{setNumbers(!numbers)}} defaultChecked={numbers} type="checkbox" id="numbers"/>
              <label htmlFor="numbers" className='ms-2'>Numbers</label>
            </div>
            <div >
              <input onChange={(e)=>{setCharacters((prev)=>!prev)}} defaultChecked={character} type="checkbox" id="character"/>
              <label htmlFor="character" className='ms-2 '>Characters</label>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default App
