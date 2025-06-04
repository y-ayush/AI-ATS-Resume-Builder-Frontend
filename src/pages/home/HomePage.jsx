import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import resume1 from "@/assets/resume1.png";
import resume2 from "@/assets/resume2.png";
import resume3 from "@/assets/resume3.png";

function HomePage() {
    const user = useSelector((state) => state.editUser.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        window.open("https://github.com/y-ayush", "_blank");
    };

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const response = await startUser();
                if (response.statusCode == 200) {
                    dispatch(addUserData(response.data));
                } else {
                    dispatch(addUserData(""));
                }
            } catch (error) {
                console.log("Home Page error:", error.message);
                dispatch(addUserData(""));
            }
        };
        fetchResponse();
    }, []);

    const handleGetStartedClick = () => {
        user ? navigate("/dashboard") : navigate("/auth/sign-in");
    };

    return (
        <>
            <Header user={user} />
            <section className="pt-16 pb-20 bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Swiper */}
                    <aside className="w-full">
                        \
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="rounded-xl"
                        >
                            {[resume1, resume2, resume3].map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img}
                                        alt={`Resume ${i + 1}`}
                                        className="rounded-xl border border-gray-700 shadow-md object-contain w-full"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </aside>

                    {/* Right: Text and Buttons */}
                    <div className="text-gray-100 text-center md:text-left">
                        <h1 className="mb-6 text-4xl font-extrabold md:text-5xl leading-tight">
                            AI-ATS Resume Builder
                        </h1>
                        <p className="mb-8 text-lg text-gray-300">
                            Build. Refine. Shine.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button
                                onClick={handleGetStartedClick}
                                className="bg-gray-800 px-6 py-3 rounded-2xl text-lg hover:opacity-90 transition-opacity"
                            >
                                Start Building
                            </button>
                            <button
                                onClick={handleClick}
                                className="bg-gray-800 px-6 py-3 rounded-2xl text-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
                            >
                                Github <FaGithub />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;
