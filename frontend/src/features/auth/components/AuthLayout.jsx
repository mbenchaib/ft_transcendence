import { Link, useLocation } from 'react-router'
import loginCar from '../../../assets/login-car.jpg'

const Hero = () => {
    return (
        <section className="relative h-[40vh] overflow-hidden">
            <img
                src={loginCar}
                alt="Car"
                className="absolute h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/65" />

            <p className="hidden sm:block absolute top-9 right-10 text-xs font-medium tracking-[0.16em] uppercase text-white/70">
                Customer relationships, refined.
            </p>

            <div className="absolute inset-x-0 mx-auto bottom-4 mb-5 max-w-7xl px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8C56D]">
                    CRM for rental car teams
                </p>

                <h1 className="mt-2 font-['Libre_Caslon_Display'] text-white text-3xl md:text-4xl lg:text-5xl leading-tight text-balance">
                    Every customer.<br className="md:hidden lg:block"/>
                    In perfect focus.
                </h1>
            </div>
        </section>
    )
}

const AccessPanel = ({children}) => {
    const location = useLocation()
    const isLogin = location.pathname === "/login"
    const slidingPill = "text-white font-semibold border border-solid border-black bg-black rounded-full"

    return (
        <section className="relative z-10 flex justify-center gap-65 -mt-8">
            <div className="hidden sm:block mt-25 mx-4">
                <p className="text-[#6E6B63] font-normal">
                    Turn every inquiry into a lasting relationship.<br/> 
                    Keep leads, conversations, customer history, and follow-ups<br/>
                    together in one focused workspace
                </p>
                <div className="flex gap-8 mt-9 pt-6 border-t border-[#d8d4ca]">
                    <p className="text-2xl font-['Libre_Caslon_Display'] font-normal text-[#171713]">360°<br/>
                        <span className="mt-2 block text-xs font-sans font-normal text-[#868178]">CUSTOMER VIEW</span>
                    </p>
                     <p className="text-2xl font-['Libre_Caslon_Display'] font-normal text-[#171713]">Never<br/>
                        <span className="mt-2 block text-xs font-sans font-normal text-[#868178]">MISS A FOLLOW-U</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-sm mx-4 rounded-4xl border border-solid border-black/5 bg-[#FBFAF7] p-4 shadow-md overflow-hidden">
                <div className="flex justify-center gap-5 border-solid mt-2 p-1 bg-[#EBE8E0] rounded-full">
                        <Link className={`text-center px-4 py-3 flex-1 ${isLogin ? slidingPill : "text-[#171713]"}`} to="/login">Log in</Link>
                        <Link className={`text-center px-4 py-3 flex-1 ${!isLogin ? slidingPill : "text-[#171713]"}`} to="/setup-business">Set up business</Link>
                </div>
                {children}
            </div>
        </section>
    )
}

const AuthLayout = ({children}) => {

    return (
        <main className="bg-[#F2F0EB]">
            <Hero />
            <AccessPanel>{children}</AccessPanel>
        </main>
    )
}

export default AuthLayout