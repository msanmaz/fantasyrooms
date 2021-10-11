import Link from 'next/link'

import commerce from 'lib/commerce'
import SecondCard from 'components/SecondCard'
import Layout from 'components/layout'
import ProductList from 'components/products/productList'

export async function getStaticPaths() {
  const { data: categories } = await commerce.categories.list()

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const category = await commerce.categories.retrieve(slug, {
    type: 'slug'
  })

  const { data: products } = await commerce.products.list({
    category_slug: [slug]
  })

  return {
    props: {
      category,
      products
    }
  }
}

export default function CategoryPage({ category, products }) {
  console.log(category)
  return (
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
              <div className="w-full h-screen my-8 shadow-md bg-gray-300 rounded-lg -mt-20 ">
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
                  </div>

                </div>
              </div>




              <div className="bg-white">
                <div className="max-w-2xl py-14 mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">

            
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                                    {products.map((product) => (
                
                                      <SecondCard {...product} key={product.id} />
                                    ))}
                                  </div>
      




                </div>
              </div>








            </div>

          </div>






        </div>
      </div>



    </>





  )
}


CategoryPage.Layout = Layout