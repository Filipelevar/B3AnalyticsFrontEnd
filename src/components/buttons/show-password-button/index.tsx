import { FiEye, FiEyeOff } from 'react-icons/fi'

type ShowPasswordButtonProps = {
    clickFunction: () => void
    isShowing: boolean
}

export function ShowPasswordButton({
    clickFunction,
    isShowing,
}: ShowPasswordButtonProps) {
    return (
        <button
            id="visibility"
            type="button"
            aria-label={isShowing ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={clickFunction}
        >
            {isShowing ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
    )
}