import { DataTable } from "@/Components/Datatable";
import { Header } from "@/Components/Header";
import { Modal } from "@/Components/Modal";
import { useState } from "react";


export default function Home() {

    const [openModal, setOpenModal] = useState<boolean>(false);

    function handleOpenModal(){
        setOpenModal(true)
    }

    function handleCloseModal(){
        setOpenModal(false)
    }

    return (
        <>
        <div className="pr-24 pl-24">
            <Header/>
            <DataTable handleOpenModal={handleOpenModal}/>
            {openModal && (
                <Modal handleCloseModal={handleCloseModal}/>
            )}
        </div>
        </>
    );
}
