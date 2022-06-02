import { useParams } from "react-router"
import PageCard from "../../../app/components/PageCard"

function FailPage() {
    const { typeFail } = useParams()

    function getTypeFail() {
        if (typeof typeFail !== "undefined") {
            if (typeFail === "error_api") {
                return "Falha no servidor. Entre em contato com o administrador."
            }
            return typeFail
        }
        return ""
    }

    return (
        <PageCard title={getTypeFail().toUpperCase()} />
    )
}

export default FailPage