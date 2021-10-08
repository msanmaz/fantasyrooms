
import Link from 'next/link'
export default function Cats() {

    return (
        <>
            <div className="px-4 relative isix md:mt-20 mb-20">
                <h2 className="md:text-3xl text-2xl font-bold flex justify-center text-black dark:text-white">Our Categories</h2>


                <div className="flex flex-wrap md:flex-nowrap flex-1 min-w-full px-4" data-aos-id-blocks>



                    <Link href="/">
                    <div className="md:w-3/0 w-full hidden cursor-pointer catcat  md:flex grid-1 px-4 md:px-auto">
                        <div className="flex mt-4 md:max-h-31 flex-1 p-2 hover:opacity-75 rounded-lg bg-center bg-cover" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1587535318578-d56c9c886112?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80)"}}>
                            <div className="flex items-stretch">

                                <div class="absolute bottom-20 left-10 mx-5 mt-2 flex justify-between items-center">
                                <a href="#" class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">Discover Our Latest Bustiers
                                </a>
                                </div>


                                <main class="p-2 z-10">
                                <a href="#" class="text-xs bg-pink-500 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">Fantasy Bustier</a>

                              
                                </main>
                            </div>

                        </div>
                    </div>
                    </Link>
                    <div className="md:w-3/4 w-full flex flex-wrap items-stretch grid2">
                        <div className="flex  flex-wrap flex-1 min-w-full">

                            <div className="md:w-1/2 w-full flex p-2 items-stretch md:h-tam h-screen">


                            <Link href="/haircare/hairwax">

                                <div className="bg-shave catcat cursor-pointer bg-cover bg-center flex relative w-full rounded-lg">
                                    <div class="absolute rounded-lg bottom-0 mt-20 right-0 top-1 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                                    <div class="absolute bottom-1 left-0 mx-5 mt-2 flex justify-between items-center">
                                        <a href="#" class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">Discover Our Latest Harness
    </a>
                                    </div>
                                    <main class="p-5 z-10">

                                            <div className="cursor-pointer text-xs bg-pink-500 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">
                                                Harness
                                                </div>

                                    </main>

                                </div>
                                </Link>
                            </div>


                            <div className="md:w-1/2 w-full flex p-2 cursor-pointer items-stretch md:h-tam h-screen">
                            <Link href="/beardandshave">

                                <div className="bg-razor1 catcat bg-cover bg-center flex relative w-full rounded-lg">
                                    <div class="absolute rounded-lg bottom-0 mt-20 right-0 top-1 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                                    <div class="absolute bottom-1 left-0 mx-5 mt-2 flex justify-between items-center">
                                        <a href="#" class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">Discover Our Latest Latex&Leather
    </a>
                                    </div>
                                    <main class="p-5 z-10">

                                        <a href="#" class="text-xs bg-pink-500 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">Latex&Leather</a>

                                    </main>

                                </div>
                                </Link>
                            </div>
                            <Link href="/haircare">

                            <div className="md:w-1/3 w-full flex p-2 items-stretch h-screen md:h-cate ">
                                <div className="bg-products catcat bg-cover bg-center flex relative w-full rounded-lg">
                                    <div class="absolute rounded-lg bottom-0 mt-20 right-0 top-1 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                                    <div class="absolute bottom-1 left-0 mx-5 mt-2 flex justify-between items-center">
                                        <a href="#" class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">Discover Our Latest Fantasy Garter
    </a>
                                    </div>
                                    <main class="p-5 z-10">

                                        <a href="#" class="text-xs bg-pink-500 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">Fantasy Garter</a>

                                    </main>

                                </div>
                            </div>

                            </Link>
                            <div className="md:w-1/3 w-full flex p-2 items-stretch h-screen md:h-cate ">


                            <Link href="/barbering/electrical">
                                <div className="bg-trimmer catcat bg-cover bg-center flex relative w-full rounded-lg">
                                    <div class="absolute rounded-lg bottom-0 mt-20 right-0 top-1 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                                    <div class="absolute bottom-1 left-0 mx-5 mt-2 flex justify-between items-center">
                                        <a href="#" class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">Discover Our Latest Bustier Products
    </a>
                                    </div>
                                    <main class="p-5 z-10">

                                        <a href="#" class="text-xs bg-pink-500 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">Bustier Fantasy</a>

                                    </main>

                                </div>
                                </Link>
                            </div>

                            <Link href="/beardandshave/razors">
                            <div className="md:w-1/3 w-full catcat flex p-2 cursor-pointer items-stretch h-screen md:h-cate ">
                                <div className="bg-razor bg-cover bg-center flex relative w-full rounded-lg">
                                    <div class="absolute rounded-lg bottom-0 mt-20 right-0 top-1 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                                    <div class="absolute bottom-1 left-0 mx-5 mt-2 flex justify-between items-center">
                                        <a href="#" class="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">Discover Our Latest Costumes Products
    </a>
                                    </div>
                                    <main class="p-5 z-10">

                                        <a href="#" class="text-xs bg-pink-500 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">Costumes</a>

                                    </main>

                                </div>
                            </div>
                            </Link>
                        </div>








                    </div>






                </div>


                <div className="px-4">
                    <button className="py-2 mt-4 w-full md:px-4 px-0 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75">
                        See All Products
                </button>
                </div>


            </div>

        </>
    )
}