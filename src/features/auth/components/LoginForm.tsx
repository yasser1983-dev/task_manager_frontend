'use client';

import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import {Message} from 'primereact/message';
import {Card} from 'primereact/card';
import {useLogin} from "@/features/auth/useLogin";


export default function LoginForm() {
    const {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        error,
        handleLogin,
    } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card title="Iniciar sesión" className="w-full max-w-md shadow-lg">
                {error && <Message severity="error" text={error} className="mb-4" />}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-gray-700">
                            Usuario
                        </label>
                        <InputText
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-gray-700">
                            Contraseña
                        </label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                            required
                            className="w-full"
                            inputClassName="w-full"
                        />
                    </div>

                    <Button
                        label={loading ? 'Cargando...' : 'Ingresar'}
                        type="submit"
                        className="w-full bg-yellow-400 border-yellow-400 hover:bg-yellow-500"
                        loading={loading}
                    />
                </form>
            </Card>
        </div>
    );
}