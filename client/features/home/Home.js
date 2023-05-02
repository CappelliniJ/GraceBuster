import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Featured from './Featured'
import Footer from '../footer/Footer'
import Aos from 'aos'

const Home = () => {
    useEffect(() => {
        Aos.init({ duration: 3000 })
    }, [])

    return (
        <>
            <div>
                <div className="homepage-title">
                    <h1>Welcome to GraceBuster!</h1>
                    <h3>
                        Browse our featured selection of new and classic movies!
                    </h3>
                </div>
                <div className="featured-titles">
                    <Featured movieIds={[1, 2, 3]} />
                </div>
                <div data-aos="zoom-in" className="about-container">
                    <h2 className="about-title">About GraceBuster</h2>
                    <p className="homepage-paragraphs">
                        GraceBuster, founded in the wake of the Blockbuster era,
                        is a company dedicated to the preservation and promotion
                        of vintage style movies. Our journey began as a modest
                        venture, fueled by our passion for classic cinema and a
                        desire to keep the spirit of the golden age of film
                        alive. We saw an opportunity to fill the void left by
                        the downfall of the once-mighty Blockbuster, and with
                        determination and perseverance, we set out to become the
                        new bastion for movie enthusiasts who appreciate the art
                        and charm of vintage films.
                    </p>
                    <p className="homepage-paragraphs">
                        Our humble rise to the forefront of the industry is a
                        testament to the resilience of the GraceBuster team and
                        the unwavering support of our loyal customers. By
                        staying true to our mission and embracing the lessons
                        from the consequential past, we have become a beacon for
                        those seeking a nostalgic and unique cinematic
                        experience. Today, we proudly curate an extensive
                        collection of classic movies, ensuring that the timeless
                        stories and memorable moments of the past remain
                        accessible and relevant for generations to come.
                    </p>
                </div>

                <div className="homepage-shop">
                    <Link to="/shop" className="home-shop">
                        <h2>Visit Our Shop!</h2>
                    </Link>
                    <Featured movieIds={[4, 5, 6, 7, 8, 9]} />
                </div>
            </div>
            <footer className="homepage-footer">
                <Footer />
            </footer>
        </>
    )
}

export default Home
