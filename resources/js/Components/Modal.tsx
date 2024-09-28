import { X } from "lucide-react"
import { Input } from "./Input"
import { Select } from "./Select"
import React, { useState } from "react"
import {withMask} from "use-mask-input"
import { Button } from "./Button"
import { useForm } from "react-hook-form"

interface ModalProps {
    handleCloseModal: () => void
}



export function Modal({handleCloseModal}: ModalProps){

    const [selectedType, setSetSelectedType] = useState<string>('')
    const { register, handleSubmit } = useForm()

    const handleFieldDocument = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSetSelectedType(event.target.value)

        // if(event.target.value == 'natural_person'){

        // }
    }

    function onSubmit(data: any){
        console.log(data)
    }



    return (
        <div className="flex justify-center items-center">
            <div>
                <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
                    <div x-transition:enter="transition-opacity ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div x-transition:enter="transition-transform ease-out duration-300" x-transition:enter-start="transform scale-75" x-transition:enter-end="transform scale-100" x-transition:leave="transition-transform ease-in duration-300" x-transition:leave-start="transform scale-100" x-transition:leave-end="transform scale-75"
                        className="
                          bg-white
                            rounded-md
                            shadow-xl
                            overflow-hidden
                            max-w-screen-lg
                            w-full
                            sm:w-96
                            md:w-1/2
                            lg:w-2/3
                            xl:w-lvw
                            xl:h-[800px]
                            z-50
                            flex
                            flex-col
                            h-full
                        "
                    >
                        <div className="bg-indigo-500 text-white px-4 py-3 flex justify-between">
                            <h1 className="text-lg font-semibold">Cadastro de clientes</h1>
                            <button onClick={handleCloseModal}>
                                <X />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex-1 overflow-auto flex flex-col gap-4">
                            <div className="py-2">
                                <h1 className="font-bold text-xl">Dados pessoais</h1>
                            </div>

                            <div className="flex w-full gap-4">
                                <Input
                                    type="text"
                                    label="Nome"
                                    placeholder="Digite seu nome"
                                    {...register('name')}
                                />
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Digite seu e-mail"
                                    {...register('email')}
                                />
                            </div>
                            <div className="flex w-full gap-4">
                                <Select onChange={handleFieldDocument}/>

                                <div className="flex flex-1 flex-col min-w-[20%]">
                                    <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Envie uma imagem</label>
                                    <div className="relative border-dotted  rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">

                                    <div className="absolute">

                                        <div className="flex flex-col items-center">
                                        <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                                        <span className="block text-gray-400 font-normal">50x50</span>
                                        </div>
                                    </div>

                                    <input type="file" className="h-full w-full opacity-0" name=""/>

                                    </div>
                                </div>
                            </div>

                            {selectedType == 'natural_person' ? (
                                <div className="flex w-full gap-4">
                                    <div className="flex flex-1 flex-col min-w-[20%]">
                                        <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">CPF</label>
                                        <input
                                            type="text"
                                            name="cpf"
                                            ref={withMask('999.999.999-99')}
                                            className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                        />
                                        {/* <p className="text-red-500 text-sm mt-1 pl-1">Campo inválido</p> */}
                                    </div>
                                    <div className="flex flex-1 flex-col min-w-[20%]">
                                        <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">RG</label>
                                        <input
                                            type="text"
                                            name="rg"
                                            ref={withMask('99.999.999-9')}
                                            className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                        />
                                        {/* <p className="text-red-500 text-sm mt-1 pl-1">Campo inválido</p> */}
                                    </div>
                                </div>
                            ) : (

                                <>
                                    <div className="flex w-full gap-4">
                                    <div className="flex flex-1 flex-col min-w-[20%]">
                                        <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">CNPJ</label>
                                        <input
                                            type="text"
                                            name="rg"
                                            ref={withMask('999.999.999/9999-99')}
                                            className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                        />
                                        {/* <p className="text-red-500 text-sm mt-1 pl-1">Campo inválido</p> */}
                                    </div>
                                        <Input
                                            type="text"
                                            label="Razão Social"
                                            placeholder="Company tech."
                                        />
                                    </div>
                                    <div className="flex w-full gap-4">
                                        <Input
                                            type="text"
                                            label="Nome Fantasia"
                                            placeholder="Company tech LTDA"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="py-2 flex justify-between">
                                <h1 className="font-bold text-xl">Contato</h1>
                                <Button type="submit" textButton="Adicionar Telefone"/>
                            </div>

                            <div className="flex w-full gap-4 justify-center items-end">
                                <div className="flex flex-1  flex-col min-w-[20%]">
                                    <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Telefone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        ref={withMask('(99) 99999-9999')}
                                        className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                    />
                                    {/* <p className="text-red-500 text-sm mt-1 pl-1">Campo inválido</p> */}
                                </div>
                            </div>

                            <div className="py-2 flex justify-between">
                                <h1 className="font-bold text-xl">Endereço</h1>
                                <Button type="submit" textButton="Adicionar Endereço"/>
                            </div>


                        </form>
                        <div className="border-t px-4 py-3 flex justify-end">
                            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white  rounded-md w-full sm:w-auto">
                                Salvar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        // <h1>to aqui</h1>
    )
}
