import { Button } from "../ui/button"

interface HeaderProps {
    title: string
    buttonText?: string
    onClick?: () => void
}

function Header({ title, buttonText, onClick }: HeaderProps) {
    return (
        <div className='border-b h-20 flex items-center justify-between px-5'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
            {buttonText &&
                <Button onClick={onClick} variant="outline">{buttonText}</Button>
            }
        </div>
    )
}

export default Header
