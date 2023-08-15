import logo from '../img/tittle.jpg'
import '../index.css'



 function StarWarsLogo () {
  return (
    <div className="container">
      <header className="headerLogo"> 
        <a href="/">
          <img src={logo} alt="Star Wars" className="header__logo" />
        </a>
       
      </header>
    </div>

  )
}

export default StarWarsLogo;