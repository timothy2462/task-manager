import { Header } from "./Header"

function Wrapper(props) {

    return (
        <>
            <Header />
            {props.children}
        </>
    )
}

export default Wrapper
