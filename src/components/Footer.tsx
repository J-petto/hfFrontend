// Footer.tsx
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 z-30">
            <div className="max-w-[600px] lg:max-w-screen-lg mx-auto h-full">
                <nav className="h-full flex justify-around items-center">
                    <Link to="/" className="flex flex-col items-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-xs mt-1">홈</span>
                    </Link>
                    <Link
                        to="/posts"
                        className={`flex flex-col items-center justify-center ${location.pathname === '/posts' ? 'text-primary font-medium' : 'text-gray-500'
                            }`}
                    >
                        <svg
                            className={`w-6 h-6 mb-1 ${location.pathname === '/posts' ? 'text-primary' : 'text-gray-500'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                        </svg>
                        <span>축제/정보</span>
                    </Link>
                    <Link
                        to="/chatroom"
                        className={`flex flex-col items-center justify-center ${location.pathname === '/chatroom' ? 'text-primary font-medium' : 'text-gray-500'
                            }`}
                    >
                        <svg
                            className={`w-6 h-6 mb-1 ${location.pathname === '/chatroom' ? 'text-primary' : 'text-gray-500'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <span>모임</span>
                    </Link>
                    <Link to="/mypage" className="flex flex-col items-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs mt-1">마이페이지</span>
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer