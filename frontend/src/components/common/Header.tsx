import { Button } from "../ui/button"
import { ChevronLeft } from "lucide-react"

interface HeaderProps {
    title: string
    buttonText?: string
    onClick?: () => void
    showBackButton?: boolean
    onBack?: () => void
}

function Header({ title, buttonText, onClick, showBackButton = false, onBack }: HeaderProps) {
    return (
        <div className='border-b h-20 flex items-center justify-between px-5'>
            <div className='flex items-center gap-4'>
                {showBackButton && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onBack}
                        className="hover:bg-secondary"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                )}
                <h1 className='text-3xl font-semibold'>{title}</h1>
            </div>
            {buttonText &&
                <Button onClick={onClick}>{buttonText}</Button>
            }
        </div>
    )
}

export default Header
