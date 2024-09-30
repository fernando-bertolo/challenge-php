import { DataTable } from "@/Components/Datatable";
import { Header } from "@/Components/Header";
import { Modal } from "@/Components/Modal";
import { useState } from "react";


export default function Home() {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [clientId, setClientId] = useState<number | null>(null);

    function handleOpenModal(){
        setOpenModal(true)
    }

    function handleCloseModal(){
        setOpenModal(false)
    }

    function handleOpenEditModal(id: number){
        setClientId(id)
        setOpenEditModal(true)
    }

    function handleCloseEditModal(){
        setOpenEditModal(false)
    }

    return (
        <>
        <div className="pr-24 pl-24">
            <Header/>
            <DataTable handleOpenModal={handleOpenModal} handleOpenEditModal={handleOpenEditModal}/>
            {openModal && (
                <Modal
                    title="Cadastro de clientes"
                    handleCloseModal={handleCloseModal}
                    route="create"
                />
            )}

            {openEditModal && (
                <Modal
                    title="Alteração de cliente"
                    handleCloseEditModal={handleCloseEditModal}
                    clientId={clientId}
                />
            )}
        </div>
        </>
    );
}
