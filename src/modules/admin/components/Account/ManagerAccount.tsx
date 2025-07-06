import { PaginationProvider } from "../../context/PaginationContext";
import ManagerAccountContent from "./ManagerAccountContent";

export default function ManagerAccount() {
    return (
        <PaginationProvider initialRowsPerPage={10}>
            <ManagerAccountContent />
        </PaginationProvider>
    )
}   