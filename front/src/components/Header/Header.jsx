import {useRef, useEffect ,useContext} from 'react';
import { NavLink, Link } from 'react-router-dom'; // Import Link
import logo from '../../assets/Image/logo.png';
import {BiMenu} from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  }
];

const Header = () => {
  const headerRef=useRef(null);
  const menuRef=useRef(null);
const {user,role,token} =useContext(AuthContext)

  const handleStickyHeader=()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('sticky__header');
      }
      else{
        headerRef.current.classList.remove('sticky__header');
      }
    })
  }
  useEffect(()=>{
    handleStickyHeader()
    return ()=>window.removeEventListener('scroll', handleStickyHeader)
  })

const toggleMenu=()=> menuRef.current.classList.toggle('show__menu')
  
  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className='container'>
        <div className=" flex items-center justify-between">
          <div>
          <img src={logo} alt="Logo" />
        </div>
        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
          <ul className="menu flex items-center gap-[2.7rem]">
            {navLinks.map((item, index) => (
              <li key={index} className="menu-item">
                <NavLink
                  to={item.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>  
        <div className="flex items-center gap-4 ">
          {
            token && user ?  <div >
            <Link to={`${role=="doctor"? "/doctors/profile/me":"/users/profile/me"}`}>
              <figure className='w-[6rem] h-[2rem] rounded-full cursor-pointer' >
                <img src={user?.photo} className='w-full rounded-full '/>
              </figure>
        
            </Link>
          </div>:
            <Link to='/login'>
            <button className='bg-primaryColor py-2 px-6 text-white font-semibold
             h-[44px] flex items-center rounded-[500px]'>Login</button>
          </Link>
          }
          
          
         
          <span className='md:hidden' onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer"/>
              
          </span>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;