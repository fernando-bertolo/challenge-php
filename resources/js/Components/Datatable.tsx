import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";
import { Modal } from "./Modal";


interface DataTableProps {
    handleOpenModal: () => void
}

export function DataTable({ handleOpenModal }: DataTableProps) {



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
                                                <th className="pb-3 pr-12 text-end min-w-[175px]">Telefone</th>
                                                <th className="pb-3 text-end min-w-[50px]">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-dashed last:border-b-0">
                                                <td className="p-3 pl-0">
                                                    <div className="flex items-center">
                                                        <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                                            <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                                                        </div>
                                                        <div className="flex flex-col justify-start">
                                                            <p className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"> Fernando Bertolo </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 pr-0 text-end">
                                                    <span className="font-semibold text-light-inverse text-md/normal">fernando.bertolo@gmail.com</span>
                                                </td>
                                                <td className="p-3 pr-0 text-end">
                                                    <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                                                        519.866.188.03
                                                    </span>
                                                </td>
                                                <td className="p-3 pr-12 text-end">
                                                    <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg"> (19) 999044410 </span>
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
