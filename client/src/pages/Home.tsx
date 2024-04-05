import Hero from '../components/Hero'
import HeadlineCards from '../components/HeadlineCards '
import Food from '../components/Food'
import WorkProcess from '../components/WorkProcess'
import RestaurantWIdget from '../components/RestaurantWIdget'
import WhyChooseOurResauran from '../components/WhyChooseOurResauran'

const Home = () => {

    return (
        <div>
            <Hero />
            <HeadlineCards />
            <Food />
            <WorkProcess/>
            <RestaurantWIdget/>
            <WhyChooseOurResauran/>
        </div>
    )
}

export default Home