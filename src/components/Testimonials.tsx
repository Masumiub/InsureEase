'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const reviews = [
    {
        name: "Arif Hossain",
        username: "@arif",
        body: "Insurance Arena helped me sharpen my arguments. Great community and features!",
        img: "https://avatar.vercel.sh/arif",
    },
    {
        name: "Maliha Sultana",
        username: "@maliha",
        body: "Loved the interactive debating rooms. Best platform for students.",
        img: "https://avatar.vercel.sh/maliha",
    },
    {
        name: "Samiul Islam",
        username: "@samiul",
        body: "The voting system and leaderboard make Insurances more engaging.",
        img: "https://avatar.vercel.sh/samiul",
    },
    {
        name: "Nabila Chowdhury",
        username: "@nabila",
        body: "User-friendly interface and responsive team. A must-use for Insurancers.",
        img: "https://avatar.vercel.sh/nabila",
    },
    {
        name: "Riyad Mahmud",
        username: "@riyad",
        body: "Best platform to practice real-time Insurances and receive feedback.",
        img: "https://avatar.vercel.sh/riyad",
    },
    {
        name: "Tasfia Noor",
        username: "@tasfia",
        body: "I improved my speaking skills with daily Insurance sessions. Awesome!",
        img: "https://avatar.vercel.sh/tasfia",
    },
    {
        name: "Noman Kabir",
        username: "@noman",
        body: "Finally found a Insurance platform that’s modern and easy to use.",
        img: "https://avatar.vercel.sh/noman",
    },
    {
        name: "Zara Ahmed",
        username: "@zara",
        body: "I met like-minded people here and learned so much from them.",
        img: "https://avatar.vercel.sh/zara",
    },
    {
        name: "Ashiqur Rahman",
        username: "@ashiq",
        body: "Engaging topics, fair voting system, and active moderators. Love it!",
        img: "https://avatar.vercel.sh/ashiq",
    },
];

const reviews2nd = [
    {
        name: "Sumaiya Jahan",
        username: "@sumaiya",
        body: "Insurance Arena helped me prepare for competitions with real challenges.",
        img: "https://avatar.vercel.sh/sumaiya",
    },
    {
        name: "Imran Hossain",
        username: "@imran",
        body: "A wonderful place to polish critical thinking and argumentation.",
        img: "https://avatar.vercel.sh/imran",
    },
    {
        name: "Ruma Akter",
        username: "@ruma",
        body: "I started as a beginner and now I lead Insurances confidently!",
        img: "https://avatar.vercel.sh/ruma",
    },
    {
        name: "Jawad Karim",
        username: "@jawad",
        body: "Perfect for high school and university Insurancers. Very motivating.",
        img: "https://avatar.vercel.sh/jawad",
    },
    {
        name: "Tania Binte",
        username: "@tania",
        body: "Topics are timely, and the platform is super intuitive.",
        img: "https://avatar.vercel.sh/tania",
    },
    {
        name: "Saad Uddin",
        username: "@saad",
        body: "Love the supportive environment and continuous updates!",
        img: "https://avatar.vercel.sh/saad",
    },
    {
        name: "Rafiha Naz",
        username: "@rafiha",
        body: "It's like social media for Insurancers—fun and productive!",
        img: "https://avatar.vercel.sh/rafiha",
    },
    {
        name: "Mehedi Hasan",
        username: "@mehedi",
        body: "Improved my research and reasoning skills a lot here.",
        img: "https://avatar.vercel.sh/mehedi",
    },
    {
        name: "Anika Ferdous",
        username: "@anika",
        body: "Highly recommend for aspiring Insurancers and learners.",
        img: "https://avatar.vercel.sh/anika",
    },
];

const Testimonials = () => {
    return (
        <div className='overflow-x-hidden'>
            <div className='text-center mt-20'>
                <h2 className='text-5xl font-semibold'>Testimonials</h2>
                <p className='mt-2'>See what our community says about Insurance Ease.</p>
            </div>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper mt-10"
            >
                {reviews.map((review, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="border border-base-300 px-6 flex gap-4 rounded-2xl shadow-sm items-center justify-center h-40">
                            <div>
                                <img src={review.img} alt="user" className="w-13 h-13 rounded-full object-cover" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h2 className="font-bold">{review.name}</h2>
                                <p className="text-xs text-gray-500">Insurancer</p>
                                <p className="text-xs mt-2 leading-snug line-clamp-3">{review.body}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper mt-10"
            >
                {reviews2nd.map((review, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="border border-base-300 px-6 flex gap-4 rounded-2xl shadow-sm items-center justify-center h-40">
                            <div>
                                <img src={review.img} alt="user" className="w-13 h-13 rounded-full object-cover" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <h2 className="font-bold">{review.name}</h2>
                                <p className="text-xs text-gray-500">Insurancer</p>
                                <p className="text-xs mt-2 leading-snug line-clamp-3">{review.body}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;