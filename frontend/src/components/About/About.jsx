import React from 'react';
import aboutImg from "../../assets/images/about.jpg";
import aboutCardImg from "../../assets/images/about-card.jpg";
import { Link } from 'react-router-dom';


const About = () => {
  return(
    <section>
      <div className='container'>
        <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
          {/* ======== about img ========= */}
          <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
            <img src={aboutImg} alt=""/>
            <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* ====== about content ====== */}
          <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
            <h2 className='heading'>Proud to be one of the nations best</h2>
            <p className='text__para'>
                 Welcome to India's premier medical website, where expertise meets innovation, 
              and care knows no boundaries. At +MediCare, we take immense pride in our commitment to serving
              the diverse healthcare needs of our nation with unparalleled excellence.</p>

              <p className='text__para mt-[30px]'> 
                  Founded on the pillars of trust, reliability, and compassion,
              we strive to be your trusted companion on your journey towards optimal health and well-being. 
              With a dedicated team of experienced medical professionals, cutting-edge technology,
              and a comprehensive range of services,we endeavor to empower every individual with the knowledge and 
              resources necessary to make informed healthcare decisions.</p>

              <Link to="/">
                <button className='btn'>Learn More</button>
              </Link>
          </div>

        </div>
      </div>
    </section>

  );
};

export default About;