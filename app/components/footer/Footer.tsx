import React from 'react'

import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'
import { MdFacebook } from 'react-icons/md'
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='bg-slate-700
    text-slate-200 
      text-sm
      mt-16
    '>
      <Container>
        <div className='flex flex-col
          md:flex-row
          justify-between
          pt-16
          pb-8
        '>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className='w-full md:w-1/3 mb-6
            md:mb-0'>
            <h3 className='text-base font-bold mb-2'>About Us</h3>
            <p className='mb-2'>
             Welcome to our mobile and electronics emporium! At our cutting-edge company, 
             we are dedicated to providing top-tier mobile devices and related accessories 
             to meet the dynamic needs of our customers.With a commitment to quality and innovation,
              we strive to offer a seamless shopping experience.
            </p>
            <p>&copy; {new Date().getFullYear()}
             E~Shop. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Follow Us</h3>
            <div className='flex gap-2'>
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link> 
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container> 
    </footer>
  )
}

export default Footer