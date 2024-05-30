import { formateDate } from '../../utils/formateDate';

const DoctorAbout = ({name, about, qualifications, experiences}) => {
    return (
      <div>
        <div>
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
            About of
            <span className="text-irisBlueColor font-bold text-[24px] leading-9">
             Prakash Ghimire
            </span>
          </h3>
          <p className="text__para">
          Dr. Prakash Ghimire is a highly skilled surgeon renowned for her expertise in intricate surgical procedures.
           With over a decade of experience, he has earned a reputation for her precision and compassionate care.
            Patients seek her out for him reassuring demeanor and exceptional surgical outcomes.
             Dr. Prakash specializes in minimally invasive techniques, striving to minimize discomfort and expedite recovery for his patients. 
             Her dedication to advancing surgical methods through research and innovation has earned her recognition among peers in the medical community.
              Beyond his professional accomplishments,
           Dr. Prakash is known for his unwavering commitment to patient well-being, making him a trusted figure in the field of surgery.
          </p>
        </div>
        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Education</h3>
          <ul className="pt-4 md:p-5">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                {formateDate('09-04-2010')} - {formateDate('02-04-2018')}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  PHD in Surgeon
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                New Apollo Hospital, India.
              </p>
            </li>

            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                 {formateDate('07-04-2010')}-  {formateDate('12-04-2018')}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  PHD in Surgeon
                </p>
              </div>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                New Apollo Hospital, India.
              </p>
            </li>

          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Experience</h3>
          <ul className=" grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
            <li className='p-4 rounded bg-[#fff9ea]'>
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("07-04-2010")} {formateDate("08-13-2019")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hospital, India.
              </p>
            </li>

            <li className='p-4 rounded bg-[#fff9ea]'>
            <span className="text-yellowColor text-[15px] leading-6 font-semibold">
              {formateDate("07-04-2010")} {formateDate("08-13-2019")}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hospital, India.
              </p>
            </li>
          </ul>
          </div>
      </div>
    );
  };


export default DoctorAbout;