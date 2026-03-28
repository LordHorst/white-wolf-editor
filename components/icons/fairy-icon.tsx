// components/icons/fairy-icon.tsx
import type {LucideProps} from "lucide-react"

export function Fairy(props: LucideProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Head */}
            <circle cx="12" cy="5" r="2"/>
            {/* Body */}
            <path d="M12 7v6"/>
            {/* Arms */}
            <path d="M9 10h6"/>
            {/* Legs */}
            <path d="M12 13l-2 5"/>
            <path d="M12 13l2 5"/>
            {/* Wings (left) */}
            <path d="M8 8c-3-1-4 2-3 4s3 2 4 0"/>
            {/* Wings (right) */}
            <path d="M16 8c3-1 4 2 3 4s-3 2-4 0"/>
            {/* Wand sparkle */}
            <path d="M17 3l1 1"/>
            <path d="M19 2v2"/>
            <path d="M18 1h2"/>
        </svg>
    )
}