import { Divider } from '@mui/material';
import { useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';




const Footer = () => {
  const { t } = useTranslation()

  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Handle email submission here, e.g., send to API or store in state
    console.log('Email submitted:', email);

    setEmail('');
  };

  return (
    <footer className='w-full box-border relative bg-[#2F2F2F]'>
      <div className='absolute top-[-150px] left-0 w-full h-[40vh] flex flex-col items-center justify-center'>
        {/* White square with subscription form */}
        <div className='bg-white rounded-full  sm:rounded-full md:px-[10em] md:py-[5em] p-[1em]  w-auto  md:w-4/5 shadow-sm shadow-black flex flex-col items-center'>
          <h2 className='text-xl md:text-2xl font-bold text-center mb-4 flex-wrap'> {t("footer.subscribe.title")} </h2>
          <p className='text-md text-gray-700 text-center flex flex-wrap'> {t("footer.subscribe.description")} </p>
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row items-center'>
            <input
              type='email'
              placeholder={t("footer.subscribe.footerSeachPlaceHolder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border  px-2 py-1 md:px-3  md:py-2 rounded-md mr-2 focus:outline-none'
            />
            <button type='submit' className='bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500'>
              {t("footer.subscribe.button")}
            </button>
          </form>
        </div>
      </div>
      {/* Main footer content */}

      <div className='max-w-[1640px] flex flex-col sm:flex-row justify-around pt-[40vh] px-8 pb-8'>
        <div className='flex flex-col items-start gap-5'>
          <div className='flex gap-2 items-center justify-center text-3xl font-bold text-orange-400'>
            <FaFire />  {t("footer.subscribe.iconText")}
          </div>
          <p className='text-md text-white max-w-[15em]'> {t("footer.subscribe.checkInfo")}</p>
        </div>

        {/* Left and right content (replace with your links) */}
        <div className='flex flex-col gap-4 justify-center '>
          <h1 className='text-xl font-semibold text-white '>{t("footer.company.title")}</h1>
          <Link to={"/"} className='text-md text-white hover:text-orange-400'>{t("footer.company.links.aboutUs")}</Link>
          <Link to={"/"} className='text-md text-white hover:text-orange-400'>{t("footer.company.links.howItWorks")}</Link>
          <Link to={"/"} className='text-md text-white hover:text-orange-400'>{t("footer.company.links.services")}</Link>
        </div>


        <div className='flex flex-col gap-4 justify-center'>
          <h1 className='text-xl font-semibold text-white '>{t("footer.getInTouch.title")}</h1>
          <p className='text-md text-white hover:text-orange-400'>{t("footer.getInTouch.phone")}</p>
          <p className='text-md text-white hover:text-orange-400'>{t("footer.getInTouch.email")}</p>
        </div>


      </div>
      <div className='flex flex-col w-full gap-4  items-center py-10  '>
        <Divider sx={{ backgroundColor: '#515151', width: "75%", py: "0.04em", }} />
        <h1 className='text-white'>{t("footer.copyright")}</h1>
      </div>
    </footer>
  );
};

export default Footer;