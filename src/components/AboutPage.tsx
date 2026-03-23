import './AboutPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import whoWeAreImg from '/images/who-we-are.png';
import pageItemDivider from '/images/about-us-page-item-divider.png';
import contactUsDivider from '/images/contact-us-item-divider.png';
import ourStoryImg from '/images/our-story.png';
function AboutPage() {

  const [contactUsOpen, setContactUsOpen] = useState<boolean>(false);

  return (
    <div className="about-page-wrapper">

      <div className="about-us-page-container">
        <div className="about-us-page-header">
          ABOUT US
        </div>

        <div className="about-us-content">
          <div className="about-us-content-item">
            <div className="about-us-content-item-left-side">
              <div className='about-us-content-item-header'>WHO WE ARE</div>
              <div className="about-us-content-item-text">
                Welcome to TastyBites! We're a cozy bakery and cafe dedicated to bringing
                you delicious treats and exceptional service. Our passion for baking and
                commitment to quality ensure that every item we serve is made with categoryand
                the finest ingredients.
              </div>
              <Link to='/explorePage' style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="view-our-menu-button">VIEW OUR MENU</div>
              </Link>
            </div>

            <img src={whoWeAreImg} className='about-us-content-item-image' />
          </div>

          <img src={pageItemDivider} className='about-us-content-item-divider' />

          <div className="about-us-content-item">
            <div className="about-us-content-item-left-side">
              <div className='about-us-content-item-header'>OUR STORY</div>
              <div className="about-us-content-item-text">
                Founded by passionate bakers in 2026, TastyBites started as a small
                neighborhood bakery with a love for creating sweet and savory delights.
                From day one, our goal has been to create a welcoming atmosphere where people
                can enjoy freshly baked goods and cozy up with a cup of coffee. Over the
                years, we've grown into a beloved local spot where friends and families gather
                to indulge in our treats.
              </div>

              <img src={pageItemDivider} className='about-us-page-small-divider' />
            </div>

            <img src={ourStoryImg} className='about-us-content-item-image' />
          </div>
        </div>

        <img src={pageItemDivider} className='about-us-content-item-divider' />


        <div className="about-us-page-get-in-touch-container">
          <div className="get-in-touch-header">GET IN TOUCH!</div>
          <div className="get-in-touch-text">Love our treats and want to know more about us? We'd love to hear from you!</div>
          <div className="contact-us-button" onClick={
            () => setContactUsOpen(!contactUsOpen)
          }>Contact Us</div>

          {contactUsOpen && (
            <div className="about-us-contact-us-information-container">
              <img src={contactUsDivider} className='about-us-contact-us-information-item-divider' />
              <div className="about-us-contact-us-information-item">Phone: +111 11 11 11</div>
              <img src={contactUsDivider} className='about-us-contact-us-information-item-divider' />
              <div className="about-us-contact-us-information-item">Email: tastyBites@tasty.com</div>
              <img src={contactUsDivider} className='about-us-contact-us-information-item-divider' />
              <div className="about-us-contact-us-information-item">Address: 1 Tasty Bites Street, Tasty Bites</div>
              <img src={contactUsDivider} className='about-us-contact-us-information-item-divider' />
              <div className="about-us-contact-us-information-item">Working Hours: Mon - Fri: 09:00 - 18:00</div>
              <img src={contactUsDivider} className='about-us-contact-us-information-item-divider' />
              <div className="about-us-contact-us-information-item">Social Media: Tasty_Bites</div>
              <img src={contactUsDivider} className='about-us-contact-us-information-item-divider' />
            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default AboutPage;