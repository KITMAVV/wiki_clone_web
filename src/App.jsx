import { useState } from 'react'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        {/*ToDO Удалить после теста*/}
        <Header />
        <div
            style={{
                width: '100%',
                height: '630px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f9f9f9'
            }}
        >
            <button onClick={() => setCount(c => c + 1)}>
                count is {count}
            </button>
        </div>
        <Footer/>
    </>
  )
}

export default App
