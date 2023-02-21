import React, { useRef } from 'react'
import Image from 'next/image'
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'

// Little helpers ...
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function App() {
  const parallax = useRef<IParallax>(null!)
  const {width, height} = useWindowDimensions();
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', display:'flex', flex:1, flexDirection:'column', background: '#253237' }}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url('stars', true),
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <Image src={url('satellite4')} blurDataURL={url('satellite4')} placeholder={'blur'} alt='satellite4' width={0.15*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  marginLeft: '70%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '55%' }} />
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.10*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '70%' }} />
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.10*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '10%' }} />
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '60%' }} />
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.25*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '30%' }} />
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.10*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '5%' }} />
          <Image src={url('cloud')} blurDataURL={url('cloud')} placeholder={'blur'} alt='cloud' width={0.15*(width ?? 0)} height={0.8 * (height ?? 0)} style={{  display: 'block', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <Image src={url('earth')} blurDataURL={url('earth')} placeholder={'blur'} alt='earth' width={0.60*(width ?? 0)} height={0.8 * (height ?? 0)} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true),
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image src={url('server')} blurDataURL={url('server')} placeholder={'blur'} alt='server' width={0.20*(width ?? 0)} height={0.8 * (height ?? 0)} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image src={url('bash')} blurDataURL={url('bash')} placeholder={'blur'} alt='bash' width={0.40*(width ?? 0)} height={0.8 * (height ?? 0)} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => parallax.current.scrollTo(0)}>
            <Image src={url('clients-main')} blurDataURL={url('clients-main')} placeholder={'blur'} alt='clients-main' width={0.40*(width ?? 0)} height={0.8 * (height ?? 0)} />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
