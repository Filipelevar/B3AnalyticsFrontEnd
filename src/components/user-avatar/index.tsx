import { AvatarCircle } from '@/components/user-avatar/styles'

interface UserAvatarProps {
    name: string
    size?: 'small' | 'medium' | 'large'
}

export function UserAvatar({ name, size = 'medium' }: UserAvatarProps) {
    const initial = name.trim().charAt(0).toUpperCase() || '?'

    return <AvatarCircle $size={size}>{initial}</AvatarCircle>
}
