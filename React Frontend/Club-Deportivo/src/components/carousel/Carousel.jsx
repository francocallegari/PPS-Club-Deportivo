import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import cancha_tenis from '../../images/cancha_tenis.jpeg'
import raqueta from '../../images/raqueta.jpeg'
import cancha_basquet from '../../images/cancha_basquet.jpeg'
import cancha_voley from '../../images/cancha_voley.jpeg'
import cancha_futbol from '../../images/cancha_futbol.jpeg'
import gente from '../../images/gente_futbol.jpeg'
import cancha_voley2 from '../../images/cancha_voley2.jpeg'

const CarouselImages = () => {
    return (
        <Carousel>
            <Carousel.Item interval={4000}>
                <Image 
                src={cancha_tenis}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <Image 
                src={raqueta}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <Image 
                src={cancha_basquet}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <Image 
                src={cancha_voley}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <Image 
                src={cancha_futbol}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <Image 
                src={gente}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <Image 
                src={cancha_voley2}
                style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
                fluid>
                </Image>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselImages