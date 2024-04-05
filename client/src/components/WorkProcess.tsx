import BackgroundImage from '../assets/bg-image.svg';
import { useTranslation } from 'react-i18next';

const WorkProcess = () => {
    const { t } = useTranslation()
    
    return (
        <div className='w-full relative my-[10em]'>
            <div className='relative flex w-full' style={{ backgroundImage: `url(${BackgroundImage})`, width: '100%', height: '20em', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: '-1' }}>
                <div className='flex w-full flex-col bg-[rgba(0,0,0,0.5)] relative'>
                    <div className='relative h-full flex flex-col justify-center items-center text-white shadow-md z-2 p-8'>
                        <p className='text-xl font-medium mb-5'>{t("howItWorks.heading.text1")}</p>
                        <p className='text-2xl font-extrabold mb-5'>{t("howItWorks.heading.text2")}</p>
                    </div>
                </div>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center mt-[-3em]'>
                <div className='w-2/3 p-10 mx-auto bg-white shadow-md rounded-br-2xl rounded-tl-2xl  '>
                    <h1 className='text-2xl font-semibold mb-5'> {t("howItWorks.steps.firstStep.text1")} </h1>
                    <p >{t("howItWorks.steps.firstStep.text2")}</p>
                </div>
                <div className='w-2/3 p-10 mx-auto bg-white shadow-lg my-5  rounded-2xl md:my-0 scale-105'>
                    <h1 className='text-2xl font-semibold mb-2'> {t("howItWorks.steps.secondStep.text1")} </h1>
                    <p>{t("howItWorks.steps.firstStep.text2")}</p>
                </div>
                <div className='w-2/3 p-10 mx-auto bg-white shadow-md  rounded-bl-2xl rounded-tr-2xl '>
                    <h1 className='text-2xl font-semibold mb-2'>{t("howItWorks.steps.thirdStep.text1")}</h1>
                    <p>{t("howItWorks.steps.thirdStep.text2")}</p>
                </div>
            </div>
        </div>
    );
}

export default WorkProcess;
