import PageLayout from '../PageLayout.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { useState } from 'react';

export default function AuthStatus() {
    const { user, ready, signOut } = useAuth() || {};
    const [loading, setLoading] = useState(false);

    const onLogout = async () => {
        setLoading(true);
        try {
            await signOut?.();
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <div style={{ padding: 24, fontFamily: 'system-ui', display: 'flex', alignItems: 'center', gap: 12 }}>
                {!ready ? (
                    <span>Перевіряю…</span>
                ) : (
                    <>
            <span
                aria-hidden
                style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: user ? '#22c55e' : '#ef4444'
                }}
            />
                        <span>{user ? 'Ви залогінені' : 'Ви не залогінені'}</span>

                        {user && (
                            <button
                                onClick={onLogout}
                                disabled={loading}
                                style={{
                                    marginLeft: 8,
                                    padding: '6px 12px',
                                    borderRadius: 8,
                                    border: '1px solid #444',
                                    cursor: loading ? 'default' : 'pointer'
                                }}
                            >
                                {loading ? 'Виходжу…' : 'Вийти'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </PageLayout>
    );
}


//В ЦЬОМУ ФАЙЛІ ЧАТ GPT КОРОЛЬ(бо цей файлик чисто для швиденьких тестиків(っ °Д °;)っ)
