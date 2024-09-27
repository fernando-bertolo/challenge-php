import { DataTable } from "@/Components/Datatable";
import { Header } from "@/Components/Header";
import { Modal } from "@/Components/Modal";


export default function Home() {
    return (
        <>
        <div className="pr-24 pl-24">
            <Header/>
            <DataTable/>
            {/* <Modal/> */}
        </div>
        </>
    );
}
