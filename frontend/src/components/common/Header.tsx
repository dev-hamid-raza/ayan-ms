import type React from "react"

interface HeaderProps {
    title: string
    button?: React.ReactNode
}

function Header({ title, button }: HeaderProps) {
    return (
        <div className='border-b h-20 flex items-center justify-between px-5'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
            {button}
        </div>
    )
}

export default Header
