import React from 'react';
import { Redirect } from 'react-router-dom';
import './homepage.css';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import github from './github.png'
import linkedin from './linkedin.png'
import {Link} from 'react-router-dom'; 
import detail from './stock_detail.png'
import dashboard from './user_dashboard.png'




const HomePage = ({ authenticated, setAuthenticated }) => {
    if (authenticated) {
        return <Redirect to="/" />;
    }
    return(
        <div id='body'>
            
            <Header/>
            <Card 
                className='section bg-grey'
                img={dashboard}
                title='Algo, a Robinhood like stock trading application'
                description='Algo is a stock trading application similiar to Robinhood that I built using React and Express. Users can securely create accounts, 
                log in and paper trade stocks using real time data.'
            />

            <Card 
                className='section'
                img={detail}
                title='About Algo' 
                description='Algo includes secure user accounts with an informative stock dashboard that features portfolio health charts and graphs, transaction ledger
                top movers. Stock details include historical graphs, news, and company information updated in real time.'
            />
            
            

            {/* <Card 
                className='section'
                img='./Capture1.PNG' 
                title='Our Mission' 
                description='Our mission is to reduce food waste.'
            /> */}
            <ContactContainer/>
        </div>
    );
}

const Header = () =>{
    return(
        <>
        <div className="logout-button-holder">
    <Link to="/login">
          <button type="button">
          Log In
          </button>
        </Link>
        <Link to="/signup">
          <button type="button">
          Sign Up
          </button>
        </Link>
    </div>
        <div className='header'>
            <span className='header-title'>
                Algo
            </span>
            <br/>
       
        </div>
        </>
    );
}







const Card = (props) =>{
    return(
        <div className={props.className} >
            <div className="small-div">
                <i className={props.className}></i>
                
            </div>

            <div className="big-div">
                <span className='div-title'>
                    {props.title}
                </span>
                <br/>
                <span>
                    {props.description}
                </span>
                <img className='homepage-img' src={props.img} alt=''/>
            </div>
        </div>
    )
}



const ContactContainer = () => {
    return(
        <div className='contact-container bg-grey'>
            <span className="div-title">Contact</span>
            <div className='contact-form'>
                <div id='sect1'>
                <>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="https://www.linkedin.com/in/john-hiestand-3bb22a17/">
      John Hiestand 
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
      
    </Typography>
    
    <div className='miniInfo1'>
    <div>
    <a href="https://github.com/johnegus/" target="_blank" rel="noopener noreferrer"> 
      
        <img className='icons' height='25px' width='25px' src={github} alt='github' />
        </a>
    </div>
    <div>
    <a href="https://www.linkedin.com/in/john-hiestand-3bb22a17/" target="_blank" rel="noopener noreferrer"> 
        
        <img className='icons' height='25px' width='25px' src={linkedin} alt='linkedin' />
        </a>
    </div>
    </div>
    <Typography variant="body2" color="textSecondary" align="center">
     Email: jgh2102@gmail.com
    </Typography>
    </>
                </div>
                    
                <div id='sect2'>
                    <span>
                        Contact
                    </span>

                    <input type="text" placeholder="email address" className="input-field"/>
                    <textarea name="" id="" cols="30" rows="10" placeholder="comment"></textarea>
                    <button className="contact-btn">Send</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;