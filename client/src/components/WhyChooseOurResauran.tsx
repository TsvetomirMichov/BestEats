import BackgroundImage from "../assets/WhyChooseUs/RestauranBgImage.webp"
import FreshProducts from "../assets/WhyChooseUs/WhyChooseUs3.jpeg"
import FriendlyStaff from "../assets/WhyChooseUs/WhyChooseUs2.jpg"
import RelaxingAtmosphere from "../assets/WhyChooseUs/WhyChooseUs1.jpg"
import { useTranslation } from 'react-i18next';

const WhyChooseOurResauran = () => {
    const { t } = useTranslation()

    return (
        <div id="whyourrestaurants" className='relative flex w-full' style={{ backgroundImage: `url(${BackgroundImage})`, width: '100%', height: 'auto', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: '-1' }}>
            <div className='flex w-full flex-col bg-[rgba(0,0,0,0.8)] relative text-center py-[6em]'>
                <p className='text-white text-[1em] uppercase font-light mt-auto'> {t("ourRestaurants.heading.text1")} </p>
                <p className='text-white text-[2em] uppercase font-bold'>  {t("ourRestaurants.heading.text2")} </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-[2em] w-full mx-auto gap-10'>
                    <div className='w-2/3 h-full m-auto p-5 border-white border-[0.1em] mt-5 sm:mt-0 rounded-t-full flex flex-col  text-white justify-center items-center'>
                        <img src={FreshProducts} className='w-[10em] h-[10em] rounded-full object-cover mt-5' alt="" />
                        <p className='max-w-[50%] text-[1em] font-bold py-[1em]'> {t("ourRestaurants.steps.firstStep.text1")} </p>
                        <p className='max-w-[70%] text-[1em] font-medium'> {t("ourRestaurants.steps.firstStep.text2")} </p>
                    </div>
                    <div className='w-2/3 h-full m-auto p-5 border-white border-[0.1em] rounded-t-full flex flex-col  text-white justify-center items-center'>
                        <img src={FriendlyStaff} className='w-[10em] h-[10em] rounded-full object-cover mt-5' alt="" />
                        <p className='max-w-[50%] text-[1em] font-bold py-[1em]'> {t("ourRestaurants.steps.secondStep.text1")} </p>
                        <p className='max-w-[70%] text-[1em] font-medium'>{t("ourRestaurants.steps.secondStep.text2")}</p>

                    </div>
                    <div className='w-2/3 h-full m-auto p-5 border-white border-[0.1em] rounded-t-full flex flex-col  text-white justify-center items-center'>
                        <img src={RelaxingAtmosphere} className='w-[10em] h-[10em] rounded-full object-cover mt-5' alt="" />
                        <p className='max-w-[50%] text-[1em] font-bold py-[1em]'>{t("ourRestaurants.steps.thirdStep.text1")}</p>
                        <p className='max-w-[70%] text-[1em] font-medium'>{t("ourRestaurants.steps.thirdStep.text2")}</p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default WhyChooseOurResauran
