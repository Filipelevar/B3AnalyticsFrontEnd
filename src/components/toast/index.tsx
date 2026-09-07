import { Toaster } from "react-hot-toast";

export function Toast() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
                transition: "all .2s ease"
            }}
            toastOptions={{
                className: '',
                duration: 5000,
                removeDelay: 1000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },

                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                },
            }}
        />
    )
}
