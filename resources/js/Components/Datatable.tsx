import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";


interface DataTableProps {
    handleOpenModal: () => void
}

interface Addresses {
    id: number
    client_id: number
    address: string
    city: string
    district: string
    number: string
    postal_code: string
    state: string
    created_at: string
    updated_at: string
}

interface JuridicPerson {
    id: number
    client_id: number
    cnpj: string
    fantasy_name: string
    social_reason: string
    created_at: string
    updated_at: string
}

interface NaturalPerson {
    id: number
    client_id: number
    cpf: string
    rg: string
    created_at: string
    updated_at: string
}

interface Phones {
    id: number
    client_id: number
    phone_number: string
    created_at: string
    updated_at: string
}

interface Client {
    id: number
    name: string
    email: string
    type: string
    pathImage: string
    addresses: Addresses[];
    juridic_person: JuridicPerson | null
    natural_person: NaturalPerson | null
    phones: Phones[]
    created_at: string
    updated_at: string
}



export function DataTable({ handleOpenModal }: DataTableProps) {

    const [dataClients, setDataClients] = useState<Client[]>([])


    useEffect(() => {
        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

        fetch('http://localhost:8000/clients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken || '',
            }
        })
        .then(response => {
            if(!response.ok) {
                console.log(response);
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData)
            setDataClients(responseData)
        })
        .catch(error => {
            console.error('Erro:', error)
        });
    },[])




    return (
        <>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full max-w-full px-3 mb-6  mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            {/* <!-- card header --> */}
                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-bold text-dark">Clientes</span>
                                    <span className="mt-1 font-light text-zinc-400 text-lg/normal">Clientes cadastrados na plataforma</span>
                                </h3>
                                <Button textButton="Adicionar Cliente" onClick={handleOpenModal} />
                            </div>
                            {/* <!-- end card header -->
                            <!-- card body  --> */}
                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-auto">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 text-start min-w-[175px]">Nome</th>
                                                <th className="pb-3 text-end min-w-[100px]">E-mail</th>
                                                <th className="pb-3 text-end min-w-[100px]">Documento</th>
                                                <th className="pb-3 pr-12 text-end min-w-[175px]">Tipo de pessoa</th>
                                                <th className="pb-3 pr-12 text-end min-w-[175px]">Telefone</th>
                                                <th className="pb-3 text-end min-w-[50px]">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataClients.map((item, index) => {
                                                return (

                                                    <tr className="border-b border-dashed last:border-b-0" key={item.id}>
                                                        <td className="p-3 pl-0">
                                                            <div className="flex items-center">
                                                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                                    <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                                                </div>
                                                                <div className="flex flex-col justify-start">
                                                                    <p className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                                                                        {item.name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-3 pr-0 text-end">
                                                            <span className="font-semibold text-light-inverse text-md/normal">{item.email}</span>
                                                        </td>
                                                        <td className="p-3 pr-0 text-end">
                                                            <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                                                {item.natural_person ? (
                                                                    item.natural_person?.cpf
                                                                ): (
                                                                    item.juridic_person?.cnpj
                                                                )}
                                                            </span>
                                                        </td>

                                                        <td className="p-3 pr-12 text-end">
                                                            <span
                                                                className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg flex-col gap-2"
                                                            >
                                                                {item.type == 'natural_person' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                                                            </span>
                                                        </td>

                                                        <td className="p-3 pr-12 text-end">
                                                            <span
                                                                className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg flex-col gap-2"
                                                            >
                                                                {/* Mostrando o primeiro telefone */}
                                                                {item.phones.length > 0 ? item.phones[0].phone_number : 'Sem telefone'}
                                                                {/* Mapeando para exibir todos os números de telefone */}
                                                                {item.phones.length > 1 && item.phones.slice(1).map((itemPhone, indexPhone) => (
                                                                    <div key={itemPhone.id}>{itemPhone.phone_number}</div>
                                                                ))}
                                                            </span>
                                                        </td>
                                                        <td className="p-3 pr-0 text-end">
                                                            <button className="mr-2">
                                                                <Pencil size={20} />
                                                            </button>
                                                            <button>
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
