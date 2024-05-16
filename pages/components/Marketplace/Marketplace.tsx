import React, { useState } from 'react'
import ABI from '../../../utils/Ecommarce.json'
// import ABI from '../../../../artifacts/contracts/Ecommarce.sol/Ecommarce.json'
import { ethers } from 'ethers'
import Button from '@mui/material/Button';
import ItemCard from './ItemCard';


function Marketplace() {

  const sampleData = [
    {
      "img": "https://th.bing.com/th/id/OIP.-zlr76S3-wufUUssbs9umAAAAA?w=400&h=511&rs=1&pid=ImgDetMain",
      "title": "Rolex 2023 Special Edition",
      "price": "0.01",
      "tokenId": "01",

    },
    {
      "img": "https://wallpaperaccess.com/full/3046105.jpg",
      "title": "Titan ",
      "price": "0.01",
      "tokenId": "02",
    },
    {
      "img": "https://www.bhphotovideo.com/images/images2500x2500/hp_5yh29ua_aba_pavilion_laptop_15_cs2010nr_core_1473122.jpg",
      "title": "Dell Inspiron Gen 11 512 GB SSD",
      "price": "10",
      "tokenId": "02",
    },
    {
      "img": "https://i5.walmartimages.com/asr/e3ced41b-70f0-4afa-813a-6aa923980501_2.0388a3cf5a00012a75f3d3898a4d1062.jpeg",
      "title": "Apple Macbook Pro ",
      "price": "10",
      "tokenId": "02",
    },
    {
      "img": "https://th.bing.com/th/id/OIP.811Ik93raMnxIKXy20hR7QHaHa?rs=1&pid=ImgDetMain",
      "title": "Apple iphone 14 256 GB",
      "price": "10",
      "tokenId": "02",
    },
    {
      "img": "https://th.bing.com/th/id/OIP.zcXYWVUAe2bSQX8PvoXuNgHaFj?rs=1&pid=ImgDetMain",
      "title": "Samsung Z FOLD",
      "price": "12",
      "tokenId": "03",
    },
    {
      "img": "https://th.bing.com/th/id/OIP.bP7k7Jt1LgSZrlY5Y4RAOwHaHa?rs=1&pid=ImgDetMain",
      "title": "Gucci HandBag",
      "price": "20",
      "tokenId": "05",
    },
    {
      "img": "https://product-images.therealreal.com/VES30706_3_enlarged.jpg",
      "title": "Versace Handbags 2022 Calendar | Walden Wong",
      "price": "15",
      "tokenId": "05",
    },{
      "img": "https://img.giglio.com/images/prodZoom/C20233.001_1.jpg",
      "title": "DOLCE & GABBANA: over T-shirt",
      "price": "5",
      "tokenId": "02",
    },{
      "img": "https://th.bing.com/th/id/OIP.HIEyhONG4vRbksmt4aZZ6wHaHa?rs=1&pid=ImgDetMain",
      "title": "Amiri Eagle Logo T Shirt Black",
      "price": "4",
      "tokenId": "05",
    },
    {
      "img": "https://th.bing.com/th/id/OIP.lefa3HcoNpF9V6CPTpzX1wHaJ4?rs=1&pid=ImgDetMain",
      "title": "Red and White Kurtis for Women",
      "price": "2",
      "tokenId": "05",
    },
    {
      "img": "https://th.bing.com/th/id/OIP.3JmuQdmdxz9GE5lv5s6tgAHaSS?rs=1&pid=ImgDetMain",
      "title": "Kurtis for Women",
      "price": "4",
      "tokenId": "05",
    },
    {
      "img": "https://images-na.ssl-images-amazon.com/images/I/71h5FXDeETL._SL1500_.jpg",
      "title": "HERO CYCLES Sprint Howler 29T",
      "price": "15",
      "tokenId": "1",
    },
  ]

  const [data, updateData] = useState(sampleData)
  const [dataFatched, updateDataFatched] = useState(false)

  const deployAddress = "0x5d73f49F7E6574d3F8232987bF3F263F2DFD1773"

  const getAllData = async () => {
    
    try {
      if(typeof window !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
  
        let allProducts = await contract.getAllProducts()
  
        const items: any = await Promise.all(allProducts.map(async (i: any) => {
  
          // let price = ethers.utils.formatUnits((i.price).toString(), 'ether')
          let price = ethers.utils.formatUnits((i.price).toString(), 'ether')
          // let price = ethers.utils.formatEther((i.price))
          // console.log(i.img)
          let item = {
            price,
            // price: i.price.toString(),
            productId: i.productId,
            seller: i.seller,
            buyer: i.buyer,
            title: i.title,
            desc: i.desc,
            stocks: i.stocks,
            img: typeof i.img !== 'undefined' ? i.img : '',
          }
          return item
        }))
  
        updateData(items)
        updateDataFatched(true)
        // console.log("data: ", data[0].img)
      }


    } catch (error) {
      console.log(error)
    }
  }

  if(!dataFatched) {
    getAllData()
  }

  return (
    <div className='min-h-screen mt-20 ml-9 flex justify-center '>
      <div className="w-10/12 h-screen grid grid-cols-5 ">

        {data.map((value, index) => {
          return <ItemCard data={value} key={index} />
        })}
      </div>
    </div>
  )
}

export default Marketplace