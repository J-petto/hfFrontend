import { useEffect } from 'react';

const Test = () => {
    console.log("url : " + import.meta.env.VITE_CORE_API_BASE_URL + "/api/v1/Posts/all");

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_CORE_API_BASE_URL + "/api/v1/Posts/all", {
                    method: "GET", // GET 요청 설정
                    headers: {
                        "Content-Type": "application/json", // JSON 타입 요청 헤더
                    },
                    credentials: "include", // 쿠키를 자동으로 포함시킬 수 있도록 설정
                });

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
    }, []);

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