import React, { useState } from 'react';
import '../css/main.css';

interface DestinationCard {
    image: string;
    title: string;
}

const Main: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [popularDestinations] = useState<DestinationCard[]>([
        {
            image: '/api/placeholder/300/300',
            title: '사용자가 가고 싶어하는 곳셜제데요',
        },
        {
            image: '/api/placeholder/300/300',
            title: '다른 사용자가 가고 싶어하는 곳',
        },
        {
            image: '/api/placeholder/300/300',
            title: 'D-1일 남았어요',
        },
        {
            image: '/api/placeholder/300/300',
            title: '다른 사용자가 가고 싶어하는 곳',
        },
    ]);

    const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="p-5">
                <form className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search for destinations"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        검색
                    </button>
                </form>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">Explore Popular Destinations</h2>
                <div className="grid grid-cols-auto-fit gap-5 mt-5">
                    {popularDestinations.map((destination, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={destination.image}
                                alt={destination.title}
                                className="w-50 h-50 object-cover rounded-lg"
                            />
                            <h3 className="mt-2 text-lg font-bold">
                                {destination.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;