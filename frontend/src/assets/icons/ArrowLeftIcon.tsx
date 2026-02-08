import type { SVGProps } from 'react'

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        {...props}
    >
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 19l-7-7 7-7'
        />
    </svg>
)

export default ArrowLeftIcon
