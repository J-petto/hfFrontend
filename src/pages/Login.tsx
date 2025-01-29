import { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import kakaoLogo from '../assets/images/kakao-logo.png'

interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const socialLoginForKakaoUrl = `http://localhost:8090/oauth2/authorization/kakao`; // 카카오 로그인 요청 URL
    const redirectUrlAfterSocialLogin = "http://localhost:5173"; // 카카오 로그인 후 리다이렉트 URL


    // 로그인 폼 입력 값 상태 관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        console.log(import.meta.env.VITE_CORE_API_BASE_URL);

        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_CORE_API_BASE_URL + '/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: 'include', // 쿠키 포함
            });

            if (response.ok) {
                setIsLoggedIn(true);
                window.location.href = '/'; // 홈 페이지로 리다이렉트
            } else {
                console.error('로그인 실패');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white lg:bg-gray-100">
            <AuthHeader />
            <div className="flex-1 flex flex-col justify-center px-4 pt-16 lg:pt-0">
                <div className="max-w-[430px] lg:max-w-screen-sm mx-auto w-full lg:bg-white lg:p-8 lg:rounded-2xl lg:shadow-md">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800">로그인</h2>
                        <p className="text-gray-500 mt-2">환영합니다</p>
                    </div>


                    {/* 로그인 폼 */}
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                placeholder="이메일"
                                className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="비밀번호"
                                className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                        >
                            로그인
                        </button>
                    </form>


                    {/* 회원가입 링크 */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-500">
                            아직 회원이 아니신가요?{' '}
                            <a href="/signup" className="text-primary font-medium">
                                회원가입
                            </a>
                        </p>
                    </div>


                    {/* 소셜 로그인 */}
                    <div className="mt-8 px-4"> {/* 좌우 여백 추가 */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">간편 로그인</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href={`${socialLoginForKakaoUrl}?redirectUrl=${redirectUrlAfterSocialLogin}`}
                                className="block w-full"
                            >
                                <img
                                    src={kakaoLogo}
                                    alt="카카오 계정으로 로그인"
                                    className="w-full max-w-[400px] h-[60px] mx-auto cursor-pointer" // 크기 조정
                                    style={{
                                        aspectRatio: '600/90',
                                        objectFit: 'contain'
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 