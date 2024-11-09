import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";

const BookPage = () => {
    // https://reactrouter.com/en/main/start/concepts#locations
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    console.log(">>> check book id: ", id)

    return (
        <>
            <ViewDetail />
        </>
    )
}

export default BookPage;
