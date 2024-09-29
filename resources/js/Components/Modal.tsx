import { X } from "lucide-react"
import { Input } from "./Input"
import { Select } from "./Select"
import React, { useEffect, useState } from "react"
import { Button } from "./Button"
import { FieldValues, useForm, useFieldArray } from "react-hook-form"
import InputMask from 'react-input-mask'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Inertia } from "@inertiajs/inertia"


interface ModalProps {
    handleCloseModal: () => void
}



interface FormData {
    name: string;
    email: string;
    addresses: {
        address: string;
        postal_code: string;
        state: string;
        district: string;
        city: string;
        number: string;
    }[];
    phones: {
        phone_number: string;
    }[];
    cpf: string;
    cnpj: string;
    rg: string;
    social_reason: string;
    fantasy_name: string;
    type: string
}





export function Modal({handleCloseModal}: ModalProps){

    const [selectedType, setSetSelectedType] = useState<string>('')
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
        control

    } = useForm<FormData>({
        defaultValues: {
            addresses: [{address: "", postal_code: "", state: "", district: "", city: "", number: ""}],
            phones: [{phone_number: ""}],
        },
    });

    // FieldArray para endereços
    const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
        control,
        name: "addresses",
    });

    // FieldArray para telefones
    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: "phones",
    });


    const handleFieldDocument = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSetSelectedType(event.target.value)
        if(event.target.value == 'natural_person'){
            setValue('cnpj', '')
            setValue('social_reason', '')
            setValue('fantasy_name', '')
        } else {
            setValue('cpf', '')
            setValue('rg', '')
        }
    }

    function onSubmit(data: FieldValues){
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

        fetch('http://localhost:8000/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if(!response.ok) {
                console.log(response);
            }
            return response.json();
        })
        .then(responseData => {
            if(responseData.errors){
                toast.error(responseData.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                toast.success(responseData.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    Inertia.visit('/');
                }, 2500);
            }
            console.log(responseData);
        })
        .catch(error => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Erro:', error)
        });
    }



    const brazillianStates = [
        'AC', // Acre
        'AL', // Alagoas
        'AP', // Amapá
        'AM', // Amazonas
        'BA', // Bahia
        'CE', // Ceará
        'DF', // Distrito Federal
        'ES', // Espírito Santo
        'GO', // Goiás
        'MA', // Maranhão
        'MT', // Mato Grosso
        'MS', // Mato Grosso do Sul
        'MG', // Minas Gerais
        'PA', // Pará
        'PB', // Paraíba
        'PR', // Paraná
        'PE', // Pernambuco
        'PI', // Piauí
        'RJ', // Rio de Janeiro
        'RN', // Rio Grande do Norte
        'RS', // Rio Grande do Sul
        'RO', // Rondônia
        'RR', // Roraima
        'SC', // Santa Catarina
        'SP', // São Paulo
        'SE', // Sergipe
        'TO'  // Tocantins
    ];


    function requestPostalCode(cep: string, index: number){
        const cep_without_format = cep.replace(/\D/g, '');
        const apiViaCep = `https://viacep.com.br/ws/${cep_without_format}/json/`;

        fetch(apiViaCep)
            .then((response) => response.json())
            .then((data) => {
                setValue(`addresses.${index}.address`, data.logradouro, { shouldValidate: true });
                setValue(`addresses.${index}.district`, data.bairro, { shouldValidate: true });
                setValue(`addresses.${index}.city`, data.localidade, { shouldValidate: true });
                setValue(`addresses.${index}.state`, data.uf, { shouldValidate: true });
            })
            .catch((error) => {
                console.error("Erro ao buscar o CEP:", error)
            });
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

                        <form className="p-4 flex-1 overflow-auto flex flex-col gap-4">
                            <div className="py-2">
                                <h1 className="font-bold text-xl">Dados pessoais</h1>
                            </div>

                            <div className="flex w-full gap-4">


                                <div className="flex flex-1 flex-col min-w-[20%]">
                                    <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Nome</label>
                                    <input
                                        id="name"
                                        {...register('name', {
                                            required: 'O Campo precisa ser preenchido',
                                            maxLength: {
                                                value: 255,
                                                message: 'O nome deve ter no máximo 255 caracteres'
                                            }
                                        })}
                                        className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1 pl-1">{errors.name?.message as string}</p>
                                    )}
                                </div>


                                <div className="flex flex-1 flex-col min-w-[20%]">
                                    <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">E-mail</label>
                                    <input
                                        id="email"
                                        {...register('email', {
                                            required: "O Campo precisa ser preenchido",
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                message: 'E-mail inválido'
                                            }
                                        })}
                                        className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 pl-1">{errors.email?.message as string}</p>
                                    )}
                                </div>

                            </div>

                            <div className="flex w-full gap-4">
                                <div className="flex flex-1 flex-col min-w-[20%]">
                                    <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Selecione o tipo de pessoa</label>

                                    <select {...register('type')} onChange={handleFieldDocument} className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out">
                                        <option value="">Ver opções</option>
                                        <option value="natural_person">Pessoa fisica</option>
                                        <option value="juridic_person">Pessoa jurídica</option>
                                    </select>
                                </div>

                                <div className="flex flex-1 flex-col min-w-[20%]">
                                    <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Envie uma imagem</label>
                                    <div className="relative border-dotted  rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">

                                    <div className="absolute">

                                        <div className="flex flex-col items-center">
                                            <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                                            <span className="block text-gray-400 font-normal">50x50</span>
                                        </div>
                                    </div>

                                    <input type="file" className="h-full w-full opacity-0" {...register('image')}/>

                                    </div>
                                </div>
                            </div>

                            {selectedType == 'natural_person' ? (
                                <div className="flex w-full gap-4">
                                    <div className="flex flex-1 flex-col min-w-[20%]">
                                        <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">CPF</label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            type="text"
                                            id="cpf"
                                            {...register('cpf', {
                                                pattern: {
                                                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                                    message: 'CPF inválido'
                                                }
                                            })}
                                            className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                        />
                                        {errors.cpf && (
                                            <p className="text-red-500 text-sm mt-1 pl-1">{errors.cpf?.message as string}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col min-w-[20%]">
                                        <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">RG</label>
                                        <InputMask
                                            mask="99.999.999-9"
                                            type="text"
                                            {...register('rg', {
                                                pattern: {
                                                    value: /^(\d{1,2}\.?\d{3}\.?\d{3}-?[0-9Xx]{1})$/,
                                                    message: 'RG inválido'
                                                }
                                            })}
                                            className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                        />
                                        {errors.rg && (
                                            <p className="text-red-500 text-sm mt-1 pl-1">{errors.rg?.message as string}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (

                                <>
                                    <div className="flex w-full gap-4">
                                        <div className="flex flex-1 flex-col min-w-[20%]">
                                            <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">CNPJ</label>
                                            <InputMask
                                                mask="99.999.999/9999-99"
                                                type="text"
                                                {...register('cnpj', {
                                                    pattern: {
                                                        value: /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
                                                        message: 'CNPJ inválido'
                                                    }
                                                })}
                                                className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                            />
                                            {errors.cnpj && (
                                                <p className="text-red-500 text-sm mt-1 pl-1">{errors.cnpj?.message as string}</p>
                                            )}
                                        </div>


                                        <div className="flex flex-1 flex-col min-w-[20%]">
                                            <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Razão Social</label>
                                            <input
                                                id="social_reason"
                                                type="text"
                                                {...register('social_reason')}
                                                className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full gap-4">


                                        <div className="flex flex-1 flex-col min-w-[20%]">
                                            <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Nome Fantasia</label>
                                            <input
                                                id="fantasy_name"
                                                type="text"
                                                {...register('fantasy_name')}
                                                className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="py-2 flex justify-between">
                                <h1 className="font-bold text-xl">Contato</h1>
                                <Button type="button" textButton="Adicionar Telefone" onClick={() => appendPhone({ phone_number: "" })}/>
                            </div>

                            {phoneFields.map((item, index) => {
                                return(

                                    <>
                                        <div className="flex w-full gap-4 justify-center items-end border-b pb-6" key={item.id}>
                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Telefone</label>
                                                <InputMask
                                                    mask="(99) 99999-9999"
                                                    id="phone_number"
                                                    type="text"
                                                    {...register(`phones.${index}.phone_number`, {
                                                        required: 'O campo precisa ser preenchido',
                                                        pattern: {
                                                            value: /^\(\d{2}\)\s?\d{5}-\d{4}$/,
                                                            message: 'Telefone inválido'
                                                        }
                                                    })}
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                                />
                                                {errors?.phones?.[index]?.phone_number && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.phones[index].phone_number?.message}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removePhone(index)}>
                                            Remover Telefone
                                        </button>
                                    </>
                                )
                            })}



                            <div className="py-2 flex justify-between">
                                <h1 className="font-bold text-xl">Endereço</h1>
                                <Button
                                    type="button"
                                    textButton="Adicionar Endereço"
                                    onClick={() => appendAddress({
                                        address: "",
                                        postal_code: "",
                                        state: "",
                                        district: "",
                                        city: "",
                                        number: ""
                                        })}
                                    />
                            </div>

                            {addressFields.map((item, index) => {
                                return (
                                    <div className="flex flex-col gap-4" key={item.id}>
                                        <div className="flex w-full gap-4">
                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">CEP</label>
                                                <InputMask
                                                    id="postal_code"
                                                    mask="99.999-999"
                                                    type="text"
                                                    {...register(`addresses.${index}.postal_code`, {
                                                        required: 'O campo precisa ser preenchido'
                                                    })}
                                                    onBlur={(event) => {requestPostalCode(event.target.value, index)}}
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                                />
                                                {errors?.addresses?.[index]?.postal_code && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.addresses[index].postal_code?.message}</p>
                                                )}
                                            </div>


                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Cidade</label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    {...register(`addresses.${index}.city`, {
                                                        required: 'O campo precisa ser preenchido'
                                                    })}
                                                    value={getValues(`addresses.${index}.city`) || ''}
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                                />
                                                {errors?.addresses?.[index]?.city && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.addresses[index].city?.message}</p>
                                                )}
                                            </div>


                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Estado</label>
                                                <select
                                                    {...register(`addresses.${index}.state`, {
                                                        validate: (value) => value !== "" || 'O campo precisa ser preenchido'
                                                    })}
                                                    value={getValues(`addresses.${index}.state`) || ''}
                                                    id="state"
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out">
                                                    <option value="">Selecione o estado</option>
                                                    {brazillianStates.map((value, index) => {
                                                        return (
                                                            <option key={index} value={value}>{value}</option>
                                                        )
                                                    })}
                                                </select>
                                                {errors?.addresses?.[index]?.state && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.addresses[index].state?.message}</p>
                                                )}
                                            </div>
                                        </div>


                                        <div className="flex w-full gap-4 border-b pb-6">

                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Endereço</label>
                                                <input
                                                    id="address"
                                                    type="text"
                                                    {...register(`addresses.${index}.address`, {
                                                        required: 'O campo precisa ser preenchido'
                                                    })}
                                                    value={getValues(`addresses.${index}.address`) || ''}
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                                />
                                                {errors?.addresses?.[index]?.address && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.addresses[index].address?.message}</p>
                                                )}
                                            </div>


                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Bairro</label>
                                                <input
                                                    id="district"
                                                    type="text"
                                                    {...register(`addresses.${index}.district`, {
                                                        required: 'O campo precisa ser preenchido'
                                                    })}
                                                    value={getValues(`addresses.${index}.district`) || ''}
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                                />
                                                {errors?.addresses?.[index]?.district && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.addresses[index].district?.message}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-1  flex-col min-w-[20%]">
                                                <label htmlFor="name" className="mb-1 text-gray-700 font-semibold">Número</label>
                                                <input
                                                    id="number"
                                                    type="text"
                                                    {...register(`addresses.${index}.number`, {
                                                        required: 'O campo precisa ser preenchido'
                                                    })}
                                                    className="rounded-md border border-gray-300 p-2 focus:border focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 ease-in-out"
                                                />
                                                {errors?.addresses?.[index]?.number && (
                                                    <p className="text-red-500 text-sm mt-1 pl-1">{errors.addresses[index].number?.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <button type="button" onClick={() => removeAddress(index)}>
                                            Remover Endereço
                                        </button>
                                    </div>
                                )
                            })}




                        </form>

                        <div className="border-t px-4 py-3 flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmit((data) => onSubmit(data))}
                                className="px-4 py-2 bg-indigo-500 text-white  rounded-md w-full sm:w-auto">
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
