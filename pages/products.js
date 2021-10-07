import ProductList from '../components/products/productList'
import commerce from '../lib/commerce'
import Button from '../components/Button'
import { React, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../layout/layout'
import Card from '../components/Card'

export async function getStaticProps() {
  const { data: products } = await commerce.products.list()


  return {
    props: {
      products,
    }
  }
}

export default function ProductPage({ products }) {

  const [aim, setAim] = useState([])
  const [prod,setProd] = useState()
  useEffect(() => {
    commerce.products.list({category_slug:[aim]}).then(result => {
      setProd(result.data);
    });
  }, [aim]);



console.log(aim)
const printButtonLabel = (event) => {
  setAim(event.target.name)
};


return (
  <>

    <>

      <div className="">
        <div className="flex flex-wrap md:flex-nowrap  flex-1 min-w-full" data-aos-id-blocks>

          <div className="md:w-1/4 w-full  flex items-stretch grid-1 max-h-44">
            <div className="md:flex hidden  md:flex-wrap flex-1 p-4">

              <div className="w-full h-screen shadow-md bg-gray-300 rounded-lg">
                <h1 className="text-2xl font-italic px-12 py-4">Trade Only</h1>
                <div className="w-full flex px-12 flex-wrap">
                  <Link href="/contact">
                    <button className="py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" >
                      Contact Us
                    </button>

                  </Link>


                  <Link href="/about">
                    <button className="py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" >
                      Price Enquiry
                    </button>
                  </Link>

                </div>

              </div>
              <div className="w-full h-screen my-8 shadow-md bg-gray-300 rounded-lg">
                <h1 className="text-2xl font-italic px-12 py-4">Newsletter</h1>
                <h2 className="text-sm px-12">Get the latest updates, news and product offers via email</h2>
                <div className="px-12 py-4">
                  <input className="rounded-lg" placeholder="Email"></input>
                  <button className="py-2 px-4 my-2 bg-black text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" >
                    Subscribe
                  </button>

                </div>
              </div>

            </div>
          </div>

          <div className="md:w-3/4 w-full flex flex-wrap items-stretch grid2">
            <div className="flex  flex-wrap flex-1 min-w-full">

              <div className="w-full flex p-4 items-stretch md:h-tam h-screen">
                <div className="bg-productsbg bg-cover bg-left-top flex relative w-full rounded-lg">
                  <h1 className="text-3xl font-bold text-white font-sans absolute top-8 left-2">Products</h1>
                </div>
              </div>


              <div className="absolute md:top-55 top-80 w-full md:w-3/4 px-4 ">

                <div className="flex w-full" data-aos-id-blocks>

                  <div className="md:px-1 px-auto space-y-2 space-x-2">
                    <Button buttons={["All", "Harness", "Garter", "Leather", "Latex", "Fetish"]} doSomethingAfterClick={printButtonLabel} />
                  </div>

                </div>
              </div>




              <div className="bg-white">
                <div className="max-w-2xl mx-auto px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

                  {prod == undefined ?
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                                    {products.map((product) => (
                
                                      <Card {...product} key={product.id} />
                                    ))}
                                  </div>
                                  :
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                                  {prod.map((product) => (
              
                                    <Card {...product} key={product.id} />
                                  ))}
                                </div>

                }




                </div>
              </div>








            </div>

          </div>






        </div>
      </div>





    </>





  </>
)

}


ProductPage.Layout = Layout