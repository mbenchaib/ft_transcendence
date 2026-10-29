import { Link } from 'react-router'
import loginCar from '../../../assets/login-car.jpg'

const AuthLayout = ({children}) => {

    return (
        <main>
            <section className="relative h-[40vh] overflow-hidden">
                <img
                    src={loginCar}
                    alt="Car"
                    className="absolute h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/65" />

                {/* <p className="hidden sm:block absolute top-9 right-10 text-xs font-medium tracking-[0.16em] uppercase text-white/70">
                    Customer relationships, refined.
                </p> */}

                <div className="absolute left-4 right-4 bottom-4 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C56D]">
                        CRM for rental car teams
                    </p>

                    <h1 className="mt-2 font-['Libre_Caslon_Display'] text-white text-4xl leading-tight text-balance">
                        Every customer. In perfect focus.
                    </h1>
                    {/* <h1 className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-balance text-white sm:text-4xl md:text-6xl">
                        Every customer. In perfect focus.
                    </h1> */}
                </div>
                <Link to="/login">Log in</Link>
                <Link to="/setup-business">Set up business</Link>
            </section>

            <section className="relative z-10 flex justify-center h-[50vh] -mt-5">
                <div className="hidden sm:block">
                    <p>
                        Turn every inquiry into a lasting relationship. 
                        Keep leads, conversations, customer history, and follow-ups 
                        together in one focused workspace
                    </p>
                    <p>360 CUSTOMER VIEW NEVER MISS A FOLLOW-UP</p>
                </div>

                <div className="flex flex-col w-full max-w-sm mx-4 rounded-4xl border border-red-500 bg-white p-4 shadow-md">
                    <div className="flex justify-center gap-5 border border-red-500 mt-2 p-1 bg-[#EBE8E0] rounded-full">
                         <Link className="text-black" to="/login">Log in</Link>
                         <Link className="text-black" to="/setup-business">Set up business</Link>
                    </div>
                    

                    {children}

                  
                </div>
                  {/* <div className="flex justify-center w-full">
                        <Link className="text-white font-semibold rounded-full border border-red-500 bg-black p-4" to="/login">Log in</Link>
                        <Link className="text-white font-semibold rounded-full border border-red-500 bg-white p-4" to="/setup-business">Set up business</Link>
                    </div> */}
                {/* {children} */}
            </section>

        </main>
    )
}

export default AuthLayout