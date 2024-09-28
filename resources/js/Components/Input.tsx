import { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
    label: string
}

export function Input({label,  ...props  }: InputProps) {
    return (
        <div className="flex flex-1 flex-col min-w-[20%]">
            <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">{label}</label>
            <input
                {...props}
                className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
            />
            {/* <p className="text-red-500 text-sm mt-1 pl-1">Campo inválido</p> */}
        </div>
    )
}
