import './Footer.css';
import { IoIosMail } from "react-icons/io";
import { SiCodefresh } from "react-icons/si";
import { IoTime } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left-side">
        <div className="footer-left-side-text"><IoIosMail /> Free Delivery on Orders more than 30$</div>
        <div className="footer-left-side-text"><SiCodefresh /> Fresh & Quality Ingredients</div>
        <div className="footer-left-side-text"><IoTime /> 24/7 Customer Support</div>
      </div>

      <div className="footer-right-side-social-icons">
        <FaFacebookF style={{ color: 'rgb(255, 255, 255)', width: '24px', height: '24px', cursor: 'pointer' }} />
        <FaTwitter style={{ color: 'rgb(255, 255, 255)', width: '24px', height: '24px', cursor: 'pointer' }} />
        <RiInstagramFill style={{ color: 'rgb(255, 255, 255)', width: '24px', height: '24px', cursor: 'pointer' }} />
        <FaYoutube style={{ color: 'rgb(255, 255, 255)', width: '24px', height: '24px', cursor: 'pointer' }} />
      </div>
    </footer>
  )
}

export default Footer;