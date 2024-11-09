import { useLocation } from "react-router-dom";

const BookPage = () => {
    // https://reactrouter.com/en/main/start/concepts#locations
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    console.log(">>> check book id: ", id)

    return (
        <>
            book page
        </>
    )
}

export default BookPage;
