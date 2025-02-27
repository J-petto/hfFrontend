import { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { Alert } from '../types/Alert';
import { ToastAlert } from '../components/ToastAlert';

interface AlertContextType {
    alerts: Alert[];
    unreadCount: number;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    readAlerts: (alertIds: number[]) => Promise<void>;
    setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
    processedAlerts: { [key: number]: string };
    setProcessedAlerts: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
    handleFriendRequest: (requestId: number, alertId: number, action: 'accept' | 'reject') => Promise<void>; // 추가
}

export const AlertContext = createContext<AlertContextType>({
    alerts: [],
    unreadCount: 0,
    hasMore: false,
    loadMore: async () => { },
    readAlerts: async () => { },
    setAlerts: () => { },
    processedAlerts: {},
    setProcessedAlerts: () => { },
    handleFriendRequest: async () => { }  // 추가
});

export const AlertProvider = ({ children, isLoggedIn, isOpen }: { children: ReactNode, isLoggedIn: boolean, isOpen: boolean }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [toast, setToast] = useState<Alert | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const clientRef = useRef<Client | null>(null);
    const [unreadAlerts, setUnreadAlerts] = useState<number[]>([]);
    const latestAlertsRef = useRef<Alert[]>([]);
    const [processedAlerts, setProcessedAlerts] = useState<{ [key: number]: string }>({});

    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')!).data
        : null;

    useEffect(() => {
        latestAlertsRef.current = alerts;
    }, [alerts]);

    const loadMore = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/alerts?page=${page + 1}&size=10`,
                { credentials: 'include' }
            );

            const data = await response.json();
            if (data.resultCode === "200") {
                const newAlerts = data.data.content;
                if (newAlerts.length < 10) {
                    setHasMore(false);
                }
                setAlerts(prev => [...prev, ...newAlerts]);
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error('Failed to load more alerts:', error);
        }
    };

    const readAlerts = async (alertIds: number[]) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/alerts`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ alertIds })
                }
            );

            if (response.ok) {
                setAlerts(prev => prev.map(alert =>
                    alertIds.includes(alert.id)
                        ? { ...alert, isRead: true }
                        : alert
                ));
                setUnreadAlerts(prev => prev.filter(id => !alertIds.includes(id)));
            }
        } catch (error) {
            console.error('알림 읽음 처리 실패:', error);
        }
    };

    useEffect(() => {
        if (!userInfo) return undefined;

        const fetchInitialAlerts = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/alerts?page=0&size=10`,
                    { credentials: 'include' }
                );

                const data = await response.json();
                if (data.resultCode === "200") {
                    setAlerts(data.data.content);
                    setHasMore(data.data.content.length === 10);
                    setPage(0);
                }
            } catch (error) {
                console.error('Failed to fetch alerts:', error);
            }
        };

        fetchInitialAlerts();

        const client = new Client({
            brokerURL: `${import.meta.env.VITE_CORE_WEBSOCKET_BASE_URL}/ws/chat`,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected');
                client.subscribe(`/user/${userInfo.id}/queue/alerts`, message => {
                    console.log('Received alert:', message.body);
                    const newAlert = JSON.parse(message.body);

                    setAlerts(prev => {
                        const newAlerts = [newAlert, ...prev];
                        return newAlerts;
                    });
                });

                client.subscribe(`/user/${userInfo.id}/queue/toast-alerts`, message => {
                    console.log('Received toast:', message.body);
                    const newAlert = JSON.parse(message.body);
                    setToast(newAlert);
                });
            },
            onDisconnect: () => console.log('Disconnected'),
            onStompError: (frame) => {
                console.error('브로커 오류:', frame.headers['message']);
                console.error('추가 정보:', frame.body);
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, [isLoggedIn]);

    useEffect(() => {
        const newUnreadAlerts = alerts
            .filter(alert => !alert.isRead)
            .map(alert => alert.id);
        setUnreadAlerts(newUnreadAlerts);
    }, [alerts]);

    useEffect(() => {
        if (!isOpen && alerts.length > 0) {
            const unreadAlertIds = alerts
                .filter(alert => !alert.isRead)
                .map(alert => alert.id);

            if (unreadAlertIds.length > 0) {
                readAlerts(unreadAlertIds);
            }
        }
    }, [isOpen]);


    const handleFriendRequest = async (requestId: number, alertId: number, action: 'accept' | 'reject') => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_CORE_API_BASE_URL}/api/v1/friends/friend-requests/${requestId}/${action}`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );

            if (response.ok) {
                // 알림의 상태를 업데이트하여 버튼을 제거하고 처리 상태를 표시
                setAlerts(prev => prev.map(alert =>
                    alert.id === alertId
                        ? {
                            ...alert,
                            processedAction: action === 'accept' ? '수락 완료' : '거절 완료'
                        }
                        : alert
                ));

                // 친구 목록 컴포넌트에 이벤트 발송
                const event = new CustomEvent('friendRequestProcessed', {
                    detail: { requestId, action }
                });
                window.dispatchEvent(event);
            }
        } catch (error) {
            console.error('친구 요청 처리 실패:', error);
        }
    };


    return (
        <AlertContext.Provider value={{
            alerts,
            unreadCount: unreadAlerts.length,
            hasMore,
            loadMore,
            readAlerts,
            setAlerts,
            processedAlerts,
            setProcessedAlerts,
            handleFriendRequest  // 추가
        }}>
            {children}
            {toast && <ToastAlert alert={toast} onClose={() => setToast(null)} />}
        </AlertContext.Provider>
    );
};