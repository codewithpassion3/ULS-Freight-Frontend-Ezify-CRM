// components/SSETest.tsx
import { useEffect, useState, useRef } from 'react';

interface Notification {
  userNotificationId: number;
  notificationId: number;
  type: string;
  severity: string;
  payload: {
    title: string;
    message: string;
    actionUrl?: string;
    entityType?: string;
    entityId?: number;
    metaData?: any;
  };
  createdAt: string;
  actorId?: number;
}

export function SSETest() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [clientId, setClientId] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    connectSSE();

    // Cleanup on unmount
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const connectSSE = () => {
    setConnectionStatus('connecting');

    // Replace with your actual companyId or get from context
    const companyId = 1;
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/stream?companyId=${companyId}`,
      { withCredentials: true } // Important for cookie-based auth
    );

    eventSourceRef.current = es;

    // Connection opened
    es.onopen = () => {
      setConnectionStatus('connected');
      console.log(':white_check_mark: SSE Connected');
    };

    // Handle specific events
    es.addEventListener('connected', (e) => {
      const data = JSON.parse(e.data);
      setClientId(data.clientId);
      console.log(':link: Session:', data);
    });

    // Handle new notifications
    es.addEventListener('notification.new', (e) => {
      const data: Notification = JSON.parse(e.data);
      console.log(':bell: New Notification:', data);

      setNotifications(prev => [data, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Show browser notification if permitted
      if (Notification.permission === 'granted') {
        new Notification(data.payload.title, {
          body: data.payload.message,
          icon: '/favicon.ico'
        });
      }
    });

    // Default message handler (fallback)
    es.onmessage = (e) => {
      console.log(':incoming_envelope: Raw message:', e.data);
    };

    // Error/Disconnect
    es.onerror = (error) => {
      console.error(':x: SSE Error:', error);
      setConnectionStatus('disconnected');
      es.close();

      // Auto-reconnect after 3 seconds
      setTimeout(() => {
        console.log(':arrows_counterclockwise: Attempting reconnect...');
        connectSSE();
      }, 3000);
    };
  };

  const markAsRead = async (userNotificationId: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/${userNotificationId}/read`, {
        method: 'POST',
        credentials: 'include'
      });
      setUnreadCount(prev => Math.max(0, prev - 1));

      // Update local state to show as read
      setNotifications(prev =>
        prev.map(n =>
          n.userNotificationId === userNotificationId
            ? { ...n, read: true }
            : n
        )
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const requestBrowserPermission = () => {
    Notification.requestPermission();
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>:bell: SSE Notification Test</h1>

      {/* Connection Status */}
      <div style={{
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: connectionStatus === 'connected' ? '#4CAF50' :
                        connectionStatus === 'connecting' ? '#FF9800' : '#F44336',
        color: 'white',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>
          Status: <strong>{connectionStatus.toUpperCase()}</strong>
          {clientId && <span style={{ fontSize: '12px', marginLeft: '10px' }}>(ID: {clientId})</span>}
        </span>
        <button onClick={connectSSE} style={{ padding: '5px 10px' }}>
          Reconnect
        </button>
      </div>

      {/* Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={requestBrowserPermission}>
          :bell: Enable Desktop Alerts
        </button>
        <button onClick={clearNotifications}>
          :wastebasket: Clear All ({notifications.length})
        </button>
        <span style={{
          background: '#2196F3',
          color: 'white',
          padding: '5px 15px',
          borderRadius: '20px',
          fontWeight: 'bold'
        }}>
          Unread: {unreadCount}
        </span>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notifications.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#999',
            border: '2px dashed #ddd',
            borderRadius: '8px'
          }}>
            No notifications yet.<br/>
            <small>Create a quote/shipment to see live updates!</small>
          </div>
        ) : (
          notifications.map((notif, index) => (
            <div
              key={notif.userNotificationId}
              style={{
                padding: '15px',
                borderRadius: '8px',
                borderLeft: `4px solid ${
                  notif.severity === 'urgent' ? '#F44336' :
                  notif.severity === 'high' ? '#FF9800' :
                  notif.severity === 'normal' ? '#2196F3' : '#4CAF50'
                }`,
                backgroundColor: '#F5F5F5',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={() => {
                if (notif.payload.actionUrl) {
                  window.open(notif.payload.actionUrl, '_blank');
                }
                markAsRead(notif.userNotificationId);
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <span style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    color: '#666',
                    fontWeight: 'bold'
                  }}>
                    {notif.type}
                  </span>
                  <h3 style={{ margin: '5px 0', fontSize: '16px' }}>
                    {notif.payload.title}
                  </h3>
                  <p style={{ margin: '5px 0', color: '#555' }}>
                    {notif.payload.message}
                  </p>

                  {notif.payload.metaData && (
                    <details style={{ marginTop: '8px', fontSize: '12px' }}>
                      <summary>Metadata</summary>
                      <pre style={{
                        background: '#E0E0E0',
                        padding: '8px',
                        borderRadius: '4px',
                        overflow: 'auto'
                      }}>
                        {JSON.stringify(notif.payload.metaData, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>

                <span style={{ fontSize: '12px', color: '#999', whiteSpace: 'nowrap' }}>
                  {new Date(notif.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                {notif.payload.actionUrl && (
                  <a
                    href={notif.payload.actionUrl}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: '#2196F3',
                      textDecoration: 'none',
                      fontSize: '13px'
                    }}
                  >
                    View Details →
                  </a>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsRead(notif.userNotificationId);
                  }}
                  style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    background: '#E0E0E0',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Mark Read
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Debug Info */}
      <details style={{ marginTop: '30px', padding: '10px', background: '#FAFAFA', borderRadius: '4px' }}>
        <summary>Debug Info</summary>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {JSON.stringify(notifications, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default SSETest;