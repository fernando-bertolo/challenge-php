import { ComponentProps, ReactNode } from "react"

interface ButtonProps extends ComponentProps<'button'> {
    textButton: string
}

export function Button({ textButton, ...props }: ButtonProps) {
    return (
        <button className="flex justify-end items-center" {...props}>
            <span
                className="relative inline cursor-pointer text-md font-medium before:bg-violet-600  before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                {textButton}
            </span>
        </button>
    )
}
