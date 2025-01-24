import { useEffect } from 'react';

const Test = () => {
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_CORE_API_BASE_URL + "/api/v1/festivalPosts/all");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const posts = await response.json();
                console.log('All Posts:', posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchAllPosts();
    }, []); // Empty dependency array means this effect runs once on component mount

    return (
        <div>
            <div>
                <a href="https://vite.dev" target="_blank">
                    {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
                </a>
                <a href="https://react.dev" target="_blank">
                    {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
                </a>
            </div>
            <h1>Vite + React</h1>
            <p>Check the console for fetched posts</p>
        </div>
    );
};

export default Test;