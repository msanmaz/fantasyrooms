import React from 'react'

const Hero = () => {
    return (
<div className=" bg-white overflow-hidden bg-cover lg:inset-y-0 lg:right-0 lg:w-full"
style={{'background-image': 'linear-gradient(rgba(0 0 0 / 60%), rgba(0 0 0 /60%)), url(/slide2-lingerie.jpeg)'
}}>
  <div className="max-w-7xl mx-auto">
    <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <svg className="hidden absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <div>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">

          </nav>
        </div>

        <div className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
  
        </div>
      </div>

      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block xl:inline">A place of elegance </span>
            <span className="block text-indigo-600 xl:inline">and seduction</span>
          </h1>
          <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
           We offer you erotic and fantasy costumes that will give you exciting and colorful nights. Do something for yourself and your relationship today!          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Shop Now
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                About Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

</div>
    )
}

export default Hero
