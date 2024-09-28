import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<'select'> {}

export function Select({ ...props }: SelectProps) {
    return (
        <div className="flex flex-1 flex-col min-w-[20%]">
            <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Selecione o tipo de pessoa</label>

            <select {...props} className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out">
                <option value="">Ver opções</option>
                <option value="natural_person">Pessoa fisica</option>
                <option value="juridic_person">Pessoa jurídica</option>
            </select>
        </div>
    )
}
